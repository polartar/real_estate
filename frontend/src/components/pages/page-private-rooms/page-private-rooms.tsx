import { Component, h, Prop, State } from '@stencil/core';
import { Store, Action } from "@stencil/redux";
import { toggleSearchFilterDisplay } from "../../../store/actions/search";
import { searchFilterSelectors } from '../../../store/selectors/search';
import neighborhoodSelectors from '../../../store/selectors/neighborhoods';
import { getNamedSearch } from '../../../store/actions/search';
import { EnvironmentConfigService } from '../../../services/environment/environment-config.service';


@Component({
  tag: 'page-private-rooms',
  styleUrl: 'page-private-rooms.scss'
})

export class PagePrivateRooms {
    @Prop({ context: "store" }) store: Store;
    @Prop() prefetching: boolean = false;
    @State() size: string = 'phone-only';
    @State() isMobile: boolean = true;
    @State() displayFilter: boolean;
    @State() apartmentsList: any[] = [];
    toggleSearchFilterDisplay: Action;
    getNamedSearch: Action;

  
    neighborhoods: any[] = [];
    item: any = null;
    @State() neighborhoodsLoaded: boolean = false;
  
    @State() nearbyApts: any[] = [];
  
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
  
      const rel: any = document.querySelector('link[rel="canonical"]');
      if (rel) {
        rel.setAttribute('href', EnvironmentConfigService.getInstance().get('BASE_URL'));
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
  
    render() {
      if (this.prefetching) {
        return null;
      }
  
  
      let title = <h1 class="title">Rooms for rent nyc</h1>
  
      let subtitle = <p class="subtitle">Explore furnished rooms for rent in New York City</p>
  
      let search = <button class="light" onClick={() => { this.toggleSearchFilterDisplay(!this.displayFilter) }}>
                    Search
                  </button>
       
  
      return [
        <app-header />,
        <ion-content class="page-private-rooms">
  
          <section class="section">
     
  
            <div class="hero">
  
        
              <div class="cta">
                {title}
                {subtitle}
                {search}
              </div> : ''
            
  
            </div>
  
            <div class="rooms-about-wrapper">
                <div class="rooms">
                    <div>
                        <h2>New York City Rooms for Rent </h2>
    
                        <p>
                            Finding a room for rent in NYC is a dream for many. The big apple has been one of the most
                            popular cities in the world and because of the high demand prices can get really high.
                        </p>
        
                        <p>
                            That's why renting a room in New York can be a great deal as you get to share the entire
                            apartment with roommates and still enjoy what the city has to offer.
                        </p>
                        <p>
                            The average room for rent in NYC might go for $1,600 and that's considerably low compared to
                            renting an entire place so many people tend to rent together with friends and split the costs.
                        </p>
                        <p>
                            APT212 offers a wide range of rooms for rent around NYC and Manhattan and you can be sure
                            our system will find you your next room or home.
                        </p>
    
                    </div>
                </div>
  
                <div class="image">
                    <img src ="/assets/images/private-rooms/private-rooms.png" />
                </div>

            </div>

            <div class="room-stats-wrapper">
                <div class="room-stats">
                    <div class="col">
                        <img src ="/assets/images/private-rooms/moveinready.svg" />
                        <h3>Move in Ready</h3>
                        <p>All apartments and bedrooms are fully furnished. Communal space has dining and lounging areas, laptop-friendly workspace, and an equipped kitchen.</p>
                    </div>
                    <div class="col">
                        <img src ="/assets/images/private-rooms/desirable-locations.png" />
                        <h3>Desirable Locations</h3>
                        <p>Residences are located in Manhattan's most exciting - and safe - neighborhoods including Soho, Nolita and the East Village. Apartments are close to major subway lines and local attractions.</p>
                    </div>
                    <div class="col">
                        <img src ="/assets/images/private-rooms/wifi.svg" />
                        <h3>Wifi &nbsp; Cable Access</h3>
                        <p>HD cable TV, high-speed Internet and general utilities are included at a low-cost.</p>
                    </div>
                </div>
                <div class="room-stats bottom">
                    <div class="col">
                        <img src ="/assets/images/private-rooms/budget-friendly.svg" />
                        <h3>Budget Friendly</h3>
                        <p>Rooms start as low as $1400 a month with studio-sized options available for $2100. Utility costs are divided per room and deducted from the security deposit to keep living expenses down.</p>
                    </div>
                    <div class="col">
                        <img src ="/assets/images/private-rooms/flexibility.svg" />
                        <h3>Flexible Lease Terms</h3>
                        <p>Whether you're brand new to New York, in between leases, or need a spot of your own during a school semester, all rooms are available for a minimum of 30 days or as long as you need.</p>
                    </div>
                    <div class="col">
                        <img src ="/assets/images/private-rooms/minimal-paperwork.svg" />
                        <h3>Minimal Paperwork</h3>
                        <p>No US credit checks, tax returns or guarantors required. Guests fill out just a simple application, background check and copy of ID.</p>
                    </div>
                
                </div>
            </div>

            <div class="testimonials">
                <div class="quote">"I had an amazing experience with APT212 last summer! I saved a lot of money by going the private room route, splitting costs to live in a spacious 4-bedroom walking distance to NYU."</div>
                <div class="author">-Chris W.</div>
                <div class="nav">
                    <div class="circle" />
                    <div class="circle" />
                    <div class="circle" />
                </div>
            </div>

            <div class="faq">
                <h1>Frequently Asked Questions about rooms for rent in nyc</h1>
                <div class="question">
                    <h2>Who's my roommate?</h2>
                    <p>Roommates will be either college students or young professional, either male or female</p>
                    <div class="rectangle" />
                </div>
                <div class="question">
                    <h2>What's private and what's shared?</h2>
                    <p>Your bedroom with everything in it will be private, you will be able to lock your room. The common areas, bathroom, kitchen and living room will be shared.</p>
                    <div class="rectangle" />
                </div>
                <div class="question">
                    <h2>How do we handle utility bills?</h2>
                    <p>Utilities costs such as cable, wifi, and electricity will be divided by the number of bedrooms</p>
                    <div class="rectangle" />
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
  