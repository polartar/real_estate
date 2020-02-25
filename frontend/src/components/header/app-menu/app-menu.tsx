import { Component, h, Prop} from '@stencil/core';
import { Store, Action } from '@stencil/redux';
import authSelectors from '../../../store/selectors/auth';
import { logout } from '../../../store/actions/auth';

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
                <img src="/assets/images/logo.svg" class="logo" alt="APT212 Logo" />
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
            <ion-router-link href="/search" onClick={() => this.closeMenu()}>
              Search Apartments
            </ion-router-link>

            <ion-router-link href="/booking" onClick={() => this.closeMenu()}>
              Bookings
            </ion-router-link>

            <ion-router-link href="/" onClick={() => this.closeMenu()}>
              List with us
            </ion-router-link>

            <ion-router-link href="/referral" onClick={() => this.closeMenu()}>
              Referrals
            </ion-router-link>

            <ion-router-link href="/" onClick={() => this.closeMenu()}>
              Brokers
            </ion-router-link>

            <ion-router-link href="/corporate-rooms" onClick={() => this.closeMenu()}>
              Corporate
            </ion-router-link>

            <ion-router-link href="/about" onClick={() => this.closeMenu()}>
              About APT212
            </ion-router-link>

            <ion-router-link href="/faq" onClick={() => this.closeMenu()}>
              FAQ
            </ion-router-link>

            {
              this.isLoggedIn ?
                <ion-router-link href="/" onClick={() => { this.logout(); this.closeMenu(); }}>
                  Log Out
                </ion-router-link>
              : null
            }

            <ion-button aria-label="Speak to an expert" href="/" onClick={() => this.closeMenu()}>
              <ion-icon name="call" slot="start" />
              Speak to an expert
            </ion-button>
          </div>
        </ion-content>
    ]
  }
}
