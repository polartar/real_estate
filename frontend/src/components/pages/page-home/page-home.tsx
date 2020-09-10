import { Component, h, Prop, State, Build } from '@stencil/core';
import { Store, Action } from "@stencil/redux";
import { toggleSearchFilterDisplay } from "../../../store/actions/search";
import { searchFilterSelectors } from '../../../store/selectors/search';
import neighborhoodSelectors from '../../../store/selectors/neighborhoods';
import { getNamedSearch } from '../../../store/actions/search';
import taxonomySelectors from '../../../store/selectors/taxonomy';
import { RouterService } from '../../../services/router.service';

@Component({
  tag: 'page-home',
  styleUrl: 'page-home.scss'
})
export class PageHome {
  @Prop({ context: "store" }) store: Store;
  @Prop() prefetching: boolean = false;
  @State() searchLink: string = '';
  @State() size: string = 'phone-only';
  @State() isMobile: boolean = true;
  @State() displayFilter: boolean;
  toggleSearchFilterDisplay: Action;

  @State() luxuryList: any[] = [];
  @State() uniqueList: any[] = [];
  @State() privateRoomList: any[] = [];
  getNamedSearch: Action;

  neighborhoods: any[] = [];
  @State() neighborhoodsLoaded: boolean = false;

  componentWillLoad() {
    if (this.prefetching) {
      return;
    }

    this.store.mapStateToProps(this, state => {

      const {
        screenSize: { size, isMobile },
      } = state;

      return {
        size,
        isMobile,
        displayFilter: searchFilterSelectors.getDisplayFilter(state),
        neighborhoods: taxonomySelectors.getFeaturedNeighborhoods(state),
        neighborhoodsLoaded: neighborhoodSelectors.getNeighborhoodsLoaded(state)
      };
    });

    this.store.mapDispatchToProps(this, {
      toggleSearchFilterDisplay,
      getNamedSearch
    });
  }

  componentDidLoad() {
    if (this.prefetching) {
      return;
    }

    if (Build.isBrowser) {
      this.getNamedSearch('homePageInit', {count: 8})
        .then(result => {
          this.uniqueList = result.uniqueList;
          this.privateRoomList = result.privateRoomList;
          this.luxuryList = result.luxuryList;
        })
        .catch(e => console.log(e));
    }
  }

  async launchMobileFilterMenu() {
    const modal = Object.assign(document.createElement('ion-modal'), {
      component: 'mobile-filter-menu',
      cssClass: 'app-menu'
    });

    document.body.appendChild(modal);
    return modal.present();
  }

  neighborhoodsSlider(num) {
    if (num === 0) {
      return [...this.neighborhoods];
    }

    const splitIndex = Math.round(this.neighborhoods.length / 2);

    if (num === 1) {
      return this.neighborhoods.slice(0, splitIndex);
    }

    return this.neighborhoods.slice(splitIndex + 1);
  }

  setSearchLink(market) {

    if (market == "furnished") {
      this.searchLink = "/search-apartments";
    } else {
      this.searchLink = "/coming-soon";
    }
  }

