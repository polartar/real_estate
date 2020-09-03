import { Component, h, Prop, State } from '@stencil/core';
import { Store, Action } from '@stencil/redux';
import { searchSelectors } from '../../../store/selectors/search';
import { bookingSetCheckin, bookingSetCheckout, bookingSetGuests } from '../../../store/actions/booking';
import taxonomySelectors from '../../../store/selectors/taxonomy';
import { APIApartmentsService } from '../../../services/api/apartments';
import { EnvironmentConfigService } from '../../../services/environment/environment-config.service';
import { formatMoney, formatDate, getUrlParameter, getDate } from '../../../helpers/utils';
import { SEOService } from '../../../services/seo.service';

@Component({
  tag: 'page-listing',
  styleUrl: 'page-listing.scss'
})
export class PageListing {
  @Prop({ context: "store" }) store: Store;
  @Prop() apartmentId: number;

  @State() loaded: boolean = false;
  @State() taxonomyLoaded: boolean = false;

  searchResults: any[] = [];
  item: any = null;

  bookingSetCheckin: Action;
  bookingSetCheckout: Action;
  bookingSetGuests: Action;

  async componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        searchResults: searchSelectors.getListings(state),
        taxonomyLoaded: taxonomySelectors.getTaxonomyLoaded(state)
      }
    });

    this.store.mapDispatchToProps(this, {
      bookingSetCheckin: bookingSetCheckin,
      bookingSetCheckout: bookingSetCheckout,
      bookingSetGuests: bookingSetGuests
    });

    let canonicalURL = EnvironmentConfigService.getInstance().get('BASE_URL') + '/404';

    // see if we have this apartment in search results
    // otherwise load from the API
    const item = this.searchResults.find(v => v.id === this.apartmentId);

    if (item) {
      this.item = item;
      this.loaded = true;
    }
    else {
      // we're hitting this page directly with no prior history
      // load the apartment from the api
      try {
        const apt = await APIApartmentsService.getApartment(this.apartmentId);

        if (apt && apt.hasOwnProperty('id') && apt.id === this.apartmentId) {
          this.item = apt;
          this.loaded = true;

          canonicalURL = EnvironmentConfigService.getInstance().get('BASE_URL') + this.item.url_path; // normalize ID
        }
      }
      catch (e) {
        this.loaded = true; // just show the 404
      }
    }

    // if item exists then we make this url canonical
    SEOService.setCanonical(canonicalURL);

    if (getUrlParameter('checkin')) {
      this.bookingSetCheckin(this.apartmentId, getDate(getUrlParameter('checkin')));
    }

    if (getUrlParameter('checkout')) {
      this.bookingSetCheckout(this.apartmentId, getDate(getUrlParameter('checkout')) );
    }

    if (getUrlParameter('guests')) {
      this.bookingSetGuests(this.apartmentId, getUrlParameter('guests'));
    }
  }

  showMobileBookingDetails() {
    const modal = Object.assign(document.createElement('ion-modal'), {
      component: 'mobile-booking-modal',
      cssClass: 'mobile-booking-modal',
      componentProps: {
        item: this.item
      }
    });

    document.body.appendChild(modal);
    return modal.present();
  }

  render() {
    return [
      <ion-content>
        <app-header />

        <div class="page-listing">

          {
            !this.item && this.loaded && this.taxonomyLoaded ?
            <section class="section">
              <content-404 />
            </section>
            : null
          }

          {
            !this.loaded || !this.taxonomyLoaded ?
            <section class="section">
              <ion-spinner name="lines" />
            </section>
            : null
          }

          {
            this.item && this.loaded && this.taxonomyLoaded ?
            <page-listing-body item={this.item} />
            : null
          }

        <app-footer />

        {
          this.item && this.loaded && this.taxonomyLoaded ?
          <div class="mobile-booking">
            <div class="rate-date-details">
              <span class="highlight">{ formatMoney(this.item.rate) }</span> per month<br />
              <span class="highlight">{ formatDate(this.item.available_date, 'm.d.y')}</span> next available date
            </div>

            <div>
              <button aria-label="Booking Details" class="button-dark booking-details" onClick={() => this.showMobileBookingDetails()}>
                Booking Details
              </button>
            </div>
          </div>
          : null
        }

      </div>
      </ion-content>
    ]

  }
}
