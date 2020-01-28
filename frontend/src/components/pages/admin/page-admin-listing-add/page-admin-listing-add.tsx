import { Component, h, Prop, State } from '@stencil/core';
import { Store } from '@stencil/redux';
import authSelectors from '../../../../store/selectors/auth';
import { RouterService } from '../../../../services/router.service';

@Component({
  tag: 'page-admin-listing-add',
  styleUrl: 'page-admin-listing-add.scss'
})
export class PageAdminListingAdd {
  @Prop({ context: "store" }) store: Store;

  @State() isLoggedIn: boolean = false;
  @State() isAdmin: boolean = false;

  componentWillLoad() {
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

  onFormSuccess(e) {
    RouterService.forward(`/listing/${e.detail.id}`);
  }

  render() {
    return [
      <admin-header />,
      <ion-content class="page-admin-listing-add">
        <section class="section">
          <listing-edit-form onSuccess={e => this.onFormSuccess(e)} />
        </section>
      </ion-content>
    ]
  }
}
