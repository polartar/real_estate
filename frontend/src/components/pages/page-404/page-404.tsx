import { Component, h } from '@stencil/core';
import { EnvironmentConfigService } from '../../../services/environment/environment-config.service';

@Component({
  tag: 'page-404',
  styleUrl: 'page-404.scss'
})
export class Page404 {

  componentWillLoad() {
    const rel: any = document.querySelector('link[rel="canonical"]');
    if (rel) {
      rel.setAttribute('href', EnvironmentConfigService.getInstance().get('BASE_URL') + '/404');
    }
  }

  render() {

    return [
      <app-header />,
      <ion-content class="page-404">

        <section class="section">
          <div class="text-center">
            <h1>Not Found</h1>
            <p>The page you navigated to could not be found...</p>
            <ion-button href="/">Return Home</ion-button>
          </div>
        </section>

        <app-footer />
      </ion-content>
    ];
  }
}
