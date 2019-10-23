import { Component, h, Prop, State } from '@stencil/core';
import { Store } from "@stencil/redux";

@Component({
  tag: 'listing-card',
  styleUrl: 'listing-card.scss'
})
export class ListingCard {
  @Prop({ context: "store" }) store: Store;
  @State() size: string = 'phone-only';
  @Prop() item: any = {
    id: Math.round(Math.random() * 10000),
    title: 'East Village',
    price: 1400,
    bedrooms: 3,
    bathrooms: 3,
    text: Math.round(Math.random() * 100),
    rating: 4,
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

  render() {

    return [
      <ion-router-link href={'/post/' + this.item.id}>
        <div class="listing-card">
          <lazy-image src="/assets/images/placeholder/apt1.jpeg" class="list-feature-image" alt={this.item.title} />
          <h4 class="listing-title">{this.item.title}</h4>
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
                color="#f3b445"
                rating={this.item.rating}
                readonly
            />

            <div class="amenities">
              Elevator
            </div>
          </div>
        </div>
      </ion-router-link>
    ];
  }
}
