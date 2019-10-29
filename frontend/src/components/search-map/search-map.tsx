import { Component, h, Element, Build, Method, Prop } from '@stencil/core';
import { ScriptLoaderService } from '../../services/script-loader.service';
import { EnvironmentConfigService } from '../../services/environment/environment-config.service';
import { generateId } from '../../helpers/utils';

declare var mapboxgl: any;

@Component({
  tag: 'search-map',
  styleUrl: 'search-map.scss'
})
export class SearchMap {
  @Element() el: HTMLElement;

  @Prop() autoInit: boolean = false;
  private mapId: string = `map-instance-${generateId(8)}`;

  private map: any = null;
  private mapRendered: boolean = false;

  @Method('init')
  async init() {
    if (!this.mapRendered) {
      this.initializeMap();
    }
  }


  componentDidRender() {
    if (Build.isBrowser && !this.mapRendered && this.autoInit) {
      this.initializeMap();
    }
  }

  initializeMap() {
    if (!Build.isBrowser) {
      return;
    }

    if (this.map) {
      this.map.remove();
      this.map = null;
    }

    ScriptLoaderService.loadScript('mapbox', 'https://api.mapbox.com/mapbox-gl-js/v1.4.1/mapbox-gl.js')
      .then(() => {
        mapboxgl.accessToken = EnvironmentConfigService.getInstance().get('MAPBOX_PUBLIC_TOKEN');

        this.map = new mapboxgl.Map({
          container: this.mapId,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [-74.0392706, 40.7591704],
          zoom: 12
        });

        this.mapRendered = true;
      });
  }


  render() {
    return (
      <div class="search-map-component">
        <div id={this.mapId} class="map-instance" />
      </div>
    )
  }
}
