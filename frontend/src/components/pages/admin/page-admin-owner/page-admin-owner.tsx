import { Component, h, Prop, State } from '@stencil/core';
import { Store } from '@stencil/redux';
import authSelectors from '../../../../store/selectors/auth';
import { RouterService } from '../../../../services/router.service';

@Component({
  tag: 'page-admin-owner',
  styleUrl: 'page-admin-owner.scss'
})
export class PageAdminOwner {
  @Prop({ context: "store" }) store: Store;

  @State() isLoggedIn: boolean = false;
  @State() isAdmin: boolean = false;

  async componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        isLoggedIn: authSelectors.isLoggedIn(state),
        isAdmin: authSelectors.isAdmin(state)
      }
    });

    if (!this.isLoggedIn) {
      RouterService.forward('/login');
    }
    else {
      // we're logged in, but as admin?
      if (!this.isAdmin) {
        RouterService.forward('/');
      }
    }
  }

  render() {
    return [
      <admin-header />,
      <ion-content class="page-admin-owner">
        <section class="section">

        <owner-global-form />

        </section>
      </ion-content>
    ]
  }
}
