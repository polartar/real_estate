import { Component, h, Element, Build, Method, Prop, Event, EventEmitter, Watch, State } from '@stencil/core';
import { Store, Action } from "@stencil/redux";
import { ScriptLoaderService } from '../../services/script-loader.service';
import { EnvironmentConfigService } from '../../services/environment/environment-config.service';
import { generateId } from '../../helpers/utils';
import { searchFilterSelectors, searchSelectors } from '../../store/selectors/search';
import { getMapMarkers } from '../../store/actions/search';
import taxonomySelectors from '../../store/selectors/taxonomy';
import Debounce from 'debounce-decorator';
import screensizeSelectors from '../../store/selectors/screensize';

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

  getMapMarkers: Action;

  neighborhoods: any = [];
  listings: any = {};
  detail: any = null;

  @Prop() location: any = [];
  @Prop() listingHover: number | boolean = false;
  @Prop() searchFilters: any = [];
  @Prop() mapMarkers: any[] = [];
  @State() isMobile: boolean = false;

  markers: any = [];
  @Prop() loading: boolean = false;

  private mapId: string = `map-instance-${generateId(8)}`;

  private map: any = null;
  private mapRendered: boolean = false;
  private mapInitialized: boolean = false;
  private neighborhoodLayerMap: any = {};

  private lastMarkerSearchParams: string = '';
  private lastLocationIds: string = '';

  // map constants
  private mapInitialCenter: number[] = [-73.9830029, 40.7825883];
  private mapInitialZoom: number = 11;
  private mapInitialMobileZoom: number = 10.3;
  private mapZoomMax: number = 17;
  private mapZoomMin: number = 11;

  componentDidLoad() {
    this.store.mapStateToProps(this, state => {

      return {
        neighborhoods: taxonomySelectors.getNeighborhoods(state),
        location: searchFilterSelectors.getLocations(state),
        loading: searchSelectors.getMapMarkersLoading(state),
        listingHover: searchSelectors.getSearchListingHover(state),
        searchFilters: searchFilterSelectors.getAllFilters(state),
        mapMarkers: searchSelectors.getMapMarkers(state),
        isMobile: screensizeSelectors.getIsMobile(state)
      };
    });

    this.store.mapDispatchToProps(this, {
      getMapMarkers
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

    if (!this.map) {
      return;
    }

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
  async showDetails(markerId) {
    if (!this.map) {
      return;
    }

    const marker = this.mapMarkers.find(m => m.id === parseInt(markerId));
    if (!marker) {
      return;
    }

    // remove any existing details
    this.closeDetails();

    // zoom in if this isn't zoom level 5
    const zoom = this.getZoomStep(this.map.getZoom());
    if (marker.apartments_count > 1 && zoom < 5) {
      const zoomTo = this.getMapZoomByStep(zoom + 1);

      this.map.easeTo({
        center: [marker.lng, marker.lat],
        zoom: zoomTo
      });

      return;
    }

    const details = new mapboxgl.Popup({
      closeOnClick: false,
      closeButton: false,
      className: 'map-listing-details',
      anchor: 'top',
      maxWidth: 'none',
      offset: [-50, 30]
    })
      .setLngLat([marker.lng, marker.lat])
      .setHTML(`<map-listing-details marker-id="${marker.id}" />`)
      .addTo(this.map);

    this.detail = details;
  }

  @Watch('location')
  locationChanged(newVal, oldVal) {
    if (!this.map) {
      return;
    }

    const locationIds = JSON.stringify(this.location.map(l => l.id));
    if (locationIds === this.lastLocationIds) {
      return;
    }

    this.lastLocationIds = locationIds;

    const removeLocations = oldVal.filter(id => !newVal.includes(id));
    const addLocations = newVal.filter(id => !oldVal.includes(id));

    // remove locations first
    removeLocations.forEach(id => {
      const neighborhood = taxonomySelectors.getNeighborhoodById(id, this.neighborhoods);

      if (neighborhood) {
        this.removeNeighborhood(neighborhood.slug);
      }
    });

    // add locations
    addLocations.forEach(id => {
      const neighborhood = taxonomySelectors.getNeighborhoodById(id, this.neighborhoods);

      if (neighborhood && neighborhood.perimeter_coordinates) {
        this.addNeighborhood(neighborhood.slug, neighborhood.perimeter_coordinates);
      }
    });

    // zoom to locations
    let boundsBoxSet = false;
    let boundsBox = [[null, null], [null, null]];

    this.location.forEach(l => {
      let neighborhood = taxonomySelectors.getNeighborhoodById(l, this.neighborhoods);

      if (neighborhood.perimeter_coordinates.length) {
        neighborhood.perimeter_coordinates[0].forEach(c => {
          boundsBox[0][0] = boundsBox[0][0] === null ? c[0] : Math.min(boundsBox[0][0], c[0]);
          boundsBox[0][1] = boundsBox[0][1] === null ? c[1] : Math.min(boundsBox[0][1], c[1]);
          boundsBox[1][0] = boundsBox[1][0] === null ? c[0] : Math.max(boundsBox[1][0], c[0]);
          boundsBox[1][1] = boundsBox[1][1] === null ? c[1] : Math.max(boundsBox[1][1], c[1]);
        });

        boundsBoxSet = true;
      }
    });

    if (boundsBoxSet) {
      this.map.fitBounds(boundsBox, {
        maxZoom: 15,
        linear: true,
        padding: 40
      });
    }
    else {
      // location has been unset, so zoom out?
      this.map.easeTo({
        center: this.mapInitialCenter,
        zoom: this.isMobile ? this.mapInitialMobileZoom : this.mapInitialZoom
      });
    }
  }

  @Watch('mapMarkers')
  placeMarkers(results, oldResults) {
    if (!this.map) {
      return;
    }

    // this sometimes gets triggered with no changes, ensure only changes re-render
    if (JSON.stringify(results) === JSON.stringify(oldResults)) {
      return;
    }

    this.removeAllMarkers(true);

    // let boundsBoxSet = false;
    let boundsBox = [[null, null], [null, null]];

    let markers = [];

    results.forEach(r => {

      const className = `map-listing-marker marker-instance-${r.id}`;

      markers.push(
        new mapboxgl.Popup({
          closeOnClick: false,
          closeButton: false,
          anchor: 'center',
          className: className,
          maxWidth: 'none'
        })
          .setLngLat([r.lng, r.lat])
          .setHTML(`<map-listing-marker marker-id="${r.id}" />`)
      );

      boundsBox[0][0] = boundsBox[0][0] === null ? r.lng : Math.min(boundsBox[0][0], r.lng);
      boundsBox[0][1] = boundsBox[0][1] === null ? r.lat : Math.min(boundsBox[0][1], r.lat);
      boundsBox[1][0] = boundsBox[1][0] === null ? r.lng : Math.max(boundsBox[1][0], r.lng);
      boundsBox[1][1] = boundsBox[1][1] === null ? r.lat : Math.max(boundsBox[1][1], r.lat);

      // boundsBoxSet = true;
    });

    // zoom/pan to fit results in the map
    // if (this.map && boundsBoxSet && resize) {
    //   this.map.fitBounds(boundsBox, {
    //     maxZoom: 15,
    //     linear: true,
    //     padding: 40
    //   });
    // }

    markers.forEach(m => m.addTo(this.map));

    this.markers = markers;
  }


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

  @Watch('listingHover')
  highlightMarker(newVal, oldVal) {
    if (newVal === oldVal) {
      return;
    }

    this.closeDetails();

    const highlight = val => {
      const marker: any = this.el.querySelector(`.marker-instance-${val}`);
      if (marker) {
        marker.classList.add('hover');
      }
    };

    const unhighlight = val => {
      const marker: any = this.el.querySelector(`.marker-instance-${val}`);
      if (marker) {
        marker.classList.remove('hover');
      }
    }

    if (newVal !== false) {
      // highlight the new one
      newVal.forEach(v => highlight(v));
    }

    if (newVal === false && oldVal !== false) {
      oldVal.forEach(v => unhighlight(v));
    }
  }

  closeDetails() {
    if (this.detail) {
      this.detail.remove();
      this.detail = null;
    }
  }

  @Debounce(200)
  getMarkers() {
    if (this.map) {
      const params = {
        filters: this.searchFilters,
        bounds: this.map.getBounds(),
        zoom: this.getZoomStep(this.map.getZoom()),
      };

      const currentMarkerSearchParams = JSON.stringify(params);

      if (currentMarkerSearchParams === this.lastMarkerSearchParams) {
        // prevent duplicate calls
        return;
      }

      this.lastMarkerSearchParams = currentMarkerSearchParams;

      this.getMapMarkers(params);
    }
  }

  /**
   * Takes the current map zoom and converts it into a 1-5 scale
   * used for marker queries.
   * 1 zoomed out
   * 5 all the way zoomed in
   *
   * @param zoom float
   */
  getZoomStep(zoom) {
    const interval = (this.mapZoomMax - this.mapZoomMin) / 4;

    let level = this.mapZoomMin;
    let step = 1;
    while (zoom > level) {
      step++;
      level += interval;
    }

    return step;
  }

  /**
   * Gets the map zooom level that corresponds with search zoom step
   *
   * @param step int 1-5
   */
  getMapZoomByStep(step) {
    const interval = (this.mapZoomMax - this.mapZoomMin) / 4;

    return this.mapZoomMin + (interval * (step - 1));
  }

  onMapClick() {
    // remove any existing details
    this.closeDetails();
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
          center: this.mapInitialCenter,
          zoom: this.isMobile ? this.mapInitialMobileZoom : this.mapInitialZoom,
          minZoom: 10,
          maxZoom: 17,
          // maxBounds: [
          //   [-74.076242, 40.657445],
          //   [-73.815763, 40.907992]
          // ]
        });

        this.map.addControl(new mapboxgl.NavigationControl());

        this.map.on('load', () => {
          this.mapRendered = true;

          this.map.on('click', () => this.onMapClick());

          this.map.on('moveend', () => this.getMarkers());

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
