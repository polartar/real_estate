import { Component, h, Prop, State, Build } from '@stencil/core';
import { Store, Action } from "@stencil/redux";
import { toggleSearchFilterDisplay } from "../../../store/actions/search";
import { searchFilterSelectors } from '../../../store/selectors/search';
import neighborhoodSelectors from '../../../store/selectors/neighborhoods';
import { getNamedSearch } from '../../../store/actions/search';
import { EnvironmentConfigService } from '../../../services/environment/environment-config.service';

@Component({
  tag: 'page-home',
  styleUrl: 'page-home.scss'
})
export class PageHome {
  @Prop({ context: "store" }) store: Store;
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
    this.store.mapStateToProps(this, state => {

      const {
        screenSize: { size, isMobile },
      } = state;

      return {
        size,
        isMobile,
        displayFilter: searchFilterSelectors.getDisplayFilter(state),
        neighborhoods: neighborhoodSelectors.getNeighborhoods(state),
        neighborhoodsLoaded: neighborhoodSelectors.getNeighborhoodsLoaded(state)
      };
    });

    this.store.mapDispatchToProps(this, {
      toggleSearchFilterDisplay,
      getNamedSearch
    });

    const rel: any = document.querySelector('link[rel="canonical"]');
    if (rel) {
      rel.setAttribute('href', EnvironmentConfigService.getInstance().get('BASE_URL'));
    }
  }

  componentDidLoad() {

    if (Build.isBrowser) {
      this.getNamedSearch('homePageInit')
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
    let phoneTitle, phoneSubtitle, phoneSearch;

    let title = <h1 class="title">#1 SOURCE FOR NEW YORK<br></br> FURNISHED APARTMENTS</h1>

    let subtitle = <p class="subtitle">Search, find, and book your New York<br></br> furnished apartment</p>

    let search = <button class="light" onClick={() => { this.toggleSearchFilterDisplay(!this.displayFilter) }}>
                    Search
                  </button>

    let luxuryTitle = 'Luxury Apartments in full service doorman buildings';
    let uniqueTitle = 'Unique homes in New York';
    let privateTitle = 'Private rooms in shared apartments';
    let neighborhoodTitle = 'New York City Neighborhoods';

    if (this.size === 'phone-only') {
      phoneTitle = title;
      phoneSubtitle = subtitle;
      phoneSearch = <button aria-label="Search" class="search-dark" onClick={() => { this.launchMobileFilterMenu() }}>
                      Search
                    </button>

      luxuryTitle = 'Luxury apartments';
      uniqueTitle = 'Unique homes';
      privateTitle = 'Private rooms';
      neighborhoodTitle = 'Neighborhoods';
    }

    return [
      <app-header />,
      <ion-content class="page-home">

        <section class="section">
          {phoneTitle}
          {phoneSubtitle}

          <div class="hero">

            { (this.size !== 'phone-only') ?
            <div class="cta">
              {title}
              {subtitle}
              {search}
            </div> : ''
            }

          </div>

          {phoneSearch}

          <media-logos />

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

              </div>
            </div>

            <div class="video">
              <maintain-ratio width={640} height={360}>
                  <youtube-video videoId="C0DPdy98e4c" />
              </maintain-ratio>
            </div>
          </div>

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
                  <ion-router-link class="button-light" href="/faq">
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

        <ion-fab horizontal="end" vertical="bottom" slot="fixed">
            <ion-fab-button class="chat">
              <svg class="chat-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#ffffff" d="M416 192c0-88.4-93.1-160-208-160S0 103.6 0 192c0 34.3 14.1 65.9 38 92-13.4 30.2-35.5 54.2-35.8 54.5-2.2 2.3-2.8 5.7-1.5 8.7S4.8 352 8 352c36.6 0 66.9-12.3 88.7-25 32.2 15.7 70.3 25 111.3 25 114.9 0 208-71.6 208-160zm122 220c23.9-26 38-57.7 38-92 0-66.9-53.5-124.2-129.3-148.1.9 6.6 1.3 13.3 1.3 20.1 0 105.9-107.7 192-240 192-10.8 0-21.3-.8-31.7-1.9C207.8 439.6 281.8 480 368 480c41 0 79.1-9.2 111.3-25 21.8 12.7 52.1 25 88.7 25 3.2 0 6.1-1.9 7.3-4.8 1.3-2.9.7-6.3-1.5-8.7-.3-.3-22.4-24.2-35.8-54.5z"/></svg>
            </ion-fab-button>
        </ion-fab>
      </ion-content>
    ];
  }
}
