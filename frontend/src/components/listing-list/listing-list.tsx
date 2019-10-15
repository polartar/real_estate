import { Component, h  } from '@stencil/core';

@Component({
  tag: 'listing-list',
  styleUrl: 'listing-list.scss'
})
export class ListingList {

  componentDidLoad() {

  }

  render() {
    return [
      <div class="listing-list">
        <div class="list-wrapper">
          <listing-card />
          <listing-card />
          <listing-card />
          <listing-card />
          <listing-card />
          <listing-card />
          <listing-card />
          <listing-card />
        </div>
        <ion-router-link href="/" class="show-all">Show All ></ion-router-link>
      </div>
    ];
  }
}
