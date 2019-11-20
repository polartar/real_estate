import { Component, h, Prop } from '@stencil/core';
import { Store } from '@stencil/redux';
import { getBedsListingText } from '../../../helpers/filters';
import taxonomySelectors from '../../../store/selectors/taxonomy';

@Component({
  tag: 'map-listing-card',
  styleUrl: 'map-listing-card.scss'
})
export class MapListingCard {
  @Prop({ context: "store" }) store: Store;
  @Prop() item!: any;

  neighborhoods: any[];
  bedroomTypes: any[] = [];
  buildingTypes: any[] = [];

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        neighborhoods: taxonomySelectors.getNeighborhoods(state),
        bedroomTypes: taxonomySelectors.getBedroomTypes(state),
        buildingTypes: taxonomySelectors.getBuildingTypes(state),
      }
    });
  }

  render() {
    const neighborhood = taxonomySelectors.getNeighborhoodById(this.item.neighborhood_ids[0], this.neighborhoods);
    const bedroomType = taxonomySelectors.getBedroomTypeById(this.item.bedroom_type_id, this.bedroomTypes);
    const buildingType = taxonomySelectors.getBuildingTypeById(this.item.building_type_id, this.buildingTypes);

    return (
      <ion-router-link href={`/post/${this.item.id}`}>
        <div class="map-listing-card-component">
          <img src={this.item.images[0]} class="feature-image" />

          <div class="details">
            <h4 class="listing-title">{this.item.street_address}</h4>
              <div class="neighborhood">
                { neighborhood.name }
              </div>
              <div class="price">
                ${this.item.rate} /month
              </div>
              <div class="avialable">
                Available {this.item.available_date}
              </div>
              <div class="bed-bath">
                <div>
                  <img src="/assets/images/icons/bedroom.svg" class="bedrooms" alt="bedroom icon" /> {getBedsListingText(bedroomType)}
                </div>
                <div class="divider">
                  |
                </div>
                <div>
                  <img src="/assets/images/icons/bathroom.svg" class="bathrooms" alt="bathroom icon" /> {this.item.bathrooms} Bathroom
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
              </div>
          </div>
        </div>
      </ion-router-link>
    )
  }
}
