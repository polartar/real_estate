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
        <ion-item class="header">
          Search Filters
        </ion-item>

        <ion-item button mode="md" detail detailIcon="arrow-dropright" onClick={() => this.display = 'locations'}>
          Locations
        </ion-item>

        <ion-item button mode="md" detail detailIcon="arrow-dropright" onClick={() => this.display = 'time'}>
          Time
        </ion-item>

        <ion-item button mode="md" detail detailIcon="arrow-dropright" onClick={() => this.display = 'price'}>
          Price
        </ion-item>

        <ion-item button mode="md" detail detailIcon="arrow-dropright" onClick={() => this.display = 'beds-baths'}>
          Bed and Baths
        </ion-item>

        <ion-item button mode="md" detail detailIcon="arrow-dropright" onClick={() => this.display = 'building-type'}>
          Building Type
        </ion-item>

        <ion-item aria-label="Search" class="search" button mode="md" detail detailIcon="arrow-dropright">
          Search
        </ion-item>
      </ion-list>
    )
  }

  getTime() {
    return (
      <div>
        <ion-list>
          <ion-item class="mobile-filter-menu-back">
            <ion-button aria-label="Menu" class="reset" onClick={() => this.display = 'menu'}>
              <ion-icon name="arrow-back" slot="icon-only" />
            </ion-button>
            Time
          </ion-item>
        </ion-list>

        <div class="center-content">
          <move-in-date-filter />
        </div>
      </div>
    )
  }

  getPrice() {
    return (
      <div>
        <ion-list>
          <ion-item class="mobile-filter-menu-back">
            <ion-button aria-label="Menu" class="reset" onClick={() => this.display = 'menu'}>
              <ion-icon name="arrow-back" slot="icon-only" />
            </ion-button>
            Price
          </ion-item>
        </ion-list>

        <div class="center-content">
          <price-filter />
        </div>
      </div>
    )
  }

  getBuildingType() {
    return (
      <div>
        <ion-list>
          <ion-item  class="mobile-filter-menu-back">
            <ion-button aria-label="Menu" class="reset" onClick={() => this.display = 'menu'}>
              <ion-icon name="arrow-back" slot="icon-only" />
            </ion-button>
            Building Type
          </ion-item>
        </ion-list>

        <div class="center-content">
          <building-type-filter />
        </div>
      </div>
    )
  }

  getBedsBaths() {
    return (
      <div>
        <ion-list>
          <ion-item class="mobile-filter-menu-back">
            <ion-button aria-label="Menu" class="reset" onClick={() => this.display = 'menu'}>
              <ion-icon name="arrow-back" slot="icon-only" />
            </ion-button>
            Beds and Baths
          </ion-item>
        </ion-list>

        <div class="center-content">
          <bedroom-filter />

          <bathroom-filter />
        </div>
      </div>
    )
  }


  render() {
    let content;

    switch (this.display) {
      case 'menu':
        content = this.getMenu();
      break;

      case 'time':
        content = this.getTime();
      break;

      case 'price':
        content = this.getPrice();
      break;

      case 'building-type':
        content = this.getBuildingType();
      break;

      case 'beds-baths':
        content = this.getBedsBaths();
      break;

      default:
        content = this.getMenu();
      break;
    }

    return (
        <div class="mobile-filter-menu">

          {content}

          <ion-button class="reset close" onClick={() => this.closeModal()}>
            <ion-icon name="close" slot="icon-only" />
          </ion-button>
        </div>
    )
  }
}
