import { Component, h } from '@stencil/core';


@Component({
  tag: 'admin-header',
  styleUrl: 'admin-header.scss'
})
export class AdminHeader {

  async openMenu(ev) {
    const popover = Object.assign(document.createElement('apt212-popover'), {
      component: 'admin-menu',
      componentProps: {
        inModal: true
      },
      target: ev.currentTarget,
      styleOverride: {
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        transform: 'none'
      },
      bindTo: {
        target: 'none',
        popover: 'none'
      },
    });

    popover.classList.add('admin-menu');

    document.body.appendChild(popover);
  }

  render() {
    return (
      <div class="admin-header-component">
        <div class="admin-header section">
            <ion-router-link href="/" class="logo-link">
              <img src="/assets/images/logo-black.svg" class="logo" alt="APT212 Logo" />
            </ion-router-link>

            <div class="flex-spacer" />

            <ion-button aria-label="Menu" fill="clear" class="menu reset" onClick={e => this.openMenu(e)}>
              <ion-icon aria-label="Menu" src="/assets/images/icons/hamburger.svg" slot="icon-only" />
            </ion-button>
        </div>
      </div>
    )
  }
}
