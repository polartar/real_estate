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
  private mapInitialized: boolean = false;

  @Method('init')
  async init() {
    if (!this.mapInitialized) {
      this.mapInitialized = true;
      this.initializeMap();
    }
  }

  @Method('addNeighborhood')
  async addNeighborhood() {
    if (!this.mapRendered) {
      return;
    }

    this.map.addLayer({
      'id': 'maine',
      'type': 'fill',
        'source': {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'geometry': {
              'type': 'Polygon',
              'coordinates': [[[-67.13734351262877, 45.137451890638886],
                [-66.96466, 44.8097],
                [-68.03252, 44.3252],
                [-69.06, 43.98],
                [-70.11617, 43.68405],
                [-70.64573401557249, 43.090083319667144],
                [-70.75102474636725, 43.08003225358635],
                [-70.79761105007827, 43.21973948828747],
                [-70.98176001655037, 43.36789581966826],
                [-70.94416541205806, 43.46633942318431],
                [-71.08482, 45.3052400000002],
                [-70.6600225491012, 45.46022288673396],
                [-70.30495378282376, 45.914794623389355],
                [-70.00014034695016, 46.69317088478567],
                [-69.23708614772835, 47.44777598732787],
                [-68.90478084987546, 47.184794623394396],
                [-68.23430497910454, 47.35462921812177],
                [-67.79035274928509, 47.066248887716995],
                [-67.79141211614706, 45.702585354182816],
                [-67.13734351262877, 45.137451890638886]]]
            }
          }
        },
        'layout': {},
        'paint': {
          'fill-color': '#088',
          'fill-opacity': 0.8
        }
      });
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

        this.map.on('load', () => { console.log('loaded');
          this.mapRendered = true;

          // add fill layer for neighborhood
          this.map.addLayer({
            'id': 'nolita-fill',
            'type': 'fill',
              'source': {
                'type': 'geojson',
                'data': {
                  'type': 'Feature',
                  'geometry': {
                    'type': 'Polygon',
                    'coordinates': [
                      [
                        [-73.994454, 40.71946],
                        [-73.998241, 40.721062],
                        [-73.997200, 40.722184],
                        [-73.996674, 40.723477],
                        [-73.995376, 40.725095],
                        [-73.992608, 40.724144],
                        [-73.994454, 40.71946]
                      ]
                    ]
                  }
                }
              },
              'layout': {},
              'paint': {
                'fill-color': '#000',
                'fill-opacity': 0.3,
              }
            });

            // add outline layer for neighborhood
            this.map.addLayer({
              'id': 'nolita-line',
              'type': 'line',
                'source': {
                  'type': 'geojson',
                  'data': {
                    'type': 'Feature',
                    'geometry': {
                      'type': 'Polygon',
                      'coordinates': [
                        [
                          [-73.994454, 40.71946],
                          [-73.998241, 40.721062],
                          [-73.997200, 40.722184],
                          [-73.996674, 40.723477],
                          [-73.995376, 40.725095],
                          [-73.992608, 40.724144],
                          [-73.994454, 40.71946]
                        ]
                      ]
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
