import { Component, h, Host, Prop, State } from '@stencil/core';

@Component({
  tag: 'map-listing-details',
  styleUrl: 'map-listing-details.scss'
})
export class MapListingDetails {
  @Prop() ids!: any;

  @State() items: any = [];

  _ids: any;

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
        title: '351 Prospect Street',
        price: Math.round(Math.random() * 10000),
        bedrooms: Math.round(Math.ceil(Math.random() * 3)),
        bathrooms: Math.round(Math.ceil(Math.random() * 4)),
        rating: Math.round(Math.ceil(Math.random() * 5)),
      });
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
