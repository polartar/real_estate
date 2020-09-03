import { Component, h, Prop, State, Build } from '@stencil/core';
import { Store, Action } from "@stencil/redux";
import { toggleSearchFilterDisplay } from "../../../store/actions/search";
import { searchFilterSelectors } from '../../../store/selectors/search';
import neighborhoodSelectors from '../../../store/selectors/neighborhoods';
import { getNamedSearch } from '../../../store/actions/search';
import { ModalService } from '../../../services/modal.service';
import { RouterService } from '../../../services/router.service';

@Component({
  tag: 'page-corporate-rooms',
  styleUrl: 'page-corporate-rooms.scss'
})

export class PageCorporateRooms {
  @Prop({ context: "store" }) store: Store;
  @Prop() prefetching: boolean = false;
  @State() size: string = 'phone-only';
  @State() isMobile: boolean = true;
  @State() displayFilter: boolean;
  @State() apartmentsList: any[] = [];
  @State() privateRoomList: any[] = [];
  @State() neighborhoodsLoaded: boolean = false;
  @State() nearbyApts: any[] = [];

  toggleSearchFilterDisplay: Action;
  getNamedSearch: Action;
  neighborhoods: any[] = [];
  item: any = null;
  testimonials: any[] = [];

  componentDidLoad() {
    if (this.prefetching) {
      return;
    }

    if (Build.isBrowser) {
      this.getNamedSearch('homePageInit', { count: 16 })
        .then(result => {
          this.privateRoomList = result.privateRoomList;
        })
        .catch(e => console.log(e));
    }
  }

