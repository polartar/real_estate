import { Component, h, Prop, State } from '@stencil/core';
import { Store } from '@stencil/redux';
import authSelectors from '../../../../store/selectors/auth';
import { APIApartmentsService } from '../../../../services/api/apartments';
import { RouterService } from '../../../../services/router.service';

@Component({
  tag: 'page-admin-listing-edit',
  styleUrl: 'page-admin-listing-edit.scss'
})
export class PageAdminListingEdit {
  @Prop({ context: "store" }) store: Store;
  @Prop() apartmentId!: number;

  @State() isLoggedIn: boolean = false;
  @State() isAdmin: boolean = false;
  @State() item: any;
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

    try {
      const apt = await APIApartmentsService.getApartment(this.apartmentId);

      if (apt && apt.hasOwnProperty('id') && apt.id === this.apartmentId) {
        this.item = apt;
        this.loaded = true;
      }
    }
    catch (e) {
      this.loaded = true; // just show the 404
    }
  }

  render() {
    return [
      <admin-header />,
      <ion-content class="page-admin-listing-edit">
        <section class="section">

          {
            this.loaded && this.item ?
              <listing-edit-form item={this.item} />
            : null
          }

          {
            (!this.loaded || !this.item) ?
              <div class="text-center">
                <ion-spinner name="lines" />
              </div>
            : null
          }

        </section>
      </ion-content>
    ]
  }
}
