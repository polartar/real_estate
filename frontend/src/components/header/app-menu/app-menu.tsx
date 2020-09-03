import { Component, h, Prop} from '@stencil/core';
import { Store, Action } from '@stencil/redux';
import authSelectors from '../../../store/selectors/auth';
import { logout } from '../../../store/actions/auth';
import { RouterService } from '../../../services/router.service';

@Component({
  tag: 'app-menu',
  styleUrl: 'app-menu.scss'
})
export class AppMenu {
  @Prop({ context: "store" }) store: Store;
  isLoggedIn: boolean = false;
  logout: Action;

  componentWillRender() {
    this.store.mapStateToProps(this, state => {
      return {
        isLoggedIn: authSelectors.isLoggedIn(state)
      }
    });

    this.store.mapDispatchToProps(this, {
      logout: logout
    });
  }

  closeMenu() {
    const modal: any = document.querySelector('apt212-popover.app-menu');

    if (modal) {
      modal.dismiss();
    }
  }

  render() {
    return [
        <header class="app-menu-header">
          <div class="header-inner">
            <div class="app-header section">
              <ion-router-link href="/" class="logo-link">
                <img src="/assets/images/logo-black.svg" class="logo" alt="APT212 Logo" />
              </ion-router-link>

              <div class="header-center" />

              <ion-button aria-label="close" class="reset close" onClick={() => this.closeMenu()}>
                <ion-icon src="/assets/images/icons/cancel.svg" slot="icon-only" />
              </ion-button>
            </div>
          </div>
        </header>,
        <ion-content class="app-menu-container app-wrapper">

          <div class="section main-menu">
            <ion-router-link href={ RouterService.getRoute('search') } onClick={() => this.closeMenu()}>
              Furnished Apartments
            </ion-router-link>

            <ion-router-link href="/coming-soon" onClick={() => this.closeMenu()}>
              Rentals
            </ion-router-link>

            <ion-router-link href="/coming-soon" onClick={() => this.closeMenu()}>
              Sales
            </ion-router-link>

            <ion-router-link href="/coming-soon" onClick={() => this.closeMenu()}>
              Investments
            </ion-router-link>

            <ion-router-link href="#" onClick={() => this.closeMenu()}>
              &nbsp;
            </ion-router-link>

            <ion-router-link href="/coming-soon" onClick={() => this.closeMenu()}>
              Agents
            </ion-router-link>

            <ion-router-link href="/booking" onClick={() => this.closeMenu()}>
              Booking
            </ion-router-link>

            <ion-router-link href={ RouterService.getRoute('faq') } onClick={() => this.closeMenu()}>
              FAQ
            </ion-router-link>

            {
              this.isLoggedIn ?
                <ion-router-link href="/" onClick={() => { this.logout(); this.closeMenu(); }}>
                  Log Out
                </ion-router-link>
              : null
            }

          </div>
        </ion-content>
    ]
  }
}
