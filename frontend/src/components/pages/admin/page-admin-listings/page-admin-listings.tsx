import { Component, h, Prop, State } from '@stencil/core';
import { Store } from '@stencil/redux';
import authSelectors from '../../../../store/selectors/auth';
import { APIAdminService } from '../../../../services/api/admin';

@Component({
  tag: 'page-admin-listings',
  styleUrl: 'page-admin-listings.scss'
})
export class PageAdminListings {
  @Prop({ context: "store" }) store: Store;
  isLoggedIn: boolean = false;
  @State() loaded: boolean = false;
  @State() listings: any[];

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        isLoggedIn: authSelectors.isLoggedIn(state)
      }
    });

    if (!this.isLoggedIn) {
      const router: any = document.querySelector('ion-router');
      router.push('/login');
    }
  }

  componentDidLoad() {

  }

  render() {
    return [
      <admin-header />,
      <ion-content class="page-admin">

        <h2 class="text-center">Listings</h2>

        <section class="section">

        { this.loaded ?
          <div class="listings">

          </div>
          : <div class="text-center"><ion-spinner name="lines" /></div>
        }
        </section>
      </ion-content>
    ]
  }
}
