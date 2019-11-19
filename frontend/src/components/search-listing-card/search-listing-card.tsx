import { Component, h, Prop, State } from '@stencil/core';
import { Store, Action } from "@stencil/redux";
import { getBedsListingText } from '../../helpers/filters';
import taxonomySelectors from '../../store/selectors/taxonomy';
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
  bedroomTypes: any[] = [];
  buildingTypes: any[] = [];

  @Prop() item: any = {};

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        neighborhoods: taxonomySelectors.getNeighborhoods(state),
        bedroomTypes: taxonomySelectors.getBedroomTypes(state),
        buildingTypes: taxonomySelectors.getBuildingTypes(state),
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
    const neighborhood = taxonomySelectors.getNeighborhoodById(this.item.neighborhood_ids[0], this.neighborhoods);
    const bedroomType = taxonomySelectors.getBedroomTypeById(this.item.bedroom_type_id, this.bedroomTypes);
    const buildingType = taxonomySelectors.getBuildingTypeById(this.item.building_type_id, this.buildingTypes);

    return [
        <div class="search-listing-card" onMouseEnter={() => this.setSearchListingHover(this.item.id)} onMouseLeave={() => this.setSearchListingHover(false)}>
            <maintain-ratio width={322} height={182}>
              <lazy-image src={this.getImageURL()} class="list-feature-image" alt={neighborhood.name} />
            </maintain-ratio>
          <div class={{"listing-content-padding": this.contentPadding}}>
            <h4 class="listing-title">
              <ion-router-link href={'/post/' + this.item.id}>{this.item.street_address}</ion-router-link>
            </h4>
            <div class="neighborhood">
              <ion-router-link href={'/post/' + this.item.id}>
                {neighborhood.name}
              </ion-router-link>
            </div>
            <div class="price">
              <ion-router-link href={'/post/' + this.item.id}>
                {formatMoney(this.item.rate)} per month
              </ion-router-link>
            </div>
            <div class="available">
              <ion-router-link href={'/post/' + this.item.id}>
                Available {formatDate(new Date(this.item.available_date))}
              </ion-router-link>
            </div>
            <div class="bed-bath">
              <div>
                <lazy-image src="/assets/images/icons/bedroom.svg" class="bedrooms" alt="bedroom icon" /> {getBedsListingText(bedroomType)}
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
                { buildingType.name }
              </div>

              <div class="flex-spacer" />

              <apt212-checkbox checked={this.selectedListings.includes(this.item.id)} onCheckBoxChange={e => this.setSelectedListing(this.item.id, e.detail.checked)}/>
            </div>
          </div>
        </div>
    ];
  }
}
