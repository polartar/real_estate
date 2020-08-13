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
    const splitIndex = Math.round(this.neighborhoods.length / 2);

    if (num === 1) {
      return this.neighborhoods.slice(0, splitIndex);
    }

    return this.neighborhoods.slice(splitIndex + 1);
  }

  render() {
    if (this.prefetching) {
      return null;
    }

    let title = <h1 class="title">Your Lifestyle<br></br>Your Home<br></br>Your New York City</h1>

    let subtitle = <p class="subtitle">A customized solution for
    <br></br>all of your  Real Estate needs</p>


    let luxuryTitle = 'Luxury Apartments in full service doorman buildings';
    let uniqueTitle = 'Unique homes in New York';
    let privateTitle = 'Private rooms in shared apartments';
    let neighborhoodTitle = 'New York City Neighborhoods';

    if (this.size === 'phone-only') {
      luxuryTitle = 'Luxury apartments';
      uniqueTitle = 'Unique homes';
      privateTitle = 'Private rooms';
      neighborhoodTitle = 'Neighborhoods';
    }

    return [
      <app-header />,
      <ion-content class="page-home">

        <section class="section">

          <div class="hero">

            <div class="hero-inner">
                <div class="hero-child tablet">
                    {title}
                    {subtitle}
                    <lazy-image src={`/assets/images/home-hero.jpg`} class="markets-feature-image" />
                </div>
                <div class="hero-child info">
                    <a href="/search">Furnished</a>
                    <a href="/coming-soon">Rentals</a>
                    <a href="/coming-soon">Sales</a><br /><br />
                    <input type="text" class="home-search" placeholder="Search Apartments" />
                </div>
            </div>

          </div>

          <div class="markets-grid">
            <div class="module">
              <div class="markets-card">
                <lazy-image src={`/assets/images/market-furnished.jpg`} class="markets-feature-image" />

                <div class="markets-description">
                  <h4 class="markets-title">Furnished Apartments</h4>

                  <p>New York City marketplace for furnished apartments, sublets and short-term rentals. We offer a fresh, simple solution</p>

                  <a href="#" class="learn-more">Learn More</a>
                </div>
              </div>
            </div>

            <div class="module">
              <div class="markets-card">
                <lazy-image src={`/assets/images/market-furnished.jpg`} class="markets-feature-image" />

                <div class="markets-description">
                  <h4 class="markets-title">Furnished Apartments</h4>

                  <p>New York City marketplace for furnished apartments, sublets and short-term rentals. We offer a fresh, simple solution</p>

                  <a href="#" class="learn-more">Learn More</a>
                </div>

              </div>
            </div>

            <div class="module">
              <div class="markets-card">
                <lazy-image src={`/assets/images/market-furnished.jpg`} class="markets-feature-image" />

                <div class="markets-description">
                  <h4 class="markets-title">Furnished Apartments</h4>

                  <p>New York City marketplace for furnished apartments, sublets and short-term rentals. We offer a fresh, simple solution</p>

                  <a href="#" class="learn-more">Learn More</a>
                </div>

              </div>
            </div>

            <div class="module">
              <div class="markets-card">
                <lazy-image src={`/assets/images/market-furnished.jpg`}  />

                <div class="markets-description">
                  <h4 class="markets-title">Furnished Apartments</h4>

                  <p>New York City marketplace for furnished apartments, sublets and short-term rentals. We offer a fresh, simple solution</p>

                  <a href="#" class="learn-more">Learn More</a>
                </div>

              </div>
            </div>

          </div>

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

              <ion-button aria-label="Find an Agent" class="static-button last" onClick={() => { RouterService.reload(RouterService.getRoute('search')) }}>
                Find an Agent
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
              <h2>{luxuryTitle}</h2>

              {(this.isMobile) ? <listing-slider items={this.luxuryList} /> : <listing-list items={this.luxuryList} />}
            </div>
            : null
          }

          {
            this.uniqueList.length && this.neighborhoodsLoaded?
            <div class="predefined-search">
              <h2>{uniqueTitle}</h2>

              {(this.isMobile) ? <listing-slider items={this.uniqueList} /> : <listing-list items={this.uniqueList} />}
            </div>
            : null
          }

          {
            this.privateRoomList.length && this.neighborhoodsLoaded ?
            <div class="predefined-search">
              <h2>{privateTitle}</h2>

              {(this.isMobile) ? <listing-slider items={this.privateRoomList} /> : <listing-list items={this.privateRoomList} />}
            </div>
            : null
          }

          {
            this.neighborhoods.length && this.neighborhoodsLoaded?
            <div class="predefined-search">
              <h2>{neighborhoodTitle}</h2>

              <div>
                <neighborhood-slider items={this.neighborhoodsSlider(1)} />
              </div>

              <div class="mt-24">
                <neighborhood-slider items={this.neighborhoodsSlider(2)} />
              </div>
            </div>
            : null
          }

        </section>

          <div class="faq">
            <lazy-image src="/assets/images/faq-background.jpg" class="faq-bg" alt="background image" />
            <div class="faq-mask" />

            <div class="faq-content-wrapper">
              <div class="section">
              <div class="faq-content flex-col-wrapper">
                <div class="col-1of2">
                  <h3 class="h1 title no-padding-margin">FAQ</h3>
                  <p>Have anymore questions?</p>
                  <ion-router-link class="button-light" href={ RouterService.getRoute('faq') }>
                    FREQUENTLY ASKED QUESTIONS
                  </ion-router-link>
                </div>
                <div class="col-1of2">
                  <faq-accordian />
                </div>
              </div>
              </div>
            </div>
          </div>


        <section class="section home-features">
            <div class="home-feature">
              <lazy-image src="/assets/images/icons/inventory.svg" alt="inventory icon" />
              <div class="feature-content">
                <h2 class="h1 no-padding-margin text-capitalize">Inventory</h2>
                <p>Locations througout Manhattan's most prestigious neighborhoods</p>
              </div>
            </div>

            <div class="home-feature">
              <lazy-image src="/assets/images/icons/local-booking-agents.svg" alt="inventory icon" />
              <div class="feature-content">
                <h2 class="h1 no-padding-margin text-capitalize">Local Booking Agents</h2>
                <p>Clients have direct access to our local team of housing experts</p>
              </div>
            </div>

            <div class="home-feature">
              <lazy-image src="/assets/images/icons/secure-booking.svg" alt="inventory icon" />
              <div class="feature-content">
                <h2 class="h1 no-padding-margin text-capitalize">Secure Booking Platform</h2>
                <p>Secure booking system and rental process all done online</p>
              </div>
            </div>

            <div class="home-feature">
              <lazy-image src="/assets/images/icons/verified-host.svg" alt="inventory icon" />
              <div class="feature-content">
                <h2 class="h1 no-padding-margin text-capitalize">Verified Hosts</h2>
                <p>Strict landlord and host verification process; mainly work with big management</p>
              </div>
            </div>

            <div class="home-feature">
              <lazy-image src="/assets/images/icons/minimal-paperwork.svg" alt="inventory icon" />
              <div class="feature-content">
                <h2 class="h1 no-padding-margin text-capitalize">Minimal Paperwork</h2>
                <p>No credit checks or tax returns, only require background check and photo ID.  Month-to-month lease terms</p>
              </div>
            </div>

            <div class="home-feature">
              <lazy-image src="/assets/images/icons/accuracy.svg" alt="inventory icon" />
              <div class="feature-content">
                <h2 class="h1 no-padding-margin text-capitalize">Accuracy</h2>
                <p>All listings are verified and include photos, videos, 3D floorplans, virtual tours, and more</p>
              </div>
            </div>
        </section>

        <app-footer />


      </ion-content>
    ];
  }
}
