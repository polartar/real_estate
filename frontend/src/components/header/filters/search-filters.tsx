import { Component, h, Prop } from '@stencil/core';
import { Store, Action } from "@stencil/redux";
import { toggleSearchFilterDisplay } from "../../../store/actions/search-filters";
import { createAnimation } from '@ionic/core';

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
    const leaveAnimation = (baseEl: HTMLElement): any => {
      const baseAnimation = createAnimation();
      const backdropAnimation = createAnimation();
      const wrapperAnimation = createAnimation();

      backdropAnimation
        .addElement(baseEl.querySelector('ion-backdrop')!)
        .fromTo('opacity', 'var(--backdrop-opacity)', 0);

      wrapperAnimation
        .addElement(baseEl.querySelector('.popover-wrapper')!)
        .fromTo('opacity', 0.99, 0);

      return baseAnimation.addElement(baseEl).easing('ease').duration(0).addAnimation([backdropAnimation, wrapperAnimation]);
    };

    const popover = Object.assign(document.createElement('ion-popover'), {
      component: component,
      componentProps: {
        inModal: true
      },
      event: ev,
      showBackdrop: false,
      leaveAnimation: leaveAnimation
    });

    popover.classList.add('search-filter-popover');

    document.body.appendChild(popover);
    return popover.present();
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
