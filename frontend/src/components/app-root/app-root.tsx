import "@stencil/redux";
import { Component, h, Prop } from '@stencil/core';
import { Store, Action } from "@stencil/redux";
import { configureStore } from "../../store/index";
import { loadState } from "../../services/storage";

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {
  @Prop({ context: "store" }) store: Store;
  loadAuth: Action;

  componentWillLoad() {
    const persistedState = loadState();
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