  componentWillLoad() {
    if (this.prefetching) {
      return;
    }
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
        neighborhoods: neighborhoodSelectors.getNeighborhoods(state),
        neighborhoodsLoaded: neighborhoodSelectors.getNeighborhoodsLoaded(state),
      };
    });

    this.store.mapDispatchToProps(this, {
      toggleSearchFilterDisplay,
      getNamedSearch
    });

    this.testimonials = [
      ["We had two employees in Italy that needed to be in New York for a 3 months construction project. My APT212 booking agent  was very efficient and professional and help me secure my our corporate housing.", "- Vanessa H."],
      ["APT212 really saved us a lot of time to find corporate housing in NYC. The apartments from APT212 are gorgeous in safeneighbourhoods.third price of hotels with doorman and versatile amenities, our sales team likes them a lot!", "- Dan T. - All Bright Services"],
      ["Each semester we have numbers of visiting/ exchange students. Working with APT212 was a good experience. When our dorms can’t accommodate a large number of student’s demand, we chose APT212, because the apartments are reasonably priced. Good for frugal students!", "- Cathrine H.  - Gateway College "]
    ];
  }

  async launchMobileFilterMenu() {
    const modal = Object.assign(document.createElement('ion-modal'), {
      component: 'mobile-filter-menu',
      cssClass: 'app-menu'
    });

    document.body.appendChild(modal);
    return modal.present();
  }

  render() {
    if (this.prefetching) {
      return null;
    }


    let title = <h1 class="title">Corporate Housing NYC</h1>

    let subtitle = <p class="subtitle">Find Corporate Housing – Rooms, Apartments IN NYC</p>

    let search = <button class="light" onClick={() => { ModalService.contactUs() }}>
      Enquire
                  </button>


    return [
      <ion-content class="page-corporate-rooms">
        <app-header />

        <div class="hero">
          <lazy-image src="/assets/images/corporate-rooms/corporate-hero-full.jpg" class="hero-bg" alt="premium corporate housing" />
          <section class="section">
            <div class="cta">
              {title}
              {subtitle}
              {search}
            </div>
          </section>
        </div>

        <section class="section">

          <div class="what-is-wrapper">
            <div class="rooms">
              <div>
                <h2>NYC Corporate Housing</h2>
                <p>
                  APT212 corporate housing solution is perfect for business travelers looking for a short term
                  furnished flat to rest their heads while visiting New York city. It's not uncommon when starting a new
                  job in a new city to need a short term solution for housing. Until you settle in your new town, you
                  want a place to call home, even if it's only for a month or two.
                </p>
                <p>
                  We have partnered with industry leading companies and help them regularly with their short term
                  corporate housing needs around NYC providing them with apartments that not only meet their
                  expectations, but exceeds them.
                </p>
                <p>
                  APT212 is a leading furnished apartments supplier in Manhattan. Our selection of top notch
                  apartments will give you anything you need from housing perspective right down to the sheets on
                  the bed and the pillows in the living room. Don't just settle for mediocre places in bad
                  neighbourhoods. Choose to stay in high class furnished corporate housing in NYC that will make your
                  time even more pleasant.
                </p>
              </div>
            </div>
            <div class="image">
              <lazy-image src="/assets/images/corporate-rooms/nyc-corporate-housing.jpg" alt="nyc corporate housing" class="boxshadow neighborhood-feature-image" />
            </div>
          </div>

          <div class="corporate-housing-wrapper">
            <div class="image">
              <lazy-image src="/assets/images/corporate-rooms/what-is-corporate-housing.jpg" alt="short-term corporate housing" class="boxshadow neighborhood-feature-image" />
            </div>
            <div class="rooms">
              <div>
                <h2>What is Corporate housing?</h2>
                <p>
                  Short term corporate housing is a solution offered to business men or companies that need to
                  transfer executives or other employees to a new location and they need a place to stay.
                </p>

                <p>
                  The most common reasons a company or a person will want to use corporate housing is if he only
                  needs to be in town for a short period for example a month or two or if he is starting a new job in a
                  new city and needs a place to stay until getting a more permanent place.
                </p>

                <p>
                  The big advantage of using corporate housing is that you get a furnished place, usually in a great
                  location and a great building, that you can call home from the minute you step inside, not having to waste days on finding accommodation that meet your expectations.
                </p>

                <p>
                  It is very common in NYC to use corporate housing and many leading companies already use this
                  solution to house their employees as needed.
                </p>
              </div>
            </div>

          </div>

          <div class="room-stats-wrapper">
            <div class="room-stats">
              <div class="col">
                <lazy-image src="/assets/images/corporate-rooms/inventory.svg" alt="Wide-Range of Inventory"/>
                <h3>Wide-Range of Inventory</h3>
                <p>The properties range from affordable, private rooms in a shared apartment to luxury apartments. With multiple residences available in the same buildings, we are able to keep large groups together.</p>
                <div class="green-rectangle" />
              </div>
              <div class="col">
                <lazy-image src="/assets/images/corporate-rooms/move-in-ready.svg" alt="move in ready"/>
                <h3>Move-In Ready</h3>
                <p>All properties are fully furnished, equipped, and offer extensive amenities such as Wifi, Cable TV and cleaning services,  concierge service, and more.</p>
              </div>
              <div class="col">
                <lazy-image src="/assets/images/corporate-rooms/convenient-locations.svg" alt="convenient locations" />
                <h3>Convenient Locations</h3>
                <p>The apartments are located in Manhattan’s most prestigious neighborhoods and are close to major subway lines as well as local attractions.</p>
              </div>
            </div>

            <div class="room-stats bottom">
              <div class="col">
                <lazy-image src="/assets/images/corporate-rooms/minimal-paperwork.svg" alt="financing options by apt212" />
                <h3>Financing</h3>
                <p>All financing options based on the institution’s requirements are acceptable. </p>
              </div>
              <div class="col">
                <lazy-image src="/assets/images/corporate-rooms/competitive-pricing.svg" alt="competitive pricing" />
                <h3>Competitive Pricing</h3>
                <p>Our rates are unbeatable and meet all of our business travelers’ needs – as well as company budgets. Discounts available for group bookings. </p>
              </div>
              <div class="col">
                <lazy-image src="/assets/images/corporate-rooms/flexible-terms.svg" alt="manhattan’s strict rental requirements" />
                <h3>Flexible Lease Terms</h3>
                <p>Unlike Manhattan’s strict rental requirements, no US credit checks, tax returns or guarantors required. Only basic information and a copy of ID is needed. Rent as long you need with a minimum of 30 days. </p>
              </div>

            </div>
          </div>

          <div class="callout">
            <h2>
              No matter the industry, we have the professional corporate housing solution in NYC for you
            </h2>
          </div>
          <div class="grid-wrapper">


            <div class='grid'>
              <div class='cell'>
                <lazy-image src="/assets/images/corporate-rooms/educational.png" alt="accommodation for students" class="neighborhood-feature-image" />
                <div class="heading">Educational Institutions</div>
                <div class="copy">We offer accommodation for students, interns, and professors close to universities on a rental basis that corresponds with the school year.</div>
              </div>

              <div class='cell'>
                <lazy-image src="/assets/images/corporate-rooms/fashion.png" alt="fashion &amp; modeling" class="neighborhood-feature-image" />
                <div class="heading">Fashion &amp; Modeling</div>
                <div class="copy">Many of our exclusive properties are located in Manhattan’s most trendy neighborhoods such as Soho, Nolita and the Flatiron District.</div>
              </div>

              <div class='cell'>
                <lazy-image src="/assets/images/corporate-rooms/startups.png" alt="long term accomadation for employees" class="neighborhood-feature-image" />
                <div class="heading">Startups</div>
                <div class="copy">Perfect housing solution for startups seeking temporary or long term accomadation for employees.</div>
              </div>

              <div class='cell'>
                <lazy-image src="/assets/images/corporate-rooms/entertainment.png" alt="entertainment" class="neighborhood-feature-image" />
                <div class="heading">Entertainment</div>
                <div class="copy">We have experience working with cast and crew to find housing that can accommodate hectic schedules, tight budget,s and unparalleled discretion while on location.</div>
              </div>

              <div class='cell'>
                <lazy-image src="/assets/images/corporate-rooms/healthcare.png" alt="apartments for healthcare" class="neighborhood-feature-image" />
                <div class="heading">Healthcare</div>
                <div class="copy">We offer apartments in accessible buildings with full amenities close to medical centers including Lenox Hill, Mount Sinai and Memorial Sloan Kettering.<br />
                  We offer apartments in accessible buildings with full amenities close to medical centers including Lenox Hill, Mount Sinai and Memorial Sloan Kettering.
                </div>
              </div>

              <div class='cell'>
                <lazy-image src="/assets/images/corporate-rooms/financial.png" alt="apt212 financial services" class="neighborhood-feature-image" />
                <div class="heading">Financial Services</div>
                <div class="copy">With clientele ranging from summer interns to executives, we offer housing within walking distance of firms such as JPMorgan Chase, Goldman Sachs, Barclays and Credit Suisse.</div>
              </div>

              <div class='cell'>
                <lazy-image src="/assets/images/corporate-rooms/consulates.png" alt="consulates &amp; embassies" class="neighborhood-feature-image" />
                <div class="heading">Consulates &amp; Embassies</div>
                <div class="copy">We have superior properties within walking distance of the United Nations as well as major embassies and diplomatic missions.</div>
              </div>

              <div class='cell'>
                <lazy-image src="/assets/images/corporate-rooms/legal.png" alt="legal" class="neighborhood-feature-image" />
                <div class="heading">Legal</div>
                <div class="copy">Many residences come with laundry and housekeeping services, meeting rooms and plenty of space that make it easy for family to visit.</div>
              </div>

              <div class='cell'>
                <lazy-image src="/assets/images/corporate-rooms/other.png" alt="apartments for other industries" class="neighborhood-feature-image" />
                <div class="heading">Other Industries</div>
                <div class="copy">Accounting &amp; Consulting, Advertising &amp; Public Relations, Information Technology, Insurance, Leisure &amp; Hospitality, Nonprofits &amp; Cultural Institutions.</div>
              </div>

            </div>
          </div>

          <div class="mission">
            <h2>APT 212 MISSION</h2>
            <p>
              To deliver corporate housing that doesn't sacrifice comfort or style. We at APT212 understand that today's business man doesn't just want a place to sleep while he's in town.
              He wants a place to call home, keeping the level of housing that he is used to while on business trips or short term relocations.
          </p>
          </div>

        </section>

        <testimonials-slider items={this.testimonials} />

        <section class="section">

          {
            this.privateRoomList.length && this.neighborhoodsLoaded ?

            <div class="predefined-search">

              {(this.isMobile) ? <listing-slider items={this.privateRoomList.slice(0, 3)} /> : null}
              {(this.isMobile) ? <listing-slider items={this.privateRoomList.slice(3, 6)} /> : null}
              {(this.isMobile) ? <listing-slider items={this.privateRoomList.slice(6, 9)} /> : null}

              {(this.isMobile) ?
                <listing-slider items={this.privateRoomList.slice(9, 12)} />
              :
                <listing-list items={this.privateRoomList} />}
            </div>

            : null
          }

          <find-more />

          <div class="reasons-heading">
            <h2>Some more information about our New York corporate housing solutions</h2>
          </div>


          <div class='reasons-wrapper'>

            <div class='row'>
              <div class='column image'>
                <div class='image-column'>
                  <div class="reasons-image">
                    <lazy-image src="/assets/images/corporate-rooms/one-month-rent.png" alt="renting a furnished apartment" />
                  </div>
                </div>

              </div>
              <div class='column'>
                <div class='text-column'>
                  <h3>Make a payment of 1 month’s rent</h3>
                  <p>
                    Rooms start as low as $1400 a month with studio-sized options available for $2100. Utility costs are divided per room and deducted from the security deposit to keep living expenses downHere are some benefits of renting a furnished apartment/flat.
                </p>
                </div>
              </div>
            </div>

            <div class='row'>
              <div class='column image'>
                <div class='image-column'>
                  <div class="reasons-image">
                    <lazy-image src="/assets/images/corporate-rooms/worth-money.png" alt="studio-sized rooms for rent" />
                  </div>
                </div>

              </div>
              <div class='column'>
                <div class='text-column'>
                  <h3>Worth the money</h3>
                  <p>
                    Rooms start as low as $1400 a month with studio-sized options available for $2100. Utility costs are divided per room and deducted from the security deposit to keep living expenses downHere are some benefits of renting a furnished apartment/flat.
                </p>
                </div>
              </div>
            </div>

            <div class='row'>
              <div class='column image'>
                <div class='image-column'>
                  <div class="reasons-image">
                    <lazy-image src="/assets/images/corporate-rooms/less-maintenance.png" alt="less maintenance &amp; hassle-free living" />
                  </div>
                </div>

              </div>
              <div class='column'>
                <div class='text-column'>
                  <h3>Less maintenance &amp; hassle-free living</h3>
                  <p>
                    Renting a furnished apartment, you don’t have to be much concerned about breakage, maintenance and repairs as they would all be taken care of by the property management and owners. They support and assist to fix up any domestic services that you need. By moving to a <ion-router-link href="/">furnished apartment for rent</ion-router-link>, you can just walk in and start living your life without any hassles of shifting old furniture sets, fixing them up and fitting in the available space. Stop hunting for an apartment that fits your old furniture with the furnished flats for rent.
                </p>
                </div>
              </div>
            </div>

            <div class='row'>
              <div class='column image'>
                <div class='image-column'>
                  <div class="reasons-image">
                    <lazy-image src="/assets/images/corporate-rooms/easy-mobility.png" alt="easy mobility &amp; fewer obligations" />
                  </div>
                </div>
              </div>
              <div class='column'>
                <div class='text-column'>
                  <h3>Easy mobility &amp; fewer obligations</h3>
                  <p>
                    APT212 New York City  Corporate Housing offers fully furnished apartments which are move-in ready, affordable and convenient.  As one of the largest furnished corporate housing providers, we are positioned to assist your company needs nationwide. Each apartment has a full array of furniture, housewares, linens and appliances, technology, and all utilities are included in our low daily rates.
                  </p>
                </div>
              </div>
            </div>

            <div class='row'>
              <div class='column image'>
                <div class='image-column'>
                  <div class="reasons-image">
                    <lazy-image src="/assets/images/corporate-rooms/why-corporate.png" alt="apt212 corporate housing offers" />
                  </div>
                </div>
              </div>
              <div class='column'>
                <div class='text-column'>
                  <h3>WHY APT212 CORPORATE HOUSING</h3>
                  <p>
                    <ion-router-link href="/">APT212</ion-router-link> New York City  Corporate Housing offers fully furnished apartments which are move-in ready, affordable and convenient.  As one of the largest furnished corporate housing providers, we are positioned to assist your company needs nationwide. Each apartment has a full array of furniture, housewares, linens and appliances, technology, and all utilities are included in our low daily rates.
                </p>
                </div>
              </div>
            </div>

            <div class='row'>
              <div class='column image'>
                <div class='image-column'>
                  <div class="reasons-image">
                    <lazy-image src="/assets/images/corporate-rooms/business.png" alt="business travellers corporate housing offers" />
                  </div>
                </div>
              </div>
              <div class='column'>
                <div class='text-column'>
                  <h3>Business Travelers</h3>
                  <p>
                    Business people travel to remote cities to manage or participate in company projects that can take weeks or even months to complete. When stays get lengthy, hotel/motel living can get old quickly. Furnished corporate apartments allow business people who are away for extended periods to live with some sense of normalcy. Having access to full kitchens also allows them to better control their food and dining expenses, savings companies usually appreciate.
                </p>
                </div>
              </div>
            </div>

            <div class='row'>
              <div class='column image'>
                <div class='image-column'>
                  <div class="reasons-image">
                    <lazy-image src="/assets/images/corporate-rooms/corporate-solution.png" alt="corporate housing solution by apt212" />
                  </div>
                </div>
              </div>
              <div class='column'>
                <div class='text-column'>
                  <h3>Our corporate housing solution</h3>
                  <p>
                    APT212 offers short-term housing solutions that can be more advantageous than those offered by hotels, motels and vacation rentals. Furnished apartments provide the space, comfort, privacy and independence of traditional rental housing along with such basic household items as beds, sofas, chairs, tables — and, in many cases, even TVs and kitchenware — but at a much lower cost than hotel and motel rooms that are usually a fraction of the size. Leases are often month-to-month, and may even cover some major utilities.
                </p>
                </div>
              </div>
            </div>

            <div id='learn-more-wrapper' class="learn-more">
              <div class="left">
                <div class="image">
                  <lazy-image src="/assets/images/private-rooms/learn-more-about-apt-212.jpg" alt="more about apt212" />
                </div>
              </div>
              <div class="right">
                <h3>LEARN MORE ABOUT APT212</h3>
                <p>
                  APT212 is a marketplace for furnished apartments , sublets and legal short term rentals located across New York City's most <ion-router-link href={ RouterService.getRoute('neighborhoods') }>prestigious neighborhoods</ion-router-link>
              </p>
                <p>
                  We offer a fresh solution to finding the perfect New York temporary home away from home.
              </p>

                <ion-button aria-label="Speak to an expert" class="static-button" href="/about">
                  What is APT212?
              </ion-button>
              </div>
            </div>

          </div>

        </section>


        <app-footer />


      </ion-content>
    ];
  }
}
