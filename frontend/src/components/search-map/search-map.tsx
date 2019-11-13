import { Component, h, Element, Build, Method, Prop, Event, EventEmitter, Watch } from '@stencil/core';
import { Store } from "@stencil/redux";
import { ScriptLoaderService } from '../../services/script-loader.service';
import { EnvironmentConfigService } from '../../services/environment/environment-config.service';
import { generateId } from '../../helpers/utils';
import { searchFilterSelectors, searchSelectors } from '../../store/selectors/search';
import neighborhoodSelectors from '../../store/selectors/neighborhoods';
import Debounce from 'debounce-decorator';

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
  listings: any = {};
  detail: any = null;

  @Prop() location: any = [];
  @Prop() searchResults: any = [];

  markers: any = [];
  @Prop() loading: boolean = false;

  private mapId: string = `map-instance-${generateId(8)}`;

  private map: any = null;
  private mapRendered: boolean = false;
  private mapInitialized: boolean = false;
  private neighborhoodLayerMap: any = {};

  private mapZoom: number = 15;

  componentDidLoad() {
    this.store.mapStateToProps(this, state => {

      return {
        neighborhoods: neighborhoodSelectors.getNeighborhoods(state),
        location: searchFilterSelectors.getLocations(state),
        searchResults: searchSelectors.getListings(state),
        loading: searchSelectors.getLoading(state),
      };
    });
  }

  componentDidRender() {
    if (Build.isBrowser && !this.mapRendered && this.autoInit) {
      this.initializeMap();
    }
  }

  @Method('init')
  async init() {
    if (!this.mapInitialized) {
      this.mapInitialized = true;
      this.initializeMap();
    }
  }

  @Method('resize')
  async resize() {
    if (this.mapInitialized && this.map) {
      this.map.resize();
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
          'line-opacity': 0.7,
          'line-width': 2
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
            'fill-opacity': 0.2,
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

  @Method('showDetails')
  async showDetails(ids, lat, lng) {

    // remove any existing details
    this.closeDetails();

    const details = new mapboxgl.Popup({
      closeOnClick: false,
      closeButton: false,
      className: 'map-listing-details',
      anchor: 'top',
      maxWidth: 'none',
      offset: [-50, 30]
    })
      .setLngLat([lng, lat])
      .setHTML(`<map-listing-details ids="${ids}" />`)
      .addTo(this.map);

    this.detail = details;
  }

  @Watch('location')
  locationChanged(newVal, oldVal) {
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

  @Watch('searchResults')
  placeMarkers(results, _oldResults, resize: boolean = true) {
    if (!this.map) {
      return;
    }

    this.removeAllMarkers(true);

    const groupDistance = this.getGroupDistance();

    let boundsBoxSet = false;
    let boundsBox = [[null, null], [null, null]];

    let grouped = [];
    let markers = [];

    results.forEach(r => {
      if (grouped.includes(r.id)) {
        // this has already been added as a multiple
        return;
      }

      let markerIds = [r.id];
      let isGrouped = false;

      // find others that can group with this
      results.filter(p => {
        const isPeer = Math.abs(p.latitude - r.latitude) < groupDistance && Math.abs(p.longitude - r.longitude) < groupDistance && p.id !== r.id && !grouped.includes(p.id);

        if (isPeer) {
          grouped = [...grouped, p.id];
          markerIds = [...markerIds, p.id];
          isGrouped = true;
        }

        return isPeer;
      });

      if (isGrouped) {
        grouped.push(r.id);
      }

      markers.push(
        new mapboxgl.Popup({
          closeOnClick: false,
          closeButton: false,
          anchor: 'center',
          className: 'map-listing-marker',
          maxWidth: 'none'
        })
          .setLngLat([r.longitude, r.latitude])
          .setHTML(`<map-listing-marker ids="[${markerIds.join(',')}]" lat="${r.latitude}" lng="${r.longitude}" />`)
      );

      boundsBox[0][0] = boundsBox[0][0] === null ? r.longitude : Math.min(boundsBox[0][0], r.longitude);
      boundsBox[0][1] = boundsBox[0][1] === null ? r.latitude : Math.min(boundsBox[0][1], r.latitude);
      boundsBox[1][0] = boundsBox[1][0] === null ? r.longitude : Math.max(boundsBox[1][0], r.longitude);
      boundsBox[1][1] = boundsBox[1][1] === null ? r.latitude : Math.max(boundsBox[1][1], r.latitude);

      boundsBoxSet = true;
    });

    // zoom/pan to fit results in the map
    if (this.map && boundsBoxSet && resize) {
      this.map.fitBounds(boundsBox, {
        maxZoom: 15,
        linear: true,
        padding: 40
      });
    }

    markers.forEach(m => m.addTo(this.map));

    this.markers = markers;

    setTimeout(() => {
      this.onMapZoomEnd();
    }, 100);
  }

  /**
   * Determine the distance in lat/lng
   * required whereby listings closer than that are grouped
   */
  getGroupDistance() {
    if (!this.map) {
      return 0;
    }

    let groupDistance = 0;

    const mapZoom = this.map.getZoom();

    if (mapZoom >= 20) {
      groupDistance = 0; // no grouping
    }

    if (mapZoom < 19) {
      groupDistance = 0.00025;
    }

    if (mapZoom < 18) {
      groupDistance = 0.0004;
    }

    if (mapZoom < 17) {
      groupDistance = 0.0005;
    }

    if (mapZoom < 16) {
      groupDistance = 0.0008;
    }

    if (mapZoom < 15) {
      groupDistance = 0.002;
    }

    if (mapZoom < 14) {
      groupDistance = 0.003;
    }

    if (mapZoom < 13) {
      groupDistance = 0.008;
    }

    if (mapZoom < 12) {
      groupDistance = 0.025;
    }

    if (mapZoom < 11) {
      groupDistance = 0.04;
    }

    if (mapZoom < 10) {
      groupDistance = 0.06;
    }

    if (mapZoom < 9) {
      groupDistance = 0.08;
    }

    if (mapZoom < 8) {
      groupDistance = 0.12;
    }

    return groupDistance; // groupDistance;
  }

  @Watch('loading')
  removeAllMarkers(val) {
    if (!val) {
      return;
    }

    // remove any existing details
    if (this.detail) {
      this.detail.remove();
      this.detail = null;
    }

    this.markers.forEach(m => m.remove());

    this.markers = [];
  }

  closeDetails() {
    if (this.detail) {
      this.detail.remove();
      this.detail = null;
    }
  }

  onMapClick() {
    // remove any existing details
    this.closeDetails();
  }

  @Debounce(100)
  onMapZoomEnd() {
    // group overlapping
    if (Math.abs(this.mapZoom - this.map.getZoom()) <= 0.5) {
      return;
    }

    this.mapZoom = this.map.getZoom();

    this.placeMarkers(this.searchResults, null, false);
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
          zoom: this.mapZoom
        });

        this.map.addControl(new mapboxgl.NavigationControl());

        this.map.on('load', () => {
          this.mapRendered = true;

          this.map.on('click', () => this.onMapClick());

          this.map.on('zoomend', () => this.onMapZoomEnd());

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
