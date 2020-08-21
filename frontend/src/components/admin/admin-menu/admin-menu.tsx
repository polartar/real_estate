import { Component, h, Prop} from '@stencil/core';
import { Store, Action } from '@stencil/redux';
import authSelectors from '../../../store/selectors/auth';
import { logout } from '../../../store/actions/auth';

@Component({
  tag: 'admin-menu',
  styleUrl: 'admin-menu.scss'
})
export class AdminMenu {
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
    const modal: any = document.querySelector('apt212-popover.admin-menu');

    if (modal) {
      modal.dismiss();
    }
  }

  render() {
    return [
        <header class="admin-menu-header">
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

          {
            this.isLoggedIn ?
            <div class="section main-menu">
              <ion-router-link href="/admin" onClick={() => this.closeMenu()}>
                Admin
              </ion-router-link>

              <ion-router-link href="/" onClick={() => this.closeMenu()}>
                Home
              </ion-router-link>

              <ion-router-link href="/admin/listings" onClick={() => this.closeMenu()}>
                Listings
              </ion-router-link>

              <ion-router-link href="/admin/owner-global" onClick={() => this.closeMenu()}>
                Owner Global Updates
              </ion-router-link>

              <ion-router-link href="/admin/agents" onClick={() => this.closeMenu()}>
                Agents
              </ion-router-link>

              <ion-router-link href="/admin/referrals" onClick={() => this.closeMenu()}>
                Referrals
              </ion-router-link>

              <ion-router-link href="/admin/booking-settings" onClick={() => this.closeMenu()}>
                Booking Settings
              </ion-router-link>

              <ion-router-link href="/" onClick={() => { this.logout(); this.closeMenu(); }}>
                Log Out
              </ion-router-link>

            </div>

            : null
          }

          
        </ion-content>
    ]
  }
}
