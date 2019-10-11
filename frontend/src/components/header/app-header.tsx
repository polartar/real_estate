import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.scss'
})
export class AppHeader {

  render() {
    return [
      <header class="app-header">
        <ion-router-link href="/" class="logo-link">
          <img src="/assets/images/logo.svg" class="logo"></img>
        </ion-router-link>

        <button class="search">
          <svg class="feather feather-search" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" stroke="black" stroke-width="3" fill="transparent"></circle><line stroke="black" stroke-width="3" x1="24" x2="16.65" y1="24" y2="16.65"></line></svg>
          Search Apartments
        </button>

        <div class="header-center" />

        <div class="header-right">
          <ion-router-link href="/" class="nav">
            Bookings
          </ion-router-link>

          <ion-router-link href="/" class="nav">
            FAQ
          </ion-router-link>

          <ion-button class="call">
            <ion-icon name="call"></ion-icon>
            Speak to an expert
          </ion-button>

          <ion-button fill="clear" class="menu">
            <ion-icon name="menu" slot="icon-only" />
          </ion-button>
        </div>
      </header>,

      <search-filters />
    ];
  }
}
