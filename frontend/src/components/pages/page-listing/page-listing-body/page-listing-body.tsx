import { Component, h, Prop, Host, State, Element } from '@stencil/core';
import { Store, Action } from '@stencil/redux';
import { addToWishlist, removeFromWishlist } from '../../../../store/actions/wishlist';
import wishlistSelectors from '../../../../store/selectors/wishlist';
import taxonomySelectors from '../../../../store/selectors/taxonomy';
import { formatMoney, formatDate, nl2br, xssFilter } from '../../../../helpers/utils';
import { getBedsListingText } from '../../../../helpers/filters';
import { APISearchService } from '../../../../services/api/search';
import { ModalService } from '../../../../services/modal.service';
import { RouterService } from '../../../../services/router.service';

@Component({
  tag: 'page-listing-body',
  styleUrl: 'page-listing-body.scss'
})
export class PageListingBody {
  @Prop({ context: "store" }) store: Store;
  @Element() el: HTMLElement;
  @Prop() item!: any;
  @State() wishlist: any[] = [];

  @State() nearbyApts: any[] = [];

  addToWishlist: Action;
  removeFromWishlist: Action;

  bedroomTypes: any;
  buildingTypes: any;
  neighborhoods: any;
  itemNeighborhoods: any;

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      const neighborhoods = taxonomySelectors.getNeighborhoods(state);

