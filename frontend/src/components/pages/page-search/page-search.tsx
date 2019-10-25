import { Component, h, Prop, Build, Element, Watch } from '@stencil/core';
import { Store } from "@stencil/redux";
import { ScriptLoaderService } from '../../../services/script-loader.service';
import { EnvironmentConfigService } from '../../../services/environment/environment-config.service';

declare var mapboxgl: any;

@Component({
  tag: 'page-search',
  styleUrl: 'page-search.scss'
})
export class PageSearch {
  @Prop({ context: "store" }) store: Store;
  // @State() size: string = 'phone-only';
  @Prop() size: string = 'phone-only';
  // @State() height: number;
  @Prop() height: number;
  // @State() isMobile: boolean = true;
  @Prop() isMobile: boolean = true;
  // @State() headerHeight: number | null = null;
  @Prop() headerHeight: number | null = null;
  @Element() el: HTMLElement;

  map: any;
  mapRendered: boolean = false;

  headerHeightInterval: any = null;

  componentDidLoad() {
    this.store.mapStateToProps(this, state => {

      const {
        screenSize: { size, isMobile, height, headerHeight },
      } = state;

      return {
        size,
        height,
        headerHeight,
        isMobile,
      };
    });
  }

  @Watch('height')
  heightChanged(newValue, oldValue) {
    console.log('height changed', newValue, oldValue);
  }

  @Watch('size')
  sizeChanged(newValue, oldValue) {
    console.log('sizechanged', newValue, oldValue);
  }

  componentDidRender() {
    if (this.canRenderMap() && !this.mapRendered) {
      const container: any = this.el.querySelector("#page-search-map-instance");
      console.log(this.height, this.headerHeight);
      let newHeight = `${this.height - this.headerHeight}px`;
      console.log(newHeight);
      container.style.height = newHeight;

      this.initializeMap();
    }
  }

  initializeMap() {
    if (!this.canRenderMap()) {
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
          container: 'page-search-map-instance',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [-74.0392706, 40.7591704],
          zoom: 12
        });

        this.mapRendered = true;
      });
  }

  canRenderMap() {
    return !!Build.isBrowser;
  }

  render() {

    let mapHeight = 300;
    if (this.headerHeight) {
      mapHeight = this.height - this.headerHeight;
    }

    let results =[];
    for (let i = 0; i < 10; i++) {
      results.push(<div class="card-wrapper"><listing-card contentPadding/></div>);
    }

    return [
      <ion-content class="page-search">
        <app-header hide-search-button />

        <section class="section main">
          <div class="search-wrapper">
            <div class="search-results">
              {results}
            </div>
            <div class="search-map">
              { this.canRenderMap() ?
              <div id="page-search-map-instance" class="map-wrapper" style={{ height: `${mapHeight}px`, top: `${this.headerHeight}px`}}></div>
              : null }

            </div>
          </div>
        </section>
      </ion-content>
    ];
  }
}
