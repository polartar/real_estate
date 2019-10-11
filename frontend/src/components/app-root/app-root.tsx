import "@stencil/redux";
import { Component, h, Prop } from '@stencil/core';
import { Store, Action } from "@stencil/redux";
import { configureStore } from "../../store/index";
import { loadState } from "../../services/storage";
import { APIService } from "../../services/api/api.service";

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {
  @Prop({ context: "store" }) store: Store;
  loadAuth: Action;

  componentWillLoad() {
    const persistedState = loadState();

    if (persistedState && persistedState.authReducer && persistedState.authReducer.access_token) {
      APIService.setAccessToken(persistedState.authReducer.access_token);
    }

    this.store.setStore(configureStore(persistedState));
  }

  render() {
    return (
      <ion-app>
          <ion-router useHash={false}>
            <ion-route url="/" component="app-home" />
            <ion-route url="/profile/:name" component="app-profile" />
          </ion-router>
          <ion-nav />
      </ion-app>
    );
  }
}
