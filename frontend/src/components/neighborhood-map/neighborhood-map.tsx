import { Component, h, Prop, Element, Build } from '@stencil/core';
import { Store } from "@stencil/redux";
import taxonomySelectors from '../../store/selectors/taxonomy';
import { ScriptLoaderService } from '../../services/script-loader.service';
import { EnvironmentConfigService } from '../../services/environment/environment-config.service';
import { generateId } from '../../helpers/utils';

declare var mapboxgl: any;

@Component({
  tag: 'neighborhood-map',
  styleUrl: 'neighborhood-map.scss'
})
export class NeighborhoodMap {
  @Prop({ context: "store" }) store: Store;
  @Element() el: HTMLElement;
  @Prop() item!: any;

  private mapId: string = `map-instance-${generateId(8)}`;
  private map: any = null;
  private mapRendered: boolean = false;

  neighborhoods: any = [];

  componentDidLoad() {

    this.store.mapStateToProps(this, state => {

      return {
        neighborhoods: taxonomySelectors.getNeighborhoods(state)
      };
    });
  }

  componentDidRender() {

    if (Build.isBrowser && !this.mapRendered) {
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
          center: this.item.center,
          zoom: 15,
          minZoom: 10,
          maxZoom: 17,
          scrollZoom: false
        });

        this.map.dragPan.disable();
        this.map.touchZoomRotate.disable();

        this.map.addControl(new mapboxgl.NavigationControl());

        this.map.on('load', () => {
          this.mapRendered = true;

          // add neighborhoods

            this.map.addLayer({
              'id': `neighborhood-outline-${this.item.id}`,
              'type': 'line',
                'source': {
                  'type': 'geojson',
                  'data': {
                    'type': 'Feature',
                    'geometry': {
                      'type': 'Polygon',
                      'coordinates': this.item.perimeter_coordinates
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
                'id': `neighborhood-fill-${this.item.id}`,
                'type': 'fill',
                  'source': {
                    'type': 'geojson',
                    'data': {
                      'type': 'Feature',
                      'geometry': {
                        'type': 'Polygon',
                        'coordinates': this.item.perimeter_coordinates
                      }
                    }
                  },
                  'layout': {},
                  'paint': {
                    'fill-color': '#000',
                    'fill-opacity': 0.2,
                  }
                });

        });

      });
  }

  render() {
    return <div class="listing-map-component"><div id={this.mapId} /></div>
  }
}
