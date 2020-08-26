import { Component, h, State, Prop, Element } from '@stencil/core';
import { Store } from "@stencil/redux";
import wishlistSelectors from '../../../store/selectors/wishlist';
import { ModalService } from '../../../services/modal.service';
import { RouterService } from '../../../services/router.service';

@Component({
  tag: 'app-header-home',
  styleUrl: 'app-header-home.scss'
})
export class AppHeaderHome {
  @Prop({ context: "store" }) store: Store;
  @Prop() hideSearchButton: boolean = false;
  @State() isMobile: boolean;
  @Element() el: HTMLElement;

  @State() wishlist: any[];

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      const {
        screenSize: { isMobile },
      } = state;

      return {
        isMobile,
        wishlist: wishlistSelectors.getWishlist(state)
      };
    });
  }

  async openMenu(e) {
    if (this.isMobile) {
      this.openMobileMenu();
    }
    else {
      this.openDesktopMenu(e);
    }

    // const popover = Object.assign(document.createElement('apt212-popover'), {
    //   component: 'app-menu',
    //   componentProps: {
    //     inModal: true
    //   },
    //   target: ev.currentTarget,
    //   styleOverride: {
    //     width: '100%',
    //     height: '100%',
    //     top: 0,
    //     left: 0,
    //     transform: 'none'
    //   },
    //   bindTo: {
    //     target: 'none',
    //     popover: 'none'
    //   },
    // });

    // popover.classList.add('app-menu');

    // document.body.appendChild(popover);
  }

  async openMobileMenu() {
    const slideover = Object.assign(document.createElement('apt212-slideover'), {
      component: 'app-menu-mobile',
      componentProps: {
        inModal: true
      }
    });

    slideover.classList.add('site-menu');

    document.body.appendChild(slideover);
  }

  async openDesktopMenu(_ev) {
    ModalService.siteMenu();
    // const popover = Object.assign(document.createElement('apt212-popover'), {
    //   component: 'app-menu',
    //   componentProps: {
    //     inModal: true
    //   },
    //   target: _ev.currentTarget,
    //   styleOverride: {
    //     width: '100%',
    //     height: '100%',
    //     top: 0,
    //     left: 0,
    //     transform: 'none'
    //   },
    //   bindTo: {
    //     target: 'none',
    //     popover: 'none'
    //   },
    // });

    // popover.classList.add('app-menu');

    // document.body.appendChild(popover);
  }

  async launchMobileFilterMenu() {
    const modal: any = Object.assign(document.createElement('ion-modal'), {
      component: 'mobile-filter-menu',
      cssClass: 'app-menu'
    });

    document.body.appendChild(modal);
    return modal.present();
  }

  render() {
    return [
      <header class="app-header-home">
        <div class="header-inner">
          <div class="app-header section">
            <ion-router-link href="/" class="logo-link">
              <img src="/assets/images/logo-white.svg" class="logo" alt="APT212 Logo" />
            </ion-router-link>

            {
              this.hideSearchButton ?
                null
              :
              <button class="search" aria-label="Search" onClick={() => RouterService.forward(RouterService.getRoute('search'))}>
                <svg class="feather feather-search" viewBox="0 0 25 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path d="M24,21.1886008 L18.6803754,15.9186997 C19.949079,14.3099652 20.6588954,12.3179013 20.6588954,10.238277 C20.6588954,5.14393658 16.472729,1 11.3303363,1 C6.18621089,1 2,5.14393658 2,10.238277 C2,15.3308573 6.18616646,19.4765539 11.3303363,19.4765539 C13.3071236,19.4765539 15.2318387,18.8457674 16.8196842,17.7010588 L22.1704099,23 L24,21.1886008 Z M11.3302919,16.9140717 C7.61273046,16.9140717 4.58934605,13.9182757 4.58934605,10.238365 C4.58934605,6.55849823 7.61268603,3.56265825 11.3302919,3.56265825 C15.0461205,3.56265825 18.0694605,6.55845423 18.0694605,10.238365 C18.0694605,12.2063608 17.1982293,14.0643123 15.6796059,15.3379854 C14.4664401,16.3537734 12.9218251,16.9140717 11.3302919,16.9140717 Z" fill="#000000"></path></g></svg>
                Search Apartments
              </button>
            }

            <ion-router-link href="/wishlist" class="mobile-wishlist">
              <ion-icon src="/assets/images/icons/heart_icon_white.svg" />
            </ion-router-link>

            <ion-router-link onClick={() => this.launchMobileFilterMenu()} class="mobile-wishlist">
              <ion-icon src="/assets/images/icons/search-icon-white.svg" />
            </ion-router-link>

            <div class="header-center" />

            <div class="header-right">

              <ion-router-link href="/wishlist" class="nav">
                Wish List{ this.wishlist.length ? ` | ${this.wishlist.length}` : null }
              </ion-router-link>

              <ion-button aria-label="Speak to an expert" class="call button-light" onClick={() => ModalService.contactUs()}>
                Speak to an Expert
              </ion-button>

              <ion-button aria-label="Menu" fill="clear" class="menu reset" onClick={e => this.openMenu(e)}>
                <ion-icon aria-label="Menu" src="/assets/images/icons/hamburger-white.svg" slot="icon-only" />
              </ion-button>
            </div>
          </div>
        </div>
      </header>
    ];
  }
}
