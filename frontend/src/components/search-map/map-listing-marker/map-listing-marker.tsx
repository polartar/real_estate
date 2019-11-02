import { Component, h, Host, Prop, State, Element } from '@stencil/core';
import {formatMoney } from '../../../helpers/utils';

@Component({
  tag: 'map-listing-marker',
  styleUrl: 'map-listing-marker.scss'
})
export class MapListingMarker {
  @Element() el: HTMLElement;
  @Prop() ids!: any;
  @Prop() lat!: string;
  @Prop() lng!: string;

  @State() text: string = '';

  _ids: any = [];



  componentDidLoad() {
    if (Array.isArray(this.ids)) {
      this._ids = this.ids;
    }
    else {
      this._ids = JSON.parse(this.ids);
    }

    const items = [];

    this._ids.forEach(id => {
      items.push({
        id,
        price: Math.round(Math.random() * 10000),
        beds: Math.round(Math.ceil(Math.random() * 3)),
        baths: Math.round(Math.ceil(Math.random() * 4)),
        rating: Math.round(Math.ceil(Math.random() * 5)),
      });
    });

    if (items.length === 1) {
      this.text = formatMoney(items[0].price);
    }
    else {
      this.text = `${items.length} listings`
    }
  }

  select() {
    const map: any = this.el.closest('search-map');

    // set listing details
    map.showDetails(this.ids, this.lat, this.lng);
  }

  render() {
    return (
      <Host class="map-listing-marker">
        <div>
          <a aria-label="View listing details" onClick={() => this.select()}>{this.text}</a>
        </div>
      </Host>
    )
  }
}
