import { Component, h, Prop, State } from '@stencil/core';
import { Store } from '@stencil/redux';
import { searchSelectors } from '../../../store/selectors/search';
import taxonomySelectors from '../../../store/selectors/taxonomy';
import { APIApartmentsService } from '../../../services/api/apartments';
import { EnvironmentConfigService } from '../../../services/environment/environment-config.service';
import { formatMoney, formatDate } from '../../../helpers/utils';

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

  async componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        searchResults: searchSelectors.getListings(state),
        taxonomyLoaded: taxonomySelectors.getTaxonomyLoaded(state)
      }
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

          canonicalURL = EnvironmentConfigService.getInstance().get('BASE_URL') + '/listing/' + this.item.id; // normalize ID
        }
      }
      catch (e) {
        this.loaded = true; // just show the 404
      }
    }

    // if item exists then we make this url canonical
    const rel: any = document.querySelector('link[rel="canonical"]');
    if (rel) {
      rel.setAttribute('href', canonicalURL);
    }
  }

  render() {
    return [
      <app-header />,
      <ion-content class="page-listing">
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
              <button aria-label="Booking Details" class="button-dark booking-details">
                Booking Details
              </button>
            </div>
          </div>
          : null
        }

      </ion-content>
    ]

  }
}
