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

  async openMenu() {
    ModalService.siteMenu();
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

            <ion-router-link href="/wishlist" class="mobile-wishlist">
              <ion-icon src="/assets/images/icons/heart_icon_white.svg" />
            </ion-router-link>

            <ion-router-link href={ RouterService.getRoute('search')} class="mobile-wishlist">
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

              <ion-button aria-label="Menu" fill="clear" class="menu reset" onClick={() => this.openMenu()}>
                <ion-icon aria-label="Menu" src="/assets/images/icons/hamburger-white.svg" slot="icon-only" />
              </ion-button>
            </div>
          </div>
        </div>
      </header>
    ];
  }
}
