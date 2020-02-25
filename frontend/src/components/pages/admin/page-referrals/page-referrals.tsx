import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-admin-referrals',
  styleUrl: 'page-admin-referrals.scss'
})
export class PageAdminReferrals {
  render() {
    return [
      <admin-header />,
      <ion-content class="page-admin-referrals">

        <h2 class="text-center">Referrals</h2>

        <section class="section full">
          Referrals
        </section>
      </ion-content>
    ]
  }
}
