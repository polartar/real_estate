import { Component, h } from '@stencil/core';
import { SEOService } from '../../../services/seo.service';
import { EnvironmentConfigService } from '../../../services/environment/environment-config.service';

@Component({
  tag: 'page-404',
  styleUrl: 'page-404.scss'
})
export class Page404 {

  componentWillLoad() {
    //TODO - url generation by router service
    SEOService.setCanonical(EnvironmentConfigService.getInstance().get('BASE_URL') + '/404');
  }

  render() {

    return [
      <ion-content class="page-404">
        <app-header />

        <content-404 />

        <app-footer />
      </ion-content>
    ];
  }
}
