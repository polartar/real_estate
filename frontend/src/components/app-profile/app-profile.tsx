import { Component, Prop, State, h } from '@stencil/core';
import { Action } from "@stencil/redux";
import { EnvironmentConfigService } from '../../services/environment/environment-config.service';
import { login, logout } from "../../store/actions/auth";
import { Store } from "@stencil/redux";

@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.css'
})
export class AppProfile {

  @State() state = false;
  @State() user: any = {};
  @Prop({ context: "store" }) store: Store;
  @Prop() name: string;
  login: Action;
  private divstyle = { minHeight: '1500px' };

  componentDidLoad() {
    this.store.mapStateToProps(this, state => {
      const {
        auth: { user }
      } = state;

      return {
        user
      };
    });

    this.store.mapDispatchToProps(this, {
      login,
      logout
    });
  }


  formattedName(): string {
    if (this.name) {
      return this.name.substr(0, 1).toUpperCase() + this.name.substr(1).toLowerCase();
    }
    return '';
  }

  async fetchApi() {
    this.login('matt@arckinteractive.com', 'sitka007');
  }

  logout() {
    this.logout();
  }

  getName() {
    if (this.user.hasOwnProperty('name')) {
      return this.user.name;
    }

    return 'Not logged in';
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/" />
          </ion-buttons>
          <ion-title>Profile: {this.name}</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">

        <p>
          The configured API_URL is { EnvironmentConfigService.getInstance().get('API_URL') }
        </p>

        <p>
          Is logged in: Not sure :)
        </p>

        <p>
          Name: {this.getName()}
        </p>

        <ion-item>
          <ion-label>Setting ({this.state.toString()})</ion-label>
          <ion-toggle
            checked={this.state}
            onIonChange={ev => (this.state = ev.detail.checked)}
          />
        </ion-item>
        <ion-button onClick={() => this.fetchApi() }>Log In</ion-button>
        <ion-button onClick={() => this.logout() }>Log Out</ion-button>

        <div style={this.divstyle} >Large div</div>
      </ion-content>
    ];
  }
}
