import { Component, h, Prop, State } from '@stencil/core';
import { Store } from "@stencil/redux";
import { getBuildingTypeLabel } from '../../helpers/filters';

@Component({
  tag: 'listing-card',
  styleUrl: 'listing-card.scss'
})
export class ListingCard {
  @Prop({ context: "store" }) store: Store;
  @Prop() contentPadding: boolean = false;
  @State() size: string = 'phone-only';

  @Prop() item: any = {
    id: Math.round(Math.random() * 10000),
    address: 'East Village',
    price: 1400,
    bedrooms: 3,
    bathrooms: 3,
    rating: 4,
    building_type: 'Elevator',
    images: []
  }

  componentDidLoad() {
    this.store.mapStateToProps(this, state => {

      const {
        screenSize: { size },
      } = state;

      return {
        size
      };
    });
  }

  getImageURL() {
    return this.item.images.length ? this.item.images[0] : '/assets/images/placeholder/apt1.jpeg';
  }

  render() {

    return [
      <ion-router-link href={'/post/' + this.item.id}>
        <div class="listing-card">
            <maintain-ratio width={322} height={182}>
              <lazy-image src={this.getImageURL()} class="list-feature-image" alt={this.item.address} />
            </maintain-ratio>
          <div class={{"listing-content-padding": this.contentPadding}}>
            <h4 class="listing-title">{this.item.address}</h4>
            <div class="price">
              ${this.item.price} per month
            </div>
            <div class="bed-bath">
              <div>
                <lazy-image src="/assets/images/icons/bedroom.svg" class="bedrooms" alt="bedroom icon" /> {this.item.bedrooms} Bedroom
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
