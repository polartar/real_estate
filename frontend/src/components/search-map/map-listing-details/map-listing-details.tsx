import { Component, h, Host, Prop, State } from '@stencil/core';
import { Store } from '@stencil/redux';
import { searchSelectors } from '../../../store/selectors/search';

@Component({
  tag: 'map-listing-details',
  styleUrl: 'map-listing-details.scss'
})
export class MapListingDetails {
  @Prop({ context: "store" }) store: Store;
  @Prop() markerId!: any;

  @State() items: any = [];
  mapMarkers: any = [];

  _ids: any;

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        mapMarkers: searchSelectors.getMapMarkers(state)
      }
    });
  }

  componentDidLoad() {
    const marker = this.mapMarkers.find(m => m.id === parseInt(this.markerId));
    if (!marker) {
      return;
    }

    this.items = marker.apartments;
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
