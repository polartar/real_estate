import { Component, h } from '@stencil/core';

@Component({
  tag: 'search-filters',
  styleUrl: 'search-filters.scss'
})
export class SearchFilters {

  async showFilterOptions(ev) {
    const popover = Object.assign(document.createElement('ion-popover'), {
      component: 'location-filter',
      event: ev,
      showBackdrop: false
    });

    popover.classList.add('search-filter-popover');

    document.body.appendChild(popover);
    return popover.present();
  }


  render() {
    return (
      <div class="search-filters">
        <div class="section">
          <button class="button-reset dropdown" onClick={(e) => this.showFilterOptions(e)}>
            Location
            <ion-icon name="arrow-dropdown"></ion-icon>
          </button>

          <button class="button-reset dropdown">
            Move In Date
            <ion-icon name="arrow-dropdown"></ion-icon>
          </button>

          <button class="button-reset dropdown">
            Price
            <ion-icon name="arrow-dropdown"></ion-icon>
          </button>

          <button class="button-reset dropdown">
            Beds
            <ion-icon name="arrow-dropdown"></ion-icon>
          </button>

          <button class="button-reset dropdown">
            Baths
            <ion-icon name="arrow-dropdown"></ion-icon>
          </button>

          <button class="button-reset dropdown">
            Building Type
            <ion-icon name="arrow-dropdown"></ion-icon>
          </button>
        </div>
      </div>
    );
  }
}
