import { Component, h, Host, Prop, State, Element } from '@stencil/core';
import { Store } from '@stencil/redux';
import { searchSelectors } from '../../../store/selectors/search';
import {formatMoney } from '../../../helpers/utils';
import { getBedsListingText } from '../../../helpers/filters';

@Component({
  tag: 'map-listing-marker',
  styleUrl: 'map-listing-marker.scss'
})
export class MapListingMarker {
  @Element() el: HTMLElement;
  @Prop({ context: "store" }) store: Store;
  @Prop() ids!: any;
  @Prop() lat!: string;
  @Prop() lng!: string;

  @State() text: string = '';
  @State() hoverText: string = '';

  _ids: any = [];
  listings: any = [];

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {

      return {
        listings: searchSelectors.getListings(state)
      }
    });
  }


  componentDidLoad() {
    if (Array.isArray(this.ids)) {
      this._ids = this.ids;
    }
    else {
      this._ids = JSON.parse(this.ids);
    }

    const items = [];

    this._ids.forEach(id => {

      const item = this.listings.find(l => l.id === id);

      items.push(item);
    });

    if (items.length === 1) {
      this.text = formatMoney(items[0].price);

      this.hoverText = `${formatMoney(items[0].price)} | ${getBedsListingText(items[0].bedrooms, 'short')} | ${items[0].bathrooms} BA`;
    }
    else {
      let priceMin = 0;
      let priceMax = 0;

      items.forEach(item => {
        priceMin = priceMin === 0 ? item.price : Math.min(priceMin, item.price);
        priceMax = Math.max(priceMax, item.price);
      });

      this.text = `${items.length} listings`

      if (priceMin === priceMax) {
        this.hoverText = formatMoney(priceMax);
      } else {
        this.hoverText = `${formatMoney(priceMin)} - ${formatMoney(priceMax)}`;
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
    map.showDetails(this.ids, this.lat, this.lng);
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
