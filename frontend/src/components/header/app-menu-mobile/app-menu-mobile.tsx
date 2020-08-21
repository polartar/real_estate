import { Component, h, Prop, State} from '@stencil/core';
import { Store, Action } from '@stencil/redux';
import authSelectors from '../../../store/selectors/auth';
import { logout } from '../../../store/actions/auth';
import { RouterService } from '../../../services/router.service';

@Component({
  tag: 'app-menu-mobile',
  styleUrl: 'app-menu-mobile.scss'
})
export class AppMenu {
  @Prop({ context: "store" }) store: Store;

  @State() expandPages: boolean = false;
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
    const modal: any = document.querySelector('ion-modal.site-menu');
    const slideover: any = document.querySelector('apt212-slideover.site-menu');

    if (modal) {
      modal.dismiss();
    }

    if (slideover) {
      slideover.dismiss();
    }
  }

  render() {
    return [
        <div class="app-menu-mobile">

          <div class="main-menu">
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

            <div class="separator" />

            <ion-router-link href={ RouterService.getRoute('referral') } onClick={() => this.closeMenu()}>
              Referrals
            </ion-router-link>

            <ion-router-link href="/coming-soon" onClick={() => this.closeMenu()}>
              Agents
            </ion-router-link>

            <ion-router-link href={ RouterService.getRoute('booking') } onClick={() => this.closeMenu()}>
              Booking
            </ion-router-link>

            <ion-router-link href={ RouterService.getRoute('faq') } onClick={() => this.closeMenu()}>
              FAQ
            </ion-router-link>

            <button class="reset expandable" onClick={() => this.expandPages = !this.expandPages }>
              More Pages

              <ion-icon mode="md" name="md-arrow-dropdown" class={{ 'expand-indicator': true, 'expanded': this.expandPages }}></ion-icon>
            </button>
            {
              this.expandPages ?
              <div class="subsection">
                  <ion-router-link href={ RouterService.getRoute('neighborhoods') } onClick={() => this.closeMenu()}>
                    Neighborhoods Guide
                  </ion-router-link>

                  <ion-router-link href={ RouterService.getRoute('private-rooms') } onClick={() => this.closeMenu()}>
                    Private Rooms
                  </ion-router-link>

                  <ion-router-link href={ RouterService.getRoute('brokers') } onClick={() => this.closeMenu()}>
                    Corporate Accounts
                  </ion-router-link>

                  <ion-router-link href={ RouterService.getRoute('blog') } onClick={() => this.closeMenu()}>
                    APT212 Blog
                  </ion-router-link>
              </div>

              : null
            }

            {
              this.isLoggedIn ?
                <ion-router-link href="/" onClick={() => { this.logout(); this.closeMenu(); }}>
                  Log Out
                </ion-router-link>
              : null
            }

          </div>
        </div>
    ]
  }
}
