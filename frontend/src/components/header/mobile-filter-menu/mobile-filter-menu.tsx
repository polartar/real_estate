import { Component, h, State} from '@stencil/core';

@Component({
  tag: 'mobile-filter-menu',
  styleUrl: 'mobile-filter-menu.scss'
})
export class AppMenu {
  @State() display: string = 'menu';
  closeModal() {
    const modal = document.querySelector('ion-modal');

    if (modal) {
      modal.dismiss();
    }
  }

  getMenu() {
    return (
      <ion-list mode="md">
        <ion-item button mode="md" detail detailIcon="md-arrow-dropright" onClick={() => this.display = 'locations'}>
          Locations
        </ion-item>

        <ion-item button mode="md" detail detailIcon="md-arrow-dropright" onClick={() => this.display = 'time'}>
          Time
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

        <ion-item aria-label="Search" class="search" button mode="md" detail detailIcon="md-arrow-dropright">
          Search
        </ion-item>
      </ion-list>
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


  render() {
    let title, content;

    switch (this.display) {
      case 'locations':
        title = 'Locations';
        content = this.getLocations();
      break;

      case 'time':
        title = 'Time';
        content = this.getTime();
      break;

      case 'price':
        title = 'Price';
        content = this.getPrice();
      break;

      case 'building-type':
        title = 'Building Type';
        content = this.getBuildingType();
      break;

      case 'beds-baths':
        title = 'Beds and baths';
        content = this.getBedsBaths();
      break;

      case 'menu':
      default:
        title = 'Search Filters';
        content = this.getMenu();
      break;
    }

    return [
        <ion-header>
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
        </ion-header>,

        <ion-content class="mobile-filter-menu">
          {content}
        </ion-content>
    ]
  }
}
