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
          alt: `${neighborhood.name} furnished apartments`
        }
      ]
    }
    else {
      images = this.item.images.map((image) => {
        const suffixes = [
          'furnished apartments',
          'furnished rental',
          'apartments'
        ];

        const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

        return {
          src: image.small,
          alt: `${neighborhood.name} ${suffix}`
        }
      });
    }

    return [
        <div class="search-listing-card" onMouseEnter={() => this.setSearchListingHover(this.item.map_marker_ids)} onMouseLeave={() => this.setSearchListingHover(false)}>
            <maintain-ratio width={322} height={182}>
              <inline-gallery class="gallery" images={images} />
            </maintain-ratio>
          <div class={{"listing-content-padding": this.contentPadding}}>
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
            <div class="available">
              <ion-router-link href={this.item.url_path}>
                Available {formatDate(new Date(this.item.available_date))}
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
              <star-rating
                  stars={5}
                  size={16}
                  rating={buildingType.rating}
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
