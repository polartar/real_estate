import "@stencil/redux";
import { Component, h, Prop, Listen, Build, Element, State } from '@stencil/core';
import { Store, Action } from "@stencil/redux";
import { updateScreenSize } from "../../store/actions/screensize";
import { getTaxonomy } from '../../store/actions/taxonomy';
import { configureStore } from "../../store/index";
import { loadState } from "../../services/storage";
import { APIService } from "../../services/api/api.service";
import AuthSelectors from '../../store/selectors/auth';
import { EnvironmentConfigService } from '../../services/environment/environment-config.service';
import { PrefetchComponentService } from '../../services/prefetch-components.service';
import Debounce from 'debounce-decorator';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {
  @Prop({ context: "store" }) store: Store;
  @Element() el: HTMLElement;

  @State() isAdmin: boolean = false;

  loadAuth: Action;
  updateScreenSize: Action;
  getTaxonomy: Action;
  baseUrl: string = EnvironmentConfigService.getInstance().get('BASE_URL');

  @Listen('resize', { target: 'window' })
  @Debounce(250)
  handleResize() {
    requestAnimationFrame(() => {
      this.updateScreenSize(window.innerWidth, window.innerHeight);
    });
  }

  componentWillLoad() {
    const persistedState = loadState();

    if (persistedState && persistedState.auth && persistedState.auth.access_token) {
      APIService.setAccessToken(persistedState.auth.access_token);
    }

    this.store.setStore(configureStore(persistedState));

    this.store.mapStateToProps(this, state => {
      return {
        isAdmin: AuthSelectors.isAdmin(state)
      }
    });

    this.store.mapDispatchToProps(this, {
      updateScreenSize,
      getTaxonomy
    });

    if (Build.isBrowser) {
      this.getTaxonomy();
    }

    // note - this might already exist due to pre-rendering
    let rel = document.querySelector('link[rel="canonical"]');
    if (rel) {
      rel.setAttribute('href', this.baseUrl);
    }
    else {
      rel = document.createElement('link');
      rel.setAttribute('rel', 'canonical');
      rel.setAttribute('href', this.baseUrl);
      document.querySelector('head').appendChild(rel);
    }

    this.updateScreenSize(window.innerWidth, window.innerHeight);
  }

  componentDidLoad() {

    if (Build.isBrowser) {
      // prefetch code for componetns
      const prefetch = this.el.querySelector('component-prefetch');
      prefetch.setDelay(1500).then(() => {
        prefetch.setComponents(PrefetchComponentService.getConfig());
      });
    }
  }

  render() {
    return [
      <ion-app>
          <ion-router useHash={false}>
            <ion-route url="/" component="page-home" />
            <ion-route url="/search" component="page-search" />
            <ion-route url="/listing/:apartmentId" component="page-listing" />
            <ion-route url="/wishlist" component="page-wishlist" />
            <ion-route url="/neighborhoods" component="page-neighborhoods" />
            <ion-route url="/neighborhood/:neighborhoodName" component="page-neighborhood" />
            <ion-route url="/faq" component="page-faq" />
            <ion-route url="/booking" component="page-booking" />
            <ion-route url="/privacy" component="page-privacy" />

            <ion-route url="/private-rooms" component="page-private-rooms" />
            <ion-route url="/corporate-rooms" component="page-corporate-rooms" />
            <ion-route url="/about" component="page-about" />
            <ion-route url="/referral" component="page-referral" />

            <ion-route url="/login" component="page-login" />

            <ion-route url="/admin" component={ this.isAdmin ? 'page-admin' : 'page-login' } />
            <ion-route url="/admin/listings" component={ this.isAdmin ? 'page-admin-listings' : 'page-login' } />
            <ion-route url="/admin/listing/add" component={ this.isAdmin ? 'page-admin-listing-add' : 'page-login' } />
            <ion-route url="/admin/listing/edit/:apartmentId" component={ this.isAdmin ? 'page-admin-listing-edit' : 'page-login' } />
            <ion-route url="/admin/owner-global" component={ this.isAdmin ? 'page-admin-owner' : 'page-login' } />
            <ion-route url="/admin/referrals" component={ this.isAdmin ? 'page-admin-referrals' : 'page-login' } />
            <ion-route url="/admin/agents" component={ this.isAdmin ? 'page-admin-agents' : 'page-login' } />
            <ion-route url="/admin/agent/:agentId" component={ this.isAdmin ? 'page-admin-agent-edit' : 'page-login' } />
            <ion-route url="/admin/agent/" component={ this.isAdmin ? 'page-admin-agent-edit' : 'page-login' } />

            <ion-route url=":any" component="page-404" />
          </ion-router>

          <ion-nav />
      </ion-app>,

      <component-prefetch />
    ];
  }
}
