import { Component, h, Prop, State } from '@stencil/core';
import { Store, Action } from "@stencil/redux";
import { getBuildingTypeLabel, getBedsListingText } from '../../helpers/filters';
import neighborhoodSelectors from '../../store/selectors/neighborhoods';
import { setSelectedListing, setSearchListingHover } from '../../store/actions/search';
import { searchSelectors } from '../../store/selectors/search';
import { formatMoney, formatDate } from '../../helpers/utils';


@Component({
  tag: 'search-listing-card',
  styleUrl: 'search-listing-card.scss'
})
export class SearchListingCard {
  @Prop({ context: "store" }) store: Store;
  @Prop() contentPadding: boolean = false;
  @State() selectedListings: any[];

  setSelectedListing: Action;
  setSearchListingHover: Action;

  neighborhoods: any[] = [];

  @Prop() item: any = {};

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        neighborhoods: neighborhoodSelectors.getNeighborhoods(state),
        selectedListings: searchSelectors.getSelectedListings(state)
      };
    });

    this.store.mapDispatchToProps(this, {
      setSelectedListing,
      setSearchListingHover
    });
  }

  getImageURL() {
    return this.item.images.length ? this.item.images[0] : '/assets/images/placeholder/apt1.jpeg';
  }

  render() {
    const neighborhood = neighborhoodSelectors.getNeighborhoodById(this.item.neighborhood_id[0], this.neighborhoods);

    return [
        <div class="search-listing-card" onMouseEnter={() => this.setSearchListingHover(this.item.id)} onMouseLeave={() => this.setSearchListingHover(false)}>
            <maintain-ratio width={322} height={182}>
              <lazy-image src={this.getImageURL()} class="list-feature-image" alt={neighborhood.name} />
            </maintain-ratio>
          <div class={{"listing-content-padding": this.contentPadding}}>
            <h4 class="listing-title">
              <ion-router-link href={'/post/' + this.item.id}>{this.item.streetAddress}</ion-router-link>
            </h4>
            <div class="neighborhood">
              <ion-router-link href={'/post/' + this.item.id}>
                {neighborhood.name}
              </ion-router-link>
            </div>
            <div class="price">
              <ion-router-link href={'/post/' + this.item.id}>
                {formatMoney(this.item.price)} per month
              </ion-router-link>
            </div>
            <div class="available">
              <ion-router-link href={'/post/' + this.item.id}>
                Available {formatDate(new Date(this.item.available_date))}
              </ion-router-link>
            </div>
            <div class="bed-bath">
              <div>
                <lazy-image src="/assets/images/icons/bedroom.svg" class="bedrooms" alt="bedroom icon" /> {getBedsListingText(this.item.bedrooms)}
              </div>
              <div class="divider">
                |
              </div>
              <div>
                <lazy-image src="/assets/images/icons/bathroom.svg" class="bathrooms" alt="bathroom icon" /> {this.item.bathrooms} Bathroom
              </div>
            </div>
            <div class="rating-amenities">
              <star-rating
                  stars={5}
                  size={16}
                  rating={this.item.rating}
                  readonly
              />

              <div class="amenities">
                { getBuildingTypeLabel(this.item.building_type) }
              </div>

              <div class="flex-spacer" />

              <apt212-checkbox checked={this.selectedListings.includes(this.item.id)} onCheckBoxChange={e => this.setSelectedListing(this.item.id, e.detail.checked)}/>
            </div>
          </div>
        </div>
    ];
  }
}
