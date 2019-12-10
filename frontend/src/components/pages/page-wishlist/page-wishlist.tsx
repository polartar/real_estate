import { Component, h, Prop, State } from '@stencil/core';
import { Store } from '@stencil/redux';
import wishlistSelectors from '../../../store/selectors/wishlist';
import { EnvironmentConfigService } from '../../../services/environment/environment-config.service';

@Component({
  tag: 'page-wishlist',
  styleUrl: 'page-wishlist.scss'
})
export class PageWishlist {
  @Prop({ context: "store" }) store: Store;
  @State() wishlist: any[] = [];
  @State() loaded: boolean = false;

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        wishlist: wishlistSelectors.getWishlist(state)
      };
    });

    const rel: any = document.querySelector('link[rel="canonical"]');
    if (rel) {
      rel.setAttribute('href', EnvironmentConfigService.getInstance().get('BASE_URL') + '/wishlist');
    }
  }

  render() {
    return [
      <app-header />,
      <ion-content class="page-wishlist">

        <section class="section">
          <h1 class="title text-center">Wishlist</h1>
          <h2 class="subtitle text-center">These are your selected apartments</h2>
        </section>

        {
          !this.loaded ?
          <div class="text-center">
            <ion-spinner name="lines" />
          </div>
          : null
        }

        <app-footer />
      </ion-content>
    ];
  }
}
