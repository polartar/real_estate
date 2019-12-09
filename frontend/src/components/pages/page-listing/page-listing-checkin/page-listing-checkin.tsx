import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-listing-checkin',
  styleUrl: 'page-listing-checkin.scss'
})
export class PageListingCheckin {
  render() {
    return (
      <div class="page-listing-checkin-component">
        <div class="check-in-out">
          <button class="button-reset">
            Check In
          </button>

          <img src="/assets/images/icons/arrow.svg" />

          <button class="button-reset">
            Check Out
          </button>
        </div>
      </div>
    )
  }
}