      return {
        bedroomTypes: taxonomySelectors.getBedroomTypes(state),
        buildingTypes: taxonomySelectors.getBuildingTypes(state),
        itemNeighborhoods: neighborhoods.filter(n => this.item.neighborhood_ids.includes(n.id)),
        neighborhoods,
        wishlist: wishlistSelectors.getWishlist(state)
      }
    });

    this.store.mapDispatchToProps(this, {
      addToWishlist,
      removeFromWishlist
    });
  }

  async componentDidLoad() {
    try {
      const nearbyApts = await APISearchService.getNamedSearch('nearbyApts', {id: this.item.id});

      this.nearbyApts = nearbyApts;
    } catch (e) {
      // fail silently
    }
  }

  getFeatures() {
    const bedroomType = taxonomySelectors.getBedroomTypeById(this.item.bedroom_type_id, this.bedroomTypes);
    const buildingType = taxonomySelectors.getBuildingTypeById(this.item.building_type_id, this.buildingTypes);

    let features: any[] = [
      {
        'name': <span><img src="/assets/images/icons/bedroom.svg" class="feature-icon" alt="bedroom" /> Bedrooms</span>,
        'value': getBedsListingText(bedroomType, 'short')
      },
      {
        'name': <span><img src="/assets/images/icons/bathroom.svg" class="feature-icon" alt="bathroom" /> Bathrooms</span>,
        'value': this.item.bathrooms
      },
      {
        'name': 'Building Type',
        'value': <div class="flex-vertical-center building-type"><star-rating stars={5} rating={buildingType.rating} size={16} readonly /> { buildingType.name }</div>
      }
    ];

    if (this.item.floor) {
      features.push({
        'name': 'Floor',
        'value': this.item.floor
      });
    }

    if (this.item.size) {
      features.push({
        'name': 'Apartment Square Footage',
        'value': `${this.item.size} sqft`
      });
    }

    features.push({
      'name': 'Neighborhood',
      'value': this.itemNeighborhoods.reduce((acc, curr) => {
        if (acc.length) {
          acc += '/';
        }

        acc += curr.name;
        return acc;
      }, '')
    });

    if (this.item.cross_streets) {
      features.push({
        'name': 'Cross Streets',
        'value': this.item.cross_streets
      });
    }

    if (this.item.subways.length) {
      features.push({
        'name': 'Nearby Subways',
        'value': this.item.subways.map(s => <lazy-image src={s.icon} class="subway-icon" />)
      });
    }

    features.push({
      'name': 'Web ID',
      'value': `#${this.item.id}`
    });

    return features;
  }

  toggleWishlist() {
    if (this.wishlist.includes(this.item.id)) {
      this.removeFromWishlist([this.item.id]);
    }
    else {
      this.addToWishlist([this.item.id]);
    }
  }

  showSeasonalRates() {
    const modal = Object.assign(document.createElement('ion-modal'), {
      component: 'apt212-modal-booking-frame',
      cssClass: 'seasonal-rates-modal',
      componentProps: {
        component: 'seasonal-rates',
        componentProps: {
          item: this.item
        }
      }
    });

    document.body.appendChild(modal);
    return modal.present();
  }

  shareApartment() {
    const modal = Object.assign(document.createElement('ion-modal'), {
      component: 'apt212-modal-booking-frame',
      cssClass: 'share-listing-modal',
      componentProps: {
        component: 'share-listing',
        componentProps: {
          items: [this.item]
        }
      }
    });

    document.body.appendChild(modal);
    return modal.present();
  }

  showBookingDateInput(type) {
    const popover = Object.assign(document.createElement('apt212-popover'), {
      component: 'input-booking-date',
      componentProps: {
        type: type,
        inPopover: true,
        item: this.item
      },
      animateSrc: 'none',
      styleOverride: {
        top: '142px',
        left: '20px',
        width: '438px',
        zIndex: '1',
        border: '1px solid black',
        transform: 'none'
      }
    });

    this.el.querySelector('.checkin-form').appendChild(popover);
  }

  showGuestInput() {
    const popover = Object.assign(document.createElement('apt212-popover'), {
      component: 'input-booking-guests',
      componentProps: {
        item: this.item
      },
      animateSrc: 'none',
      styleOverride: {
        top: '200px',
        left: '20px',
        width: '438px',
        zIndex: '1',
        border: '1px solid black',
        transform: 'none'
      }
    });

    this.el.querySelector('.checkin-form').appendChild(popover);
  }

  showBookingDetails() {
    const modal = Object.assign(document.createElement('ion-modal'), {
      component: 'apt212-modal-booking-frame',
      cssClass: 'booking-details-modal',
      componentProps: {
        component: 'booking-details',
        componentProps: {
          item: this.item
        }
      }
    });

    document.body.appendChild(modal);
    return modal.present();
  }

  showAskQuestion() {
    return ModalService.contactUs(this.item);
  }

  render() {
    const marketingNeighborhoods = this.neighborhoods.filter(n => {
      if (this.item.neighborhood_ids.includes(n.id) && !n.marketing_neighborhood) {
        return true;
      }

      if (n.marketing_neighborhood) {
        return false;
      }

      // only keep if we are a marketing neighborhood for the apt
      return !!this.itemNeighborhoods.find(nn => nn.marketing_neighborhood === n.slug);
    });

    return (
      <Host class="page-listing-body-component">
        <section class="section no-padding">
          <page-listing-image-slider item={this.item} />
        </section>
        <section class="section listing-main">
          <div class={{'listing-right': true, 'has-slider': !!this.item.images.length}}>
            <div class="stickyblock">
              <div class="listing-price">
                <div>
                  <span class="rate">{formatMoney(this.item.rate)}</span> per month
                </div>
              </div>

              <div class="checkin-form">
                <div class="available-date">
                  <span class="date">{formatDate(this.item.available_date, 'm.d.y')}</span> next available date
                </div>

                <page-listing-checkin
                  item={this.item}
                  onShowCheckInInput={() => this.showBookingDateInput('checkin')}
                  onShowCheckOutInput={() => this.showBookingDateInput('checkout')}
                  onShowGuestsInput={() => this.showGuestInput()}
                  onShowSeasonalRates={() => this.showSeasonalRates()}
                  onShowBookingDetails={() => this.showBookingDetails()}
                  onShowAskQuestionInput={() => this.showAskQuestion()}
                />
              </div>

              <div class="wishlist-share">
                <button aria-label="Add to wishlist" class="button-reset has-icon" onClick={() => this.toggleWishlist()}>
                  <img src="/assets/images/icons/heart_icon.svg" class="wishlist-icon" /> { this.wishlist.includes(this.item.id) ? 'Remove from wishlist' : 'Add to wishlist' }
                </button>

                <button aria-label="Share listing" class="button-reset has-icon" onClick={() => this.shareApartment()}>
                  <img src="/assets/images/icons/share.svg" class="share-icon" /> Share
                </button>
              </div>
            </div>
          </div>

          <div class="listing-left">
            <div class="listing-description">
              <h1>{this.item.title}</h1>

              <p innerHTML={xssFilter(nl2br(this.item.description))} />
            </div>

            { this.item.floor_plans.length ?
              <div class="listing-section">
                <div class="title">
                  Floor Plan
                </div>

                { this.item.floor_plans.map(f => <lazy-image src={f.large} class="full-img" />) }
              </div>
              : null
            }

            { this.item.video_url ?
              <div class="listing-section">
                <div class="title">
                  Video
                </div>

                <maintain-ratio width={583} height={328}>
                  <youtube-video src={this.item.video_url} class="listing-video" />
                </maintain-ratio>

              </div>
              : null
            }

            <div class="listing-section">
              <div class="title">
                Features
              </div>

              {
                this.getFeatures().map((f, i) => {

                  let classObj = { feature: true };
                  classObj[`feature-${i}`] = true;

                return (
                <div class={classObj}>
                  <div class="feature-name">
                    { f.name }
                  </div>
                  <div class="feature-value">
                    { f.value }
                  </div>
                </div>
                );
                })
              }
            </div>


            {
              this.item.amenities.length ?
              <div class="listing-section">
                <div class="title">
                  Amenities
                </div>

                {
                  this.item.amenities.map(a => <div class="amenity flex-vertical-center">
                    <div class="icon">
                      <lazy-image src={a.icon} />
                    </div>

                    { a.name }
                  </div>
                  )
                }
              </div>
              : null
            }


            <div class="listing-section">
              <div class="title">
                Location
              </div>

              <listing-map item={this.item} />
            </div>

            {marketingNeighborhoods.map((region, i) => {

                if (i === 0) {
                  return (
                    <div class="listing-section">

                      <div class="title">
                        { region.name }
                      </div>

                      <div class="neighborhood">
                        <lazy-image src={region.image} class="neighborhood-image" />

                        <div class="description" innerHTML={region.description}>


                          <a href={`/nyc-neighborhood/${region.slug}/apartments`} class="button-dark">
                            Explore
                          </a>
                        </div>
                      </div>
                  </div>
                  )
                }

              }
              )}

            <div class="listing-section">
              <div class="title">
                The booking process
              </div>

              <div class="booking-process flex-vertical-center">
                <div class="icon">
                  <img src="/assets/images/icons/add.svg" />
                </div>

                Submit a payment of 1 month's rent to secure the apartment
              </div>

              <div class="booking-process flex-vertical-center">
                <div class="icon">
                  <img src="/assets/images/icons/application.svg" />
                </div>

                Fill out an online application
              </div>

              <div class="booking-process flex-vertical-center">
                <div class="icon">
                  <img src="/assets/images/icons/approved.svg" />
                </div>

                We will get you approved within 48 hours
              </div>

              <div class="booking-process flex-vertical-center">
                <div class="icon">
                  <img src="/assets/images/icons/sign_lease.svg" />
                </div>

                Sign a lease online
              </div>

              <div class="booking-process flex-vertical-center">
                <div class="icon">
                  <lazy-image src="/assets/images/icons/shield.svg" />
                </div>

                Pick up a key and check in
              </div>
            </div>
          </div>
        </section>

        {
          this.nearbyApts.length ?
            <section class="section">
              <div class="listing-section full-width">
                <h2 class="title">
                  Nearby Apartments
                </h2>

                <div class="nearby-list">
                  { this.nearbyApts.map(a => <listing-card item={a} mode="desktop" />)}
                </div>
              </div>
              <div>
                <ion-router-link href={ RouterService.getRoute('search') } class="show-all">Show All ></ion-router-link>
              </div>
            </section>
            : null
        }

      </Host>
    )
  }
}
