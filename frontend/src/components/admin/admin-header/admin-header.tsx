import { Component, h } from "@stencil/core";

@Component({
  tag: "admin-header",
  styleUrl: "admin-header.scss",
})
export class AdminHeader {
  async openMenu(ev) {
    const popover = Object.assign(document.createElement("apt212-popover"), {
      component: "admin-menu",
      componentProps: {
        inModal: true,
      },
      target: ev.currentTarget,
      styleOverride: {
        width: "100%",
        height: "100%",
        background: "black",
        top: 0,
        left: 0,
        transform: "none",
      },
      bindTo: {
        target: "none",
        popover: "none",
      },
    });

    popover.classList.add("admin-menu");

    document.body.appendChild(popover);
  }

  render() {
    return (
      <div class="admin-header-component">
        <div class="admin-header section">
          <ion-router-link href="/admin" class="logo">
            Referral Dashboard
          </ion-router-link>
          <ion-router-link href="/addreferral">
            <button class="add-button">+ Add New Referal</button>
          </ion-router-link>

          <div class="flex-spacer" />

          <ion-button
            aria-label="Menu"
            fill="clear"
            class="menu reset"
            onClick={(e) => this.openMenu(e)}
          >
            <ion-icon
              aria-label="Menu"
              color="#444444"
              src="/assets/images/icons/hamburger-white.svg"
              slot="icon-only"
            />
          </ion-button>
        </div>
      </div>
    );
  }
}
