import { Component, h, Host, Prop, State, Element } from '@stencil/core';
import { Store } from '@stencil/redux';
import { searchSelectors } from '../../../store/selectors/search';
import {formatMoney } from '../../../helpers/utils';
import { getBedsListingText } from '../../../helpers/filters';
import taxonomySelectors from '../../../store/selectors/taxonomy';

@Component({
  tag: 'map-listing-marker',
  styleUrl: 'map-listing-marker.scss'
})
export class MapListingMarker {
  @Element() el: HTMLElement;
  @Prop({ context: "store" }) store: Store;
  @Prop() markerId!: any;

  @State() text: string = '';
  @State() hoverText: string = '';
  @State() mapMarkers: any[] = [];

  _ids: any = [];
  bedroomTypes: any[] = [];

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {

      return {
        bedroomTypes: taxonomySelectors.getBedroomTypes(state),
        mapMarkers: searchSelectors.getMapMarkers(state)
      }
    });
  }


  componentDidLoad() {
    const marker = this.mapMarkers.find(m => m.id === parseInt(this.markerId));
    if (!marker) {
      return;
    }

    if (marker.apartments_count === 1) {
      const bedroomType = taxonomySelectors.getBedroomTypeById(marker.apartments[0].bedroom_type_id, this.bedroomTypes);
      this.text = formatMoney(marker.apartments[0].rate);

      this.hoverText = `${formatMoney(marker.apartments[0].rate)} | ${getBedsListingText(bedroomType, 'short')} | ${marker.apartments[0].bathrooms} BA`;
    }
    else {
      this.text = `${marker.apartments_count} listings`;

      if (marker.min_rate === marker.max_rate) {
        this.hoverText = formatMoney(marker.max_rate);
      }
      else {
        this.hoverText = `${formatMoney(marker.min_rate)} - ${formatMoney(marker.max_rate)}`;
      }
    }
  }

  componentDidRender() {
    // center the hover-card
    const card: any = this.el.querySelector('.hover-card');
    const container: any = this.el.querySelector('.marker-container');

    const containerWidth = container.clientWidth;
    const cardWidth = card.clientWidth;

    const left = Math.round((cardWidth - containerWidth) / 2)

    card.style.marginLeft = `-${left}px`;
  }

  select() {
    const map: any = this.el.closest('search-map');

    // set listing details
    map.showDetails(this.markerId);
  }

  render() {
    return (
      <Host class="map-listing-marker">
        <div class="marker-container">
          <div class="hover-card">
            {this.hoverText}
          </div>
          <a aria-label="View listing details" onClick={() => this.select()}>{this.text}</a>
        </div>
      </Host>
    )
  }
}
