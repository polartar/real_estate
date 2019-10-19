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
    return (
        <div class="app-menu-container app-wrapper">

          <div class="main-menu">
            <div class="app-menu-header">
              <img src="/assets/images/logo.svg" class="logo" alt="APT212 Logo"></img>

              <div class="spacer" />

              <ion-button class="reset close" onClick={() => this.closeMenu()}>
                <ion-icon name="close" slot="icon-only" />
              </ion-button>
            </div>

            <ion-router-link href="/">
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
        </div>
    )
  }
}
