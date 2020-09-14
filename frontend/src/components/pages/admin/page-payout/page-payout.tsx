import { Component, h, State, Prop } from '@stencil/core';
import { Store } from '@stencil/redux';
import authSelectors from '../../../../store/selectors/auth';
import { RouterService } from '../../../../services/router.service';

@Component({
  tag: 'page-payout',
  styleUrl: 'page-payout.scss',
})

export class PagePayout {
  @Prop({ context: 'store' }) store: Store;

  @State() isAdmin: boolean = false;
  @State() isLoggedIn: boolean = false;

  componentWillLoad() {
    this.store.mapStateToProps(this, (state) => {
      return {
        isLoggedIn: authSelectors.isLoggedIn(state),
        isAdmin: authSelectors.isAdmin(state),
      };
    });

    if (!this.isLoggedIn) {
      RouterService.forward('/login');
    } else {
      // we're logged in, but as admin?
      if (!this.isAdmin) {
        RouterService.forward('/');
      }
    }
  }

  render() {
    return (
      <div class='page-payout'>
        <referral-header />

        <div class='page-payout-content'>
          <p>
            Please choose your preferred payout method below to recieve your referral bonus.
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
