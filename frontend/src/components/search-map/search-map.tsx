import { Component, h, Element, Build, Method, Prop, Event, EventEmitter } from '@stencil/core';
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

  @Event() mapLoaded!: EventEmitter<void>;

  @Prop() autoInit: boolean = false;


  private mapId: string = `map-instance-${generateId(8)}`;

  private map: any = null;
  private mapRendered: boolean = false;
  private mapInitialized: boolean = false;

  @Method('init')
  async init() {
    if (!this.mapInitialized) {
      this.mapInitialized = true;
      this.initializeMap();
    }
  }

  @Method('addNeighborhood')
  async addNeighborhood(slug, coords) {
    if (!this.mapRendered) {
      return;
    }

    // make sure there's only one instance of each neighborhood
    // at a given time
    await this.removeNeighborhood(slug);

    this.map.addLayer({
      'id': `${slug}-outline`,
      'type': 'line',
        'source': {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'geometry': {
              'type': 'Polygon',
              'coordinates': coords
            }
          }
        },
        'layout': {},
        'paint': {
          'line-color': '#000',
          'line-opacity': 0.8,
          'line-width': 4
        }
      });

      this.map.addLayer({
        'id': `${slug}-fill`,
        'type': 'fill',
          'source': {
            'type': 'geojson',
            'data': {
              'type': 'Feature',
              'geometry': {
                'type': 'Polygon',
                'coordinates': coords
              }
            }
          },
          'layout': {},
          'paint': {
            'fill-color': '#000',
            'fill-opacity': 0.3,
          }
        });
  }

  @Method('removeNeighborhood')
  async removeNeighborhood(slug) {
    // remove fill layer
    if (this.map.getLayer(`${slug}-fill`)) {
      this.map.removeLayer(`${slug}-fill`);
    }

    // remove outline layer
    if (this.map.getLayer(`${slug}-outline`)) {
      this.map.removeLayer(`${slug}-outline`);
    }
  }

  componentDidRender() {
    if (Build.isBrowser && !this.mapRendered && this.autoInit) {
      console.log('auto-initing');
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
          center: [-73.995290, 40.722412],
          zoom: 15
        });

        this.map.on('load', () => {
          this.mapRendered = true;

          this.mapLoaded.emit();
        });

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
