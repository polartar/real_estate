import { Component, h, Prop, State, Element } from '@stencil/core';
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
  @Element() el: HTMLElement;
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

  changeImage(dir) {
    const image: any = this.el.querySelector('.list-feature-image.active');

    if (dir === 'next') {

      if (image && image.nodeName === 'LAZY-IMAGE') {
        const nextImg = image.nextSibling;
        if (nextImg && nextImg.nodeName === 'LAZY-IMAGE') {
          image.classList.remove('active');
          nextImg.classList.add('active');

          const images = this.el.querySelectorAll('.list-feature-image');

          if (this.item.images.length > images.length) {
            // insert the next image

            const newImg = Object.assign(document.createElement('lazy-image'), {
              src: this.item.images[images.length],
              alt: `${this.item.street_address} image ${images.length}`
            });

            newImg.classList.add('list-feature-image');

            nextImg.insertAdjacentElement('afterend', newImg);
          }

          if (nextImg.nextSibling.nodeName !== 'LAZY-IMAGE') {
            this.el.querySelector('.gallery .controls .next').setAttribute('disabled', 'disabled');
          }

          this.el.querySelector('.gallery .controls .previous').removeAttribute('disabled');
        }
      }
    }
    else {
      if (image && image.nodeName === 'LAZY-IMAGE') {
        const prevImg = image.previousSibling;
        if (prevImg && prevImg.nodeName === 'LAZY-IMAGE') {
          image.classList.remove('active');
          prevImg.classList.add('active');

          if (!prevImg.previousSibling || (prevImg.previousSibling && prevImg.previousSibling.nodeName !== 'LAZY-IMAGE')) {
            this.el.querySelector('.gallery .controls .previous').setAttribute('disabled', 'disabled');
          }

          this.el.querySelector('.gallery .controls .next').removeAttribute('disabled');
        }
      }
    }
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

    return [
        <div class="search-listing-card" onMouseEnter={() => this.setSearchListingHover(this.item.map_marker_ids)} onMouseLeave={() => this.setSearchListingHover(false)}>
            <maintain-ratio width={322} height={182}>
              <div class="gallery">
              {
                this.item.images.length === 0 ?
                <lazy-image src={this.getImageURL()} class="list-feature-image" alt={this.item.street_address} />
                : null
              }

              {
                this.item.images.filter((_i, ind) => ind < 2).map((href, index) => <lazy-image src={href} class={{'list-feature-image': true, active: index === 0}} alt={`${this.item.street_address} image ${index + 1}`} />)
              }

              {
                this.item.images.length > 1 ?
                <div class="controls">
                  <button class="button-reset previous" disabled aria-label="Previous image" onClick={() => this.changeImage('prev')}>
                    <ion-icon name="play" />
                  </button>
                  <button class="button-reset next" aria-label="Next image" onClick={() => this.changeImage('next')}>
                    <ion-icon name="play" />
                  </button>
                </div>
                : null
              }
              </div>
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
                {formatMoney(this.item.rate)} /month
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

              <apt212-checkbox checked={this.selectedListings.includes(this.item.id)} onCheckBoxChange={e => this.setSelectedListing(this.item.id, e.detail.checked)}>
                <span class="sr-only">Select this listing</span>
              </apt212-checkbox>
            </div>
          </div>
        </div>
    ];
  }
}
