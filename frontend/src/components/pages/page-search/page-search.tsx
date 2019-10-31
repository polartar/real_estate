import { Component, h, Prop, Element, State, Watch } from '@stencil/core';
import { Store } from "@stencil/redux";
import searchFilterSelectors from '../../../store/selectors/search-filters';
import neighborhoodSelectors from '../../../store/selectors/neighborhoods';

@Component({
  tag: 'page-search',
  styleUrl: 'page-search.scss'
})
export class PageSearch {
  @Prop({ context: "store" }) store: Store;
  @Prop() size: string = 'phone-only';
  @Prop() neighborhoods: any;
  @Prop() location: any;

  @Element() el: HTMLElement;

  @State() view: string = 'map';

  componentDidLoad() {
    this.store.mapStateToProps(this, state => {

      const {
        screenSize: { size },
      } = state;

      return {
        size,
        neighborhoods: neighborhoodSelectors.getNeighborhoods(state),
        location: searchFilterSelectors.getLocations(state)
      };
    });
  }

  componentDidRender() {
      const map: any = this.el.querySelector('search-map');
      map.init();
  }

  @Watch('view')
  viewChanged(newVal, oldVal) {
    if (oldVal !== newVal && newVal === 'map') {
      // if the map re-renders while not in the map-view the size is off
      // by triggering a window resize event it fixes itself
      setTimeout(() => {
        const event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, false);

        window.dispatchEvent(event);
      }, 50);
    }
  }

  getViewClass() {
    let viewClass: any = { 'page-search': true };

    viewClass[this.view] = true;

    return viewClass;
  }

  mapLoaded() {
    // map loaded
  }

  getMap() {
    const map: any = this.el.querySelector('search-map');
    return map;
  }

  render() {

    let results = [];
    for (let i = 0; i < 40; i++) {
      results.push(<div class="card-wrapper"><listing-card contentPadding/></div>);
    }

    return [
      <app-header hide-search-button />,
      <ion-content class={this.getViewClass()}>

        <section class="section main">
          <div class="search-wrapper">
            <div class="search-results">
              <div class="view-filters">
                <button aria-label="Map View" class={{ 'view-nav': true, 'active': this.view === 'map'}} onClick={() => { this.view = 'map' }}>
                  <svg width="22px" height="17px" viewBox="0 0 22 17" version="1.1">
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <path d="M6.44693757,1.03946443 C6.7521634,0.92314383 7,1.07269915 7,1.3732543 L7,13.3434138 C7,13.6446884 6.75375471,13.9820849 6.44693757,14.099125 L1.55385803,15.9601514 C1.24783655,16.0771933 1,15.9276399 1,15.6263612 L1,3.65694337 C1,3.35566874 1.24624523,3.01827223 1.55385803,2.90123215 L6.44693757,1.03946443 Z M20.4461419,1.03984861 C20.7521634,0.922806667 21,1.07236016 21,1.37363852 L21,13.3430576 C21,13.6443323 20.7537547,13.9817289 20.4461419,14.0987689 L15.5530624,15.9605356 C15.2478366,16.0768562 15,15.9273008 15,15.6267451 L15,3.65658431 C15,3.35530965 15.2462453,3.0179131 15.5530624,2.90087301 L20.4461419,1.03984861 Z M8.55378464,1.03984861 C8.24780374,0.922806667 8,1.07236016 8,1.37363852 L8,13.3430576 C8,13.6443323 8.24621264,13.9817289 8.55378464,14.0987689 L13.4462154,15.9605356 C13.7521963,16.0768562 14,15.9273008 14,15.6267451 L14,3.65658431 C14,3.35530965 13.7537874,3.0179131 13.4462154,2.90087301 L8.55378464,1.03984861 Z" id="Fill-1" fill="#000000"></path>
                      </g>
                  </svg>
                </button>

                <button aria-label="Grid View" class={{ 'view-nav': true, 'active': this.view === 'grid'}} onClick={() => { this.view = 'grid' }}>
                  <svg width="18px" height="17px" viewBox="0 0 18 17" version="1.1">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g transform="translate(1.000000, 0.000000)" fill="#000000">
                            <polygon points="0 3.55555556 3.55555556 3.55555556 3.55555556 0 0 0"></polygon>
                            <polygon points="6.22266667 3.55555556 9.77822222 3.55555556 9.77822222 0 6.22266667 0"></polygon>
                            <polygon points="12.4444444 3.55555556 16 3.55555556 16 0 12.4444444 0"></polygon>
                            <polygon points="0 16 3.55555556 16 3.55555556 12.4444444 0 12.4444444"></polygon>
                            <polygon points="6.22222222 16 9.77777778 16 9.77777778 12.4444444 6.22222222 12.4444444"></polygon>
                            <polygon points="12.4444444 16 16 16 16 12.4444444 12.4444444 12.4444444"></polygon>
                            <polygon points="12.4444444 9.77777778 16 9.77777778 16 6.22222222 12.4444444 6.22222222"></polygon>
                            <polygon points="6.22222222 9.77777778 9.77777778 9.77777778 9.77777778 6.22222222 6.22222222 6.22222222"></polygon>
                            <polygon points="0 9.77777778 3.55555556 9.77777778 3.55555556 6.22222222 0 6.22222222"></polygon>
                        </g>
                    </g>
                  </svg>
                </button>

                <button aria-label="List View" class={{ 'view-nav': true, 'active': this.view === 'list'}} onClick={() => { this.view = 'list' }}>
                  <svg version="1.1" x="0px" y="0px" viewBox="0 0 60.123 60.123">
                    <g>
                      <path d="M57.124,51.893H16.92c-1.657,0-3-1.343-3-3s1.343-3,3-3h40.203c1.657,0,3,1.343,3,3S58.781,51.893,57.124,51.893z"/>
                      <path d="M57.124,33.062H16.92c-1.657,0-3-1.343-3-3s1.343-3,3-3h40.203c1.657,0,3,1.343,3,3
                        C60.124,31.719,58.781,33.062,57.124,33.062z"/>
                      <path d="M57.124,14.231H16.92c-1.657,0-3-1.343-3-3s1.343-3,3-3h40.203c1.657,0,3,1.343,3,3S58.781,14.231,57.124,14.231z"/>
                      <circle cx="4.029" cy="11.463" r="4.029"/>
                      <circle cx="4.029" cy="30.062" r="4.029"/>
                      <circle cx="4.029" cy="48.661" r="4.029"/>
                    </g>
                  </svg>
                </button>

                <label htmlFor="search-filter-sort">Sort by</label>
                <select id="search-filter-sort">
                  <option>Soonest Available</option>
                  <option>Price - Low to High</option>
                  <option>Price - High to Low</option>
                  <option>Size - Small to Big</option>
                  <option>Size - Big to Small</option>
                </select>

                <div class="results-count">50 Results</div>

              </div>
              <div class="results-grid">
                {results}
              </div>
              <div class="results-list">
                <listing-table />
              </div>
            </div>
            <div class="search-map">
              <div class="map-wrapper" >
                <search-map onMapLoaded={() => { this.mapLoaded() }}/>
              </div>

            </div>
          </div>
        </section>
      </ion-content>
    ];
  }
}