  render() {
    if (this.prefetching) {
      return null;
    }

    let neighborhoodTitle = 'New York City Neighborhoods';
    let furnishedText = 'Furnished Apartments';
    let salesLink = "/coming-soon";
    let rentalsLink = "/coming-soon";

    if (this.size === 'phone-only') {
      neighborhoodTitle = 'Neighborhoods';
      furnishedText = 'Furnished';
      salesLink = "#";
      rentalsLink = "#";
    }

    return [
      <ion-content class="page-home">
        <app-header-home hide-search-button />
        <section class="home-hero">
          <div class="section">
            <div class="hero">
              <div class="hero-child">
                <h1 class="title">Your Lifestyle<br></br>Your Home<br></br>Your New York City</h1>

                <p class="subtitle">
                    A customized solution for
                    <br></br>all of your  Real Estate needs
                </p>

                <lazy-image src={`/assets/images/home-hero.jpg`} class="markets-feature-image" alt="A customized solution for your real estate needs" />
              </div>

                <div class="hero-child info">
                    <button class="button-reset market-tab" onClick={() =>  this.setSearchLink("furnished") }>{ furnishedText }</button>

                    <button class="button-reset market-tab" onClick={() => window.location.replace( salesLink )}>Rentals</button>

                    <button class="button-reset market-tab" onClick={() => window.location.replace( rentalsLink )}>Sales</button>

                    <div class="home-search-wrapper">
                      <input type="text" class="home-search" onClick={() => window.location.replace( this.searchLink )}/>
                      <button class="button-reset search-icon">
                        <svg class="feather feather-search" viewBox="0 0 25 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path d="M24,21.1886008 L18.6803754,15.9186997 C19.949079,14.3099652 20.6588954,12.3179013 20.6588954,10.238277 C20.6588954,5.14393658 16.472729,1 11.3303363,1 C6.18621089,1 2,5.14393658 2,10.238277 C2,15.3308573 6.18616646,19.4765539 11.3303363,19.4765539 C13.3071236,19.4765539 15.2318387,18.8457674 16.8196842,17.7010588 L22.1704099,23 L24,21.1886008 Z M11.3302919,16.9140717 C7.61273046,16.9140717 4.58934605,13.9182757 4.58934605,10.238365 C4.58934605,6.55849823 7.61268603,3.56265825 11.3302919,3.56265825 C15.0461205,3.56265825 18.0694605,6.55845423 18.0694605,10.238365 C18.0694605,12.2063608 17.1982293,14.0643123 15.6796059,15.3379854 C14.4664401,16.3537734 12.9218251,16.9140717 11.3302919,16.9140717 Z" fill="#f5f5f7"></path></g></svg>
                      </button>
                    </div>
                </div>
            </div>
          </div>
        </section>

        <section class="section no-padding">
          <div class="markets-grid">
            <div class="module">
              <div class="markets-card">
                <lazy-image src={`/assets/images/market-furnished.jpg`} class="markets-feature-image" />

                <div class="markets-description">
                  <h4 class="markets-title">Furnished Apartments</h4>

                  <p>A New York City marketplace for furnished apartments, sublets, and legal short term rentals.</p>

                  <ion-router-link href={ RouterService.getRoute('search') } class="learn-more">
                    Learn More
                    <img src="/assets/images/icons/arrow.svg" alt="" class="arrow-right" />
                  </ion-router-link>
                </div>
              </div>
            </div>

            <div class="module">
              <div class="markets-card">
                <lazy-image src={`/assets/images/market-rentals.jpg`} class="markets-feature-image" />

                <div class="markets-description">
                  <h4 class="markets-title">Rentals</h4>

                  <p>A clear and accurate listings data of New York rental apartments, pulled from 95% of new york city landlords and top brokers. Powered by REBNY IDX.</p>

                  <ion-router-link href={ RouterService.getRoute('coming-soon') } class="learn-more">
                    Learn More
                    <img src="/assets/images/icons/arrow.svg" alt="" class="arrow-right" />
                  </ion-router-link>
                </div>

              </div>
            </div>

            <div class="module">
              <div class="markets-card">
                <lazy-image src={`/assets/images/market-sales.jpg`} class="markets-feature-image" />

                <div class="markets-description">
                  <h4 class="markets-title">Sales</h4>

                  <p>Access to all of New York City Real Estate databases. Powered by a local team of licensed advisers uniquely suited to understand real time proprietary data and trends that are indispensable to navigating the city's dynamic Real Estate landscape.</p>

                  <ion-router-link href={ RouterService.getRoute('coming-soon') } class="learn-more">
                    Learn More
                    <img src="/assets/images/icons/arrow.svg" alt="" class="arrow-right" />
                  </ion-router-link>
                </div>

              </div>
            </div>

            <div class="module">
              <div class="markets-card">
                <lazy-image src={`/assets/images/market-investments.jpg`}  />

                <div class="markets-description">
                  <h4 class="markets-title">Investments</h4>

                  <p>Targeting investment properties that yield high returns. Working with our buyers to reposition and optimize properties to deliver stable, robust returns.</p>

                  <ion-router-link href={ RouterService.getRoute('coming-soon') } class="learn-more">
                    Learn More
                    <img src="/assets/images/icons/arrow.svg" alt="" class="arrow-right" />
                  </ion-router-link>
                </div>

              </div>
            </div>

          </div>
        </section>

        <section class="section">
          <div class="home-about-wrapper">
            <div class="about">
              <div>
                <h2>What is APT212?</h2>

                <p>
                  APT212 is a New York City marketplace for furnished
                  apartments, sublets and short-term rentals.<br /><br />

                  We offer a fresh, simple solution to finding the
                  perfect temporary housing, from private rooms in
                  shared apartments to furnished luxury, high-end
                  rentals.
                </p>

              <ion-button aria-label="Find an Agent" class="static-button last" onClick={() => { RouterService.reload(RouterService.getRoute('coming-soon')) }}>
                Find an Agent

                <img src="/assets/images/icons/arrow-white.svg" alt="" class="arrow-right" />
              </ion-button>

              </div>
            </div>

            <div class="phone">
              <lazy-image src={`/assets/images/phone-home.jpg`} class="markets-feature-image" />
            </div>
          </div>

          <media-logos />

          {
            this.luxuryList.length && this.neighborhoodsLoaded ?
            <div class="predefined-search">
              <h2>Sales</h2>

              {(this.isMobile) ? <listing-slider items={this.luxuryList} /> : <listing-list items={this.luxuryList} />}
            </div>
            : null
          }

          {
            this.uniqueList.length && this.neighborhoodsLoaded?
            <div class="predefined-search">
              <h2>Furnished Apartments</h2>

              {(this.isMobile) ? <listing-slider items={this.uniqueList} /> : <listing-list items={this.uniqueList} />}
            </div>
            : null
          }

          {
            this.privateRoomList.length && this.neighborhoodsLoaded ?
            <div class="predefined-search">
              <h2>Rentals</h2>

              {(this.isMobile) ? <listing-slider items={this.privateRoomList} /> : <listing-list items={this.privateRoomList} />}
            </div>
            : null
          }

          {
            this.neighborhoods.length && this.neighborhoodsLoaded?
            <div class="predefined-search">
              <h2>{neighborhoodTitle}</h2>

              <div>
                <neighborhood-slider items={this.neighborhoodsSlider(0)} />
              </div>

            </div>
            : null
          }

        </section>


        <section class="agent-cta">
          <div class="section cta-wrapper">
            <div class="hexagons">
              <lazy-image src="/assets/images/hexagons.jpg" class="desktop-only"></lazy-image>
              <lazy-image src="/assets/images/hexagons-mobile.jpg" class="mobile-only"></lazy-image>
            </div>
            <div class="cta">
              <h3>Work with an Agent</h3>

              <p>
              Pairing the industry's top technology with unsurpassed local expertise  APT212 Team of professionals operates at the highest standards and provide an unmatched experience throughout all phases of the transaction cycle.
              </p>

              <ion-button aria-label="Find an Agent" class="static-button last" onClick={() => { RouterService.reload(RouterService.getRoute('coming-soon')) }}>
                Find an Agent

                <img src="/assets/images/icons/arrow-white.svg" alt="" class="arrow-right" />
              </ion-button>
            </div>
          </div>
        </section>

        <app-footer />


      </ion-content>
    ];
  }
}
