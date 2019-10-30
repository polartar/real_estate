import { Component, h, Element, Build, Method, Prop, Event, EventEmitter, Watch } from '@stencil/core';
import { Store } from "@stencil/redux";
import { ScriptLoaderService } from '../../services/script-loader.service';
import { EnvironmentConfigService } from '../../services/environment/environment-config.service';
import { generateId } from '../../helpers/utils';
import searchFilterSelectors from '../../store/selectors/search-filters';
import neighborhoodSelectors from '../../store/selectors/neighborhoods';

declare var mapboxgl: any;

@Component({
  tag: 'search-map',
  styleUrl: 'search-map.scss'
})
export class SearchMap {
  @Prop({ context: "store" }) store: Store;
  @Element() el: HTMLElement;

  @Event() mapLoaded!: EventEmitter<void>;

  @Prop() autoInit: boolean = false;

  neighborhoods: any = [];
  @Prop() location: any = [];


  private mapId: string = `map-instance-${generateId(8)}`;

  private map: any = null;
  private mapRendered: boolean = false;
  private mapInitialized: boolean = false;
  private neighborhoodLayerMap: any = {};

  componentDidLoad() {
    this.store.mapStateToProps(this, state => {

      return {
        neighborhoods: neighborhoodSelectors.getNeighborhoods(state),
        location: searchFilterSelectors.getLocations(state)
      };
    });
  }

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

    if (!this.neighborhoodLayerMap[slug]) {
      this.neighborhoodLayerMap[slug] = 1;
    }
    else {
      this.neighborhoodLayerMap[slug]++;
    }

    let fillLayerName = `${slug}-fill-${this.neighborhoodLayerMap[slug]}`;
    let outlineLayerName = `${slug}-outline-${this.neighborhoodLayerMap[slug]}`;

    // make sure there's only one instance of each neighborhood
    // at a given time
    await this.removeNeighborhood(slug);

    this.map.addLayer({
      'id': outlineLayerName,
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
        'id': fillLayerName,
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

    let fillLayerName = `${slug}-fill`;
    let outlineLayerName = `${slug}-outline`;

    if (this.neighborhoodLayerMap[slug]) {
      fillLayerName += `-${this.neighborhoodLayerMap[slug]}`;
      outlineLayerName += `-${this.neighborhoodLayerMap[slug]}`;
    }

    // remove fill layer
    if (this.map.getLayer(fillLayerName)) {
      this.map.removeLayer(fillLayerName);
    }

    // remove outline layer
    if (this.map.getLayer(outlineLayerName)) {
      this.map.removeLayer(outlineLayerName);
    }
  }

  componentDidRender() {
    if (Build.isBrowser && !this.mapRendered && this.autoInit) {
      this.initializeMap();
    }
  }

  @Watch('location')
  locationChanged(newVal, oldVal) {
    console.log('location changed in map', newVal, oldVal);
    const removeLocations = oldVal.filter(id => !newVal.includes(id));
    const addLocations = newVal.filter(id => !oldVal.includes(id));

    // remove locations first
    removeLocations.forEach(id => {
      const neighborhood = neighborhoodSelectors.getNeighborhoodById(id, this.neighborhoods);

      if (neighborhood) {
        this.removeNeighborhood(neighborhood.slug);
      }
    });

    // add locations
    addLocations.forEach(id => {
      const neighborhood = neighborhoodSelectors.getNeighborhoodById(id, this.neighborhoods);

      if (neighborhood && neighborhood.coordinates) {
        this.addNeighborhood(neighborhood.slug, neighborhood.coordinates);
      }
    });
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

        this.map.addControl(new mapboxgl.NavigationControl());

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
