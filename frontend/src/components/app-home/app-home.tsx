import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {
  private divstyle = {minHeight: '1500px'};

  render() {
    return [
      <app-layout-standard>
            <p style={this.divstyle}>
              Welcome to the PWA Toolkit. You can use this starter to build entire
              apps with web components using Stencil and ionic/core! Check out the
              README for everything that comes in this starter out of the box and
              check out our docs on <a href="https://stenciljs.com">stenciljs.com</a> to get started.
            </p>

            <ion-button href="/profile/ionic" expand="block">Profile page</ion-button>
      </app-layout-standard>
    ];
  }
}
