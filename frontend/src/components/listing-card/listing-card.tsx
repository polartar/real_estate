import { Component, h, Prop, State } from '@stencil/core';
import { Store } from "@stencil/redux";
import { getBedsListingText } from '../../helpers/filters';
import taxonomySelectors from '../../store/selectors/taxonomy';
import screensizeSelectors from '../../store/selectors/screensize';
import { formatMoney } from '../../helpers/utils';

@Component({
  tag: 'listing-card',
  styleUrl: 'listing-card.scss'
})
export class ListingCard {
  @Prop({ context: "store" }) store: Store;
  @Prop() contentPadding: boolean = false;
  @State() isMobile: boolean = true;
  @Prop() mode: '' | 'desktop' = '';

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
        isMobile: screensizeSelectors.getIsMobile(state)
      };
    });

  }

  getImageURL() {
    return this.item.images.length ? this.item.images[0].small : '/assets/images/placeholder/apt1.jpeg';
  }

  render() {
    const neighborhood = taxonomySelectors.getNeighborhoodById(this.item.neighborhood_ids[0], this.neighborhoods);
    const bedroomType = taxonomySelectors.getBedroomTypeById(this.item.bedroom_type_id, this.bedroomTypes);
    const buildingType = taxonomySelectors.getBuildingTypeById(this.item.building_type_id, this.buildingTypes);


    const classObj = { 'listing-card': true };
    if (this.mode) {
      classObj[this.mode] = true;
    }

    return [
      <ion-router-link href={this.item.url_path}>
        <div class={classObj}>
            <maintain-ratio width={322} height={182}>
              <lazy-image src={this.getImageURL()} class="list-feature-image" alt={neighborhood.name} />
            </maintain-ratio>
          <div class={{"listing-content-padding": this.contentPadding}}>
            <h4 class="listing-title">{neighborhood.name}</h4>
            <div class="price">
              {formatMoney(this.item.rate)} /month
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
                  size={this.isMobile && this.mode !== 'desktop' ? 16 : 16}
                  rating={buildingType.rating}
                  readonly
              />

              <div class="amenities">
                { buildingType.name }
              </div>
            </div>
          </div>
        </div>
      </ion-router-link>
    ];
  }
}
