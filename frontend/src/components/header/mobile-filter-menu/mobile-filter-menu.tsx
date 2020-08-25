import { Component, h, State, Element } from '@stencil/core';
import { RouterService } from '../../../services/router.service';

@Component({
  tag: 'mobile-filter-menu',
  styleUrl: 'mobile-filter-menu.scss'
})
export class AppMenu {
  @State() display: string = 'menu';
  @Element() el: HTMLElement;

  closeModal() {
    const modal = document.querySelector('ion-modal');

    if (modal) {
      modal.dismiss();
    }
  }

  getMenu() {
    return (
      <ion-list mode="md">
        <ion-item button mode="md" detail detailIcon="md-arrow-dropright" onClick={() => this.display = 'market'}>
          Market
        </ion-item>

        <ion-item button mode="md" detail detailIcon="md-arrow-dropright" onClick={() => this.display = 'locations'}>
          Locations
        </ion-item>

        <ion-item button mode="md" detail detailIcon="md-arrow-dropright" onClick={() => this.display = 'time'}>
          Move In Date
        </ion-item>

        <ion-item button mode="md" detail detailIcon="md-arrow-dropright" onClick={() => this.display = 'price'}>
          Price
        </ion-item>

        <ion-item button mode="md" detail detailIcon="md-arrow-dropright" onClick={() => this.display = 'beds-baths'}>
          Bed and Baths
        </ion-item>

        <ion-item button mode="md" detail detailIcon="md-arrow-dropright" onClick={() => this.display = 'building-type'}>
          Building Type
        </ion-item>

        <ion-item aria-label="Search" href={ RouterService.getRoute('search') } class="search" button mode="md" detail onClick={() => this.closeModal()} detailIcon="md-arrow-dropright">
          Search
        </ion-item>
      </ion-list>
    )
  }

  getMarket() {
    return (
      <div class="center-content">
        <market-filter />
      </div>
    )
  }

  getTime() {
    return (
      <div class="center-content">
        <move-in-date-filter />
      </div>
    )
  }

  getPrice() {
    return (
      <div class="center-content">
        <price-filter />
      </div>
    )
  }

  getBuildingType() {
    return (
      <div class="center-content">
        <building-type-filter />
      </div>
    )
  }

  getBedsBaths() {
    return (
      <div class="center-content">
        <bedroom-filter />

        <bathroom-filter />
      </div>
    )
  }

  getLocations() {
    return [
        <div class="center-content">
          <location-filter />
        </div>
    ]
  }

  getMarkets() {
    return [
      <div class="center-content">
        <market-filter />
      </div>
    ]
  }

  bedBathSelectAll(on) {
    const beds = this.el.querySelector('bedroom-filter');
    const baths = this.el.querySelector('bathroom-filter');

    if (on) {
      beds.selectAll();
      baths.selectAll();
    }
    else {
      beds.clearAll();
      baths.clearAll();
    }
  }

  buildingTypeSelectAll(on) {
    const buildingTypes = this.el.querySelector('building-type-filter');

    if (on) {
      buildingTypes.selectAll();
    }
    else {
      buildingTypes.clearAll();
    }
  }

  render() {
    let title, content, headersuffix;

    let className = `mobile-filter-menu ${this.display}`;

    switch (this.display) {
      case 'market':
        title = 'Market';
        content = this.getMarket();
      break;

      case 'locations':
        title = 'Locations';
        content = this.getLocations();
      break;

      case 'markets':
        title = 'Market';
        content = this.getMarkets();
      break;

      case 'time':
        title = 'Move In Date';
        content = this.getTime();
      break;

      case 'price':
        title = 'Price';
        content = this.getPrice();
      break;

      case 'building-type':
        title = 'Building Type';
        content = this.getBuildingType();

        headersuffix = <div class="bed-bath-header">
          <ion-button aria-label="Select All" onClick={() => {this.buildingTypeSelectAll(true) }}>Select All</ion-button>
          <ion-button aria-label="Clear All" class="reset" onClick={() => {this.buildingTypeSelectAll(false) }}>Clear All</ion-button>
        </div>
      break;

      case 'beds-baths':
        title = 'Beds and baths';
        content = this.getBedsBaths();

        headersuffix = <div class="bed-bath-header">
          <ion-button aria-label="Select All" onClick={() => {this.bedBathSelectAll(true) }}>Select All</ion-button>
          <ion-button aria-label="Clear All" class="reset" onClick={() => {this.bedBathSelectAll(false) }}>Clear All</ion-button>
        </div>
      break;

      case 'menu':
      default:
        title = 'Search Filters';
        content = this.getMenu();
      break;
    }

    return [
        <ion-header class={className}>
          <ion-toolbar mode="md">
            { this.display !== 'menu' ?
            <ion-buttons slot="start">
              <ion-button aria-label="Menu" class="reset" onClick={() => this.display = 'menu'}>
                <ion-icon mode="md" name="md-arrow-back" slot="icon-only" />
              </ion-button>
            </ion-buttons>
            : '' }

            <ion-title>{title}</ion-title>

            <ion-buttons slot="end">
              <ion-button aria-label="Close" class="reset" onClick={() => this.closeModal()}>
                <ion-icon mode="md" name="md-close" slot="icon-only" />
              </ion-button>
            </ion-buttons>
          </ion-toolbar>

          {headersuffix}
        </ion-header>,

        <ion-content class={className}>
          {content}
        </ion-content>
    ]
  }
}
