import { Component, h, Prop, State, Watch } from '@stencil/core';
import { Store, Action } from '@stencil/redux';
import wishlistSelectors from '../../../store/selectors/wishlist';
import { removeFromWishlist } from '../../../store/actions/wishlist';
import { EnvironmentConfigService } from '../../../services/environment/environment-config.service';
import { APIApartmentsService } from '../../../services/api/apartments';

@Component({
  tag: 'page-wishlist',
  styleUrl: 'page-wishlist.scss'
})
export class PageWishlist {
  @Prop({ context: "store" }) store: Store;
  @State() wishlist: any[] = [];
  @State() loaded: boolean = false;

  @State() apartments: any[] = [];

  removeFromWishlist: Action;
  hasLoaded: boolean = false;

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        wishlist: wishlistSelectors.getWishlist(state)
      };
    });

    this.store.mapDispatchToProps(this, {
      removeFromWishlist
    });

    const rel: any = document.querySelector('link[rel="canonical"]');
    if (rel) {
      rel.setAttribute('href', EnvironmentConfigService.getInstance().get('BASE_URL') + '/wishlist');
    }
  }

  async componentDidLoad() {
    await this.syncWishlist();

    this.loaded = true;
  }

  /**
   * clean up the wishlist in case some apartments have been deleted or become inactive since the last time the user visited
   */
  @Watch('wishlist')
  wishlistChanged() {
    if (!this.loaded) {
      return;
    }

    this.syncWishlist();
  }

  async syncWishlist() {
    if (!this.wishlist.length) {
      this.apartments = [];

      return;
    }

    try {
      const apartments = await APIApartmentsService.getApartments(this.wishlist);

      const deleteIds = this.wishlist.filter(v => !apartments.find(a => a.id === v));

        if (deleteIds.length) {
          this.removeFromWishlist(deleteIds);
        }

        this.apartments = apartments;
    }
    catch (e) {
      console.log(e);
    }
  }

  render() {
    return [
      <app-header />,
      <ion-content class="page-wishlist">

        <section class="section">
          <h1 class="title text-center">Wishlist</h1>
          <h2 class="subtitle text-center desktop-only">These are your selected apartments</h2>
          <h2 class="subtitle text-center mobile-only">This is your wishlist</h2>

          {
            !this.loaded ?
            <div class="text-center">
              <ion-spinner name="lines" />
            </div>
            : null
          }

          {
            this.loaded && !this.apartments.length ?
            <div class="empty-state">
              Empty State
            </div>
            : null
          }

          {
            this.loaded && this.apartments.length ?
            <div class="wishlist">
              {
                this.apartments.map(apartment => <wishlist-card item={apartment} />)
              }
            </div>
            : null
          }

        </section>

        <app-footer />
      </ion-content>
    ];
  }
}
