import { Component, h, State, Prop, Element } from '@stencil/core';
import { Store, Action } from "@stencil/redux";
import { toggleSearchFilterDisplay } from "../../store/actions/search-filters";
import { updateHeaderHeight } from '../../store/actions/screensize';

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.scss'
})
export class AppHeader {
  @Prop({ context: "store" }) store: Store;
  @Prop() hideSearchButton: boolean = false;
  @State() displayFilter: boolean;
  @State() size: string;
  @State() isMobile: boolean;
  @Element() el: HTMLElement;

  toggleSearchFilterDisplay: Action;
  updateHeaderHeight: Action;

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      const {
        searchFilters: { displayFilter },
        screenSize: { size, isMobile },
      } = state;

      return {
        displayFilter,
        size,
        isMobile
      };
    });

    this.store.mapDispatchToProps(this, {
      toggleSearchFilterDisplay,
      updateHeaderHeight
    });
  }

  componentDidRender() {
    // page components may need to calculate things with the header height, like the sticky map
    let headerHeight = this.el.querySelector('.app-header').clientHeight;

    this.updateHeaderHeight(headerHeight);
  }

  async openMenu() {
    const modal = Object.assign(document.createElement('ion-modal'), {
      component: 'app-menu',
      cssClass: 'app-menu'
    });

    document.body.appendChild(modal);
    return modal.present();
  }

  async launchMobileFilterMenu() {
    const modal = Object.assign(document.createElement('ion-modal'), {
      component: 'mobile-filter-menu',
      cssClass: 'app-menu'
    });

    document.body.appendChild(modal);
    return modal.present();
  }

  activateSearch() {
    if (this.isMobile) {
      this.launchMobileFilterMenu();
    }
    else {
      this.toggleSearchFilterDisplay(!this.displayFilter);
    }
  }

  render() {
    return [
      <header class="header-wrapper">
        <div class="header-inner">
          <div class="app-header section">
            <ion-router-link href="/" class="logo-link">
              <img src="/assets/images/logo.svg" class="logo" alt="APT212 Logo"></img>
            </ion-router-link>

            { !this.hideSearchButton ?
            <button class="search" aria-label="Search" onClick={() => { this.activateSearch() }}>
              <svg class="feather feather-search" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" stroke="black" stroke-width="3" fill="transparent"></circle><line stroke="black" stroke-width="3" x1="24" x2="16.65" y1="24" y2="16.65"></line></svg>
              Search Apartments
            </button>
            : null
            }

            <div class="header-center" />

            <div class="header-right">
              <ion-router-link href="/" class="nav">
                Bookings
              </ion-router-link>

              <ion-router-link href="/" class="nav">
                FAQ
              </ion-router-link>

              <ion-button aria-label="Speak to an expert" class="call">
                <ion-icon name="call"></ion-icon>
                Speak to an expert
              </ion-button>

              <ion-button aria-label="Menu" fill="clear" class="menu" onClick={() => this.openMenu()}>
                <ion-icon aria-label="Menu" src="/assets/images/icons/hamburger.svg" slot="icon-only" />
              </ion-button>
            </div>
          </div>

          <div class="search-filters-wrapper">
              {this.displayFilter ? <search-filters /> : ''}
          </div>
        </div>
      </header>
    ];
  }
}
