import { Component, h} from '@stencil/core';

@Component({
  tag: 'app-menu',
  styleUrl: 'app-menu.scss'
})
export class AppMenu {
  closeMenu() {
    const modal = document.querySelector('ion-modal');

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

            <ion-router-link href="/">
              Bookings
            </ion-router-link>

            <ion-router-link href="/">
              List with us
            </ion-router-link>

            <ion-router-link href="/">
              Referrals
            </ion-router-link>

            <ion-router-link href="/">
              Brokers
            </ion-router-link>

            <ion-router-link href="/">
              Corporate
            </ion-router-link>

            <ion-router-link href="/">
              About APT212
            </ion-router-link>

            <ion-router-link href="/">
              FAQ
            </ion-router-link>

            <ion-button aria-label="Speak to an expert" href="/">
              <ion-icon name="call" slot="start" />
              Speak to an expert
            </ion-button>
          </div>
        </ion-content>
    ]
  }
}
