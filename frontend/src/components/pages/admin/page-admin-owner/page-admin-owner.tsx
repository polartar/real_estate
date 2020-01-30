import { Component, h, Prop, State } from '@stencil/core';
import { Store } from '@stencil/redux';
import authSelectors from '../../../../store/selectors/auth';
import { APIAdminService } from '../../../../services/api/admin';
import { RouterService } from '../../../../services/router.service';
import { ToastService } from '../../../../services/toast.service';

@Component({
  tag: 'page-admin-owner',
  styleUrl: 'page-admin-owner.scss'
})
export class PageAdminOwner {
  @Prop({ context: "store" }) store: Store;

  @State() isLoggedIn: boolean = false;
  @State() isAdmin: boolean = false;
  @State() owners: any[] = [];
  @State() loaded: boolean = false;

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

  async componentDidLoad() {
    try {
      const owners = await APIAdminService.getAptOwners();

      this.loaded = true;
      this.owners = owners;
    }
    catch (e) {
      this.loaded = true; // just show the 404
      ToastService.error(e.message);
    }
  }

  render() {
    return [
      <admin-header />,
      <ion-content class="page-admin-owner">
        <section class="section">

          {
            this.loaded && this.owners.length ?
              <owner-global-form owners={this.owners} />
            : null
          }

          {
            !this.loaded ?
              <div class="text-center">
                <ion-spinner name="lines" />
              </div>
            : null
          }

          {
            (this.loaded && !this.owners.length) ?
              <div class="text-center">
                No owners were found to update
              </div>
            : null
          }

        </section>
      </ion-content>
    ]
  }
}
