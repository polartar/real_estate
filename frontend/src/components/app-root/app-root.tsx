import "@stencil/redux";
import { Component, h, Prop, Listen, Build, Element } from '@stencil/core';
import { Store, Action } from "@stencil/redux";
import { updateScreenSize } from "../../store/actions/screensize";
import { getTaxonomy } from '../../store/actions/taxonomy';
import { configureStore } from "../../store/index";
import { loadState } from "../../services/storage";
import { APIService } from "../../services/api/api.service";
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
            <ion-route url="/profile/:name" component="app-profile" />

            <ion-route url="/login" component="page-login" />
            <ion-route url="/admin" component="page-admin" />
            <ion-route url="/admin/listings" component="page-admin-listings" />

            <ion-route url=":any" component="page-404" />
          </ion-router>

          <ion-nav />
      </ion-app>,

      <component-prefetch />
    ];
  }
}
