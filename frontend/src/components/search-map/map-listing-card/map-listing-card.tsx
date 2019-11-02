import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'map-listing-card',
  styleUrl: 'map-listing-card.scss'
})
export class MapListingCard {
  @Prop() item!: any;

  render() {
    return (
      <ion-router-link href={'/post/12345'}>
        <div class="map-listing-card-component">
          <img src="/assets/images/placeholder/apt1.jpeg" class="feature-image" />

          <div class="details">
            <h4 class="listing-title">{this.item.title}</h4>
              <div class="neighborhood">
                East Village
              </div>
              <div class="price">
                ${this.item.price} /month
              </div>
              <div class="avialable">
                Available 6.1.19
              </div>
              <div class="bed-bath">
                <div>
                  <img src="/assets/images/icons/bedroom.svg" class="bedrooms" alt="bedroom icon" /> {this.item.bedrooms} Bedroom
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
                  Elevator
                </div>
              </div>
          </div>
        </div>
      </ion-router-link>
    )
  }
}
