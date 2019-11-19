import { Component, h, Prop } from '@stencil/core';
import { Store } from "@stencil/redux";
import { getBuildingTypeLabel, getBedsListingText } from '../../helpers/filters';
import neighborhoodSelectors from '../../store/selectors/neighborhoods';
import { formatMoney } from '../../helpers/utils';

@Component({
  tag: 'listing-card',
  styleUrl: 'listing-card.scss'
})
export class ListingCard {
  @Prop({ context: "store" }) store: Store;
  @Prop() contentPadding: boolean = false;

  neighborhoods: any[] = [];

  @Prop() item: any = {};

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        neighborhoods: neighborhoodSelectors.getNeighborhoods(state)
      };
    });
  }

  getImageURL() {
    return this.item.images.length ? this.item.images[0] : '/assets/images/placeholder/apt1.jpeg';
  }

  render() {
    const neighborhood = neighborhoodSelectors.getNeighborhoodById(this.item.neighborhood_id[0], this.neighborhoods);

    return [
      <ion-router-link href={'/post/' + this.item.id}>
        <div class="listing-card">
            <maintain-ratio width={322} height={182}>
              <lazy-image src={this.getImageURL()} class="list-feature-image" alt={neighborhood.name} />
            </maintain-ratio>
          <div class={{"listing-content-padding": this.contentPadding}}>
            <h4 class="listing-title">{neighborhood.name}</h4>
            <div class="price">
              {formatMoney(this.item.price)} /month
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
            </div>
          </div>
        </div>
      </ion-router-link>
    ];
  }
}
