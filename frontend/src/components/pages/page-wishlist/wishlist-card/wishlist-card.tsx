import { Component, h, Prop } from '@stencil/core';
import { Store } from '@stencil/redux';
import taxonomySelectors from '../../../../store/selectors/taxonomy';
import { formatMoney } from '../../../../helpers/utils';
import { getBedsListingText } from '../../../../helpers/filters';

@Component({
  tag: 'wishlist-card',
  styleUrl: 'wishlist-card.scss'
})
export class WishlistCard {
  @Prop({ context: "store" }) store: Store;
  @Prop() item!: any;

  neighborhoods: any[] = [];
  bedroomTypes: any[] = [];
  buildingTypes: any[] = [];

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        neighborhoods: taxonomySelectors.getNeighborhoods(state),
        bedroomTypes: taxonomySelectors.getBedroomTypes(state),
        buildingTypes: taxonomySelectors.getBuildingTypes(state),
      };
    });
  }

  getImageURL() {
    console.log(this.item.images);
    return this.item.images.length ? this.item.images[0].medium : '/assets/images/placeholder/apt1.jpeg';
  }

  render() {
    let neighborhood = taxonomySelectors.getNeighborhoodById(this.item.neighborhood_ids[0], this.neighborhoods);
    if (!neighborhood) {
      neighborhood = {
        name: 'Unknown Neighborhood'
      }
    }

    const bedroomType = taxonomySelectors.getBedroomTypeById(this.item.bedroom_type_id, this.bedroomTypes);
    const buildingType = taxonomySelectors.getBuildingTypeById(this.item.building_type_id, this.buildingTypes);

    let images;
    if (this.item.images.length === 0) {
      images = [
        {
          src: this.getImageURL(),
          alt: this.item.street_address
        }
      ]
    }
    else {
      images = this.item.images.map((image, index) => { return { src: image.small, alt: `${this.item.street_address} image ${index + 1}` } });
    }


    return (
      <div class="wishlist-card-component">
        {
          images.length ?
          <div class="gallery">
            <maintain-ratio width={377} height={251}>
              <inline-gallery images={images} />
            </maintain-ratio>
          </div>
          : null
        }

        <div class="info">
          <h4 class="listing-title">
              <ion-router-link href={'/listing/' + this.item.id}>{this.item.cross_streets}</ion-router-link>
            </h4>
            <div class="neighborhood">
              <ion-router-link href={'/listing/' + this.item.id}>
                {neighborhood.name}
              </ion-router-link>
            </div>
            <div class="price">
              <ion-router-link href={'/listing/' + this.item.id}>
                {formatMoney(this.item.rate)} /month
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
              <div class="amenities">
                { buildingType.name }
              </div>

              <star-rating
                  stars={buildingType.rating}
                  size={18}
                  rating={this.item.rating}
                  readonly
              />
            </div>

            <ion-router-link class="button-dark view-apt" href={'/listing/' + this.item.id}>
              VIEW APARTMENT
            </ion-router-link>
        </div>
      </div>
    );
  }
}
