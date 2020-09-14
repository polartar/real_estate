import { Component, h, Prop } from '@stencil/core';
import { Store, Action } from '@stencil/redux';
import authSelectors from '../../../store/selectors/auth';
import { logout } from '../../../store/actions/auth';

@Component({
  tag: 'referral-menu',
  styleUrl: 'referral-menu.scss',
})

export class ReferralMenu {
  @Prop({ context: 'store' }) store: Store;
  isLoggedIn: boolean = false;
  logout: Action;

  componentWillRender() {
    this.store.mapStateToProps(this, (state) => {
      return {
        isLoggedIn: authSelectors.isLoggedIn(state),
      };
    });

    this.store.mapDispatchToProps(this, {
      logout: logout,
    });
  }

  closeMenu() {
    const modal: any = document.querySelector('apt212-popover.referral-menu');

    if (modal) {
      modal.dismiss();
    }
  }

  render() {
    return [
      <header class='referral-menu-header'>
        <div class='header-inner'>
          <div class='app-header section'>
            <div class='header-center' />

            <ion-button
              aria-label='close'
              class='reset close'
              onClick={() => this.closeMenu()}
            >
              <ion-icon
                src='/assets/images/icons/cancel-white.svg'
                slot='icon-only'
              />
            </ion-button>
          </div>
        </div>
      </header>,

      <ion-content class='app-menu-container app-wrapper' id='ioncontent'>
        {this.isLoggedIn ? (
          <div class=' main-menu'>
            <ion-router-link href='/' onClick={() => this.closeMenu()}>
              Home
            </ion-router-link>

            <ion-router-link
              href='/admin/information'
              onClick={() => this.closeMenu()}
            >
              Gerneral Information
            </ion-router-link>

            <ion-router-link
              href='/admin/payout'
              onClick={() => this.closeMenu()}
            >
              Payout Info
            </ion-router-link>

            <ion-router-link
              href='/addreferral'
              onClick={() => this.closeMenu()}
            >
              Add New Referal
            </ion-router-link>

            <ion-router-link
              href='/admin/terms'
              onClick={() => this.closeMenu()}
            >
              Terms and Conditions
            </ion-router-link>

            <ion-router-link
              href='/'
              onClick={() => {
                this.logout();
                this.closeMenu();
              }}
            >
              Log Out
            </ion-router-link>
          </div>
        ) : null}
      </ion-content>,
    ];
  }
}
