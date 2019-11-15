import { Component, h, Prop } from '@stencil/core';
import { Store } from '@stencil/redux';
import { getBuildingTypeLabel, getBedsListingText } from '../../../helpers/filters';
import neighborhoodSelectors from '../../../store/selectors/neighborhoods';

@Component({
  tag: 'map-listing-card',
  styleUrl: 'map-listing-card.scss'
})
export class MapListingCard {
  @Prop({ context: "store" }) store: Store;
  @Prop() item!: any;
  neighborhoods: any[];

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        neighborhoods: neighborhoodSelectors.getNeighborhoods(state),
      }
    });
  }

  render() {
    const neighborhood = neighborhoodSelectors.getNeighborhoodById(this.item.neighborhood_id, this.neighborhoods);

    return (
      <ion-router-link href={`/post/${this.item.id}`}>
        <div class="map-listing-card-component">
          <img src={this.item.images[0]} class="feature-image" />

          <div class="details">
            <h4 class="listing-title">{this.item.title}</h4>
              <div class="neighborhood">
                { neighborhood.name }
              </div>
              <div class="price">
                ${this.item.price} /month
              </div>
              <div class="avialable">
                Available {this.item.available_date}
              </div>
              <div class="bed-bath">
                <div>
                  <img src="/assets/images/icons/bedroom.svg" class="bedrooms" alt="bedroom icon" /> {getBedsListingText(this.item.bedrooms)}
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
                  { getBuildingTypeLabel(this.item.building_type)}
                </div>
              </div>
          </div>
        </div>
      </ion-router-link>
    )
  }
}
