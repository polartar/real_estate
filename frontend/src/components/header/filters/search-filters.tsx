import { Component, h } from '@stencil/core';

@Component({
  tag: 'search-filters',
  styleUrl: 'search-filters.scss'
})
export class SearchFilters {

  async showFilterOptions(ev, component) {
    const popover = Object.assign(document.createElement('ion-popover'), {
      component: component,
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
          <button aria-label="Location filter" class="button-reset dropdown" onClick={(e) => this.showFilterOptions(e, 'location-filter')}>
            Location
            <ion-icon name="arrow-dropdown"></ion-icon>
          </button>

          <button aria-label="Move in date filter" class="button-reset dropdown" onClick={(e) => this.showFilterOptions(e, 'move-in-date-filter')}>
            Move In Date
            <ion-icon name="arrow-dropdown"></ion-icon>
          </button>

          <button aria-label="Price filter" class="button-reset dropdown" onClick={(e) => this.showFilterOptions(e, 'price-filter')}>
            Price
            <ion-icon name="arrow-dropdown"></ion-icon>
          </button>

          <button aria-label="Bedrooms filter" class="button-reset dropdown" onClick={(e) => this.showFilterOptions(e, 'bedroom-filter')}>
            Beds
            <ion-icon name="arrow-dropdown"></ion-icon>
          </button>

          <button aria-label="Bathrooms filter" class="button-reset dropdown" onClick={(e) => this.showFilterOptions(e, 'bathroom-filter')}>
            Baths
            <ion-icon name="arrow-dropdown"></ion-icon>
          </button>

          <button aria-label="Building types filter" class="button-reset dropdown" onClick={(e) => this.showFilterOptions(e, 'building-type-filter')}>
            Building Type
            <ion-icon name="arrow-dropdown"></ion-icon>
          </button>

          <ion-button aria-label="Search">Search</ion-button>
        </div>
      </div>
    );
  }
}
