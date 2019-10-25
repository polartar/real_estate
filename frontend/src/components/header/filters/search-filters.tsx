import { Component, h, Prop } from '@stencil/core';
import { Store, Action } from "@stencil/redux";
import { toggleSearchFilterDisplay } from "../../../store/actions/search-filters";

@Component({
  tag: 'search-filters',
  styleUrl: 'search-filters.scss'
})
export class SearchFilters {
  @Prop({ context: "store" }) store: Store;
  toggleSearchFilterDisplay: Action;

  componentDidLoad() {
    this.store.mapDispatchToProps(this, {
      toggleSearchFilterDisplay
    });
  }

  async showFilterOptions(ev, component) {
    const popover = Object.assign(document.createElement('apt212-popover'), {
      component: component,
      componentProps: {
        inModal: true
      },
      event: ev
    });

    document.body.appendChild(popover);
  }

  async launchMobileFilterMenu() {
    const modal = Object.assign(document.createElement('ion-modal'), {
      component: 'mobile-filter-menu',
      cssClass: 'app-menu'
    });

    document.body.appendChild(modal);
    return modal.present();
  }

  render() {
    return (
      <div class="search-filters">
        <div class="section">
          <button aria-label="Location filter" class="button-reset dropdown" onClick={(e) => this.showFilterOptions(e, 'location-filter')}>
            Location
            <ion-icon mode="md" name="md-arrow-dropdown"></ion-icon>
          </button>

          <button aria-label="Move in date filter" class="button-reset dropdown" onClick={(e) => this.showFilterOptions(e, 'move-in-date-filter')}>
            Move In Date
            <ion-icon mode="md" name="md-arrow-dropdown"></ion-icon>
          </button>

          <button aria-label="Price filter" class="button-reset dropdown" onClick={(e) => this.showFilterOptions(e, 'price-filter')}>
            Price
            <ion-icon mode="md" name="md-arrow-dropdown"></ion-icon>
          </button>

          <button aria-label="Bedrooms filter" class="button-reset dropdown" onClick={(e) => this.showFilterOptions(e, 'bedroom-filter')}>
            Beds
            <ion-icon mode="md" name="md-arrow-dropdown"></ion-icon>
          </button>

          <button aria-label="Bathrooms filter" class="button-reset dropdown" onClick={(e) => this.showFilterOptions(e, 'bathroom-filter')}>
            Baths
            <ion-icon mode="md" name="md-arrow-dropdown"></ion-icon>
          </button>

          <button aria-label="Building types filter" class="button-reset dropdown" onClick={(e) => this.showFilterOptions(e, 'building-type-filter')}>
            Building Type
            <ion-icon mode="md" name="md-arrow-dropdown"></ion-icon>
          </button>

          <ion-button aria-label="Search" class="search" href="/search">Search</ion-button>

          <ion-button aria-label="Search Filters" class="reset mobile-filters" onClick={() => this.launchMobileFilterMenu()}>
            <ion-icon mode="md" name="md-funnel" slot="start"></ion-icon>
            Filter
          </ion-button>

          <div class="spacer" />

          <button aria-label="Close Filters" class="button-reset close" onClick={() => this.toggleSearchFilterDisplay(false)}>
            <ion-icon mode="md" name="md-close" slot="icon-only"/>
          </button>
        </div>
      </div>
    );
  }
}
