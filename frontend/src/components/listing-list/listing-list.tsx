import { Component, h, Prop  } from '@stencil/core';

@Component({
  tag: 'listing-list',
  styleUrl: 'listing-list.scss'
})
export class ListingList {
  @Prop() items: any[] = [];

  render() {
    return [
      <div class="listing-list">
        <div class="list-wrapper">
          { this.items.map(item => <listing-card item={item} />) }
        </div>
        <ion-router-link href="/search" class="show-all">Show All ></ion-router-link>
      </div>
    ];
  }
}
