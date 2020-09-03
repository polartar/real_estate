import { Component, h, Prop } from '@stencil/core';
import { Store, Action } from '@stencil/redux';
import taxonomySelectors from '../../../../store/selectors/taxonomy';
import { formatMoney } from '../../../../helpers/utils';
import { getBedsListingText } from '../../../../helpers/filters';
import { removeFromWishlist } from '../../../../store/actions/wishlist';

@Component({
  tag: 'wishlist-card',
  styleUrl: 'wishlist-card.scss'
})
export class WishlistCard {
  @Prop({ context: "store" }) store: Store;
  @Prop() item!: any;

  removeFromWishlist: Action;

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

    this.store.mapDispatchToProps(this, {
      removeFromWishlist
    });
  }

  getImageURL() {
    console.log(this.item.images);
    return this.item.images.length ? this.item.images[0].medium : '/assets/images/placeholder/apt1.jpeg';
  }

  removeWishlist() {
    this.removeFromWishlist([this.item.id]);
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
              <ion-router-link href={this.item.url_path}>{this.item.cross_streets}</ion-router-link>
            </h4>
            <div class="neighborhood">
              <ion-router-link href={this.item.url_path}>
                {neighborhood.name}
              </ion-router-link>
            </div>
            <div class="price">
              <ion-router-link href={this.item.url_path}>
                {formatMoney(this.item.rate)} /month
              </ion-router-link>
            </div>
            <div class="bed-bath">
              <div>
                <lazy-image src="/assets/images/icons/bedroom.svg" class="bedrooms" alt="bedroom" /> {getBedsListingText(bedroomType)}
              </div>
              <div class="divider">
                |
              </div>
              <div>
                <lazy-image src="/assets/images/icons/bathroom.svg" class="bathrooms" alt="bathroom" /> {this.item.bathrooms} Bathroom
              </div>
            </div>
            <div class="rating-amenities">
              <div class="amenities">
                { buildingType.name }
              </div>

              <star-rating
                  stars={5}
                  size={18}
                  rating={buildingType.rating}
                  readonly
              />
            </div>

            <ion-router-link class="button-dark view-apt" href={this.item.url_path}>
              VIEW APARTMENT
            </ion-router-link>

            <ion-router-link class="button-dark view-apt" onClick={() => this.removeWishlist()}>
              REMOVE FROM WISHLIST
            </ion-router-link>
        </div>
      </div>
    );
  }
}
