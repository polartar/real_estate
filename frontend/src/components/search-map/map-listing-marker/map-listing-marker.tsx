import { Component, h, Host, Prop, State, Element } from '@stencil/core';
import { Store } from '@stencil/redux';
import { searchSelectors } from '../../../store/selectors/search';
import {formatMoney } from '../../../helpers/utils';

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
