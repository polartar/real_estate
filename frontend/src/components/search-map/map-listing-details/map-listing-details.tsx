import { Component, h, Host, Prop, State } from '@stencil/core';
import { Store } from '@stencil/redux';
import { searchSelectors } from '../../../store/selectors/search';

@Component({
  tag: 'map-listing-details',
  styleUrl: 'map-listing-details.scss'
})
export class MapListingDetails {
  @Prop({ context: "store" }) store: Store;
  @Prop() ids!: any;

  @State() items: any = [];
  listings: any = [];

  _ids: any;

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

    this.items = items;
  }

  render() {
    return (
      <Host>
        <div class="map-listing-details-component">
          { this.items.map(item => <map-listing-card item={item} /> )}
        </div>
      </Host>
    )
  }
}
