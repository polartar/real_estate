import { Component, h, Prop, State, Listen } from '@stencil/core';
import { Store, Action } from "@stencil/redux";
import { EnvironmentConfigService } from '../../../services/environment/environment-config.service';
import { toggleSearchFilterDisplay } from "../../../store/actions/search-filters";
import mapboxgl from 'mapbox-gl';

@Component({
  tag: 'page-search',
  styleUrl: 'page-search.scss'
})
export class PageSearch {
  @Prop({ context: "store" }) store: Store;
  @State() size: string = 'phone-only';
  @State() height: number;
  @State() isMobile: boolean = true;
  @State() displayFilter: boolean;
  @State() headerHeight: number | null = null;

  map: any;

  toggleSearchFilterDisplay: Action;
  headerHeightInterval: any = null;

  componentDidLoad() {
    this.store.mapStateToProps(this, state => {

      const {
        screenSize: { size, isMobile, height, headerHeight },
        searchFilters: { displayFilter }
      } = state;

      return {
        size,
        height,
        headerHeight,
        isMobile,
        displayFilter
      };
    });

    this.store.mapDispatchToProps(this, {
      toggleSearchFilterDisplay
    });
  }

  componentDidRender() {
    if (this.canRenderMap()) {
      this.initializeMap();
    }
  }

  // remove map when exiting
  @Listen('ionRouteDidChange', {
    target: 'document'
  })
  routeChanged(event) {
    if (event.detail.to !== '/search') {
      if (this.map) {
        this.map.remove();
        this.map = null;
      }
    }
  }

  initializeMap() {
    mapboxgl.accessToken = EnvironmentConfigService.getInstance().get('MAPBOX_PUBLIC_TOKEN');

    this.map = new mapboxgl.Map({
      container: 'page-search-map-instance',
      style: 'mapbox://styles/mapbox/streets-v11'
    })
  }

  canRenderMap() {
    return this.headerHeight !== null;
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
        <app-header />

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
