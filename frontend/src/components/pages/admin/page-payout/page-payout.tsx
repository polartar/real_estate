import { Component, h, State, Prop } from '@stencil/core';
import { Store } from '@stencil/redux';

@Component({
  tag: 'page-payout',
  styleUrl: 'page-payout.scss',
})

export class PagePayout {
  @Prop({ context: 'store' }) store: Store;

  @State() isLoggedIn: boolean = false;

  render() {
    return (
      <div class='page-payout'>
        <referral-header />

        <div class='page-payout-content'>
          <p class='title'>
            Please choose your preferred payout method below to recieve your referral Pay Out
          </p>

          <section class='section hero'>
            <div class='left-body'>
              <div class='form'>
                <payout-check-form />
              </div>
            </div>

            <div class='right-body'>
              <div class='form'>
                <payout-wire-form />
              </div>
            </div>

          </section>
        </div>
      </div>
    );
  }
}
