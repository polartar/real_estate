import { Component, h, Prop, State, Build } from '@stencil/core';
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
      this.getNamedSearch('homePageInit', {count: 16})
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

    const rel: any = document.querySelector('link[rel="canonical"]');
    if (rel) {
      rel.setAttribute('href', EnvironmentConfigService.getInstance().get('BASE_URL'));
    }

    this.testimonials = [
      ["\"I had an amazing experience with APT212 last summer! I saved a lot of money by going the private room route, splitting costs to live in a spacious 4-bedroom walking distance to NYU.\"", "-Chris W."],
      ["\"I lived in an awesome shared apartment in Nolita during my study abroad semester. Loved the neighborhood and the people! Thanks for a great experience.\"", "-Mike H."],
      ["\"Was traveling solo and in NY for a little over a month. I found APT212 and rented a private room and the interior and furnishings were much nicer than what I expected. Saved a ton of money in comparison to staying in a hotel!\"", "-Hester K."]
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


    let title = <h1 class="title">Rooms for rent nyc</h1>

    let subtitle = <p class="subtitle">Explore furnished rooms for rent in New York City</p>

    let search = <button class="light" onClick={() => { this.toggleSearchFilterDisplay(!this.displayFilter) }}>
      Search
                  </button>


    return [
      <app-header />,
      <ion-content class="page-private-rooms">

        <div class="hero">
        <lazy-image src="/assets/images/private-rooms/private-rooms-full.jpg" class="hero-bg" alt="background image" />
        <section class="section">
          <div class="cta">
            {title}
            {subtitle}
            {search}
          </div>
          </section>
        </div>
        
        <section class="section">
          <div class="static-page-wrapper">
          <div class="corporate-housing-wrapper">
            <div class="image">
                <lazy-image src="/assets/images/private-rooms/private-rooms.png" class="boxshadow"/>
            </div>
            <div class="rooms">
              <div>
                <h2>New York Rooms for rent</h2>
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
            
          </div>

          <div class="room-stats-wrapper">
            <div class="room-stats">
              <div class="col">
                <lazy-image src="/assets/images/private-rooms/moveinready.svg" />
                <h3>Move in Ready</h3>
                <p>All apartments and bedrooms are fully furnished. Communal space has dining and lounging areas, laptop-friendly workspace, and an equipped kitchen.</p>
                <div class="green-rectangle" />
              </div>
              <div class="col">
                <lazy-image src="/assets/images/private-rooms/desirable-locations.png" />
                <h3>Desirable Locations</h3>
                <p>Residences are located in Manhattan's most exciting - and safe - neighborhoods including Soho, Nolita and the East Village. Apartments are close to major subway lines and local attractions.</p>
              </div>
              <div class="col">
                <lazy-image src="/assets/images/private-rooms/wifi.svg" />
                <h3>Wifi &amp; Cable Access</h3>
                <p>HD cable TV, high-speed Internet and general utilities are included at a low-cost.</p>
              </div>
            </div>
            
            <div class="room-stats bottom">
              <div class="col">
                <lazy-image src="/assets/images/private-rooms/budget-friendly.svg" />
                <h3>Budget Friendly</h3>
                <p>Rooms start as low as $1400 a month with studio-sized options available for $2100. Utility costs are divided per room and deducted from the security deposit to keep living expenses down.</p>
              </div>
              <div class="col">
                <lazy-image src="/assets/images/private-rooms/flexibility.svg" />
                <h3>Flexible Lease Terms</h3>
                <p>Whether you're brand new to New York, in between leases, or need a spot of your own during a school semester, all rooms are available for a minimum of 30 days or as long as you need.</p>
              </div>
              <div class="col">
                <lazy-image src="/assets/images/private-rooms/minimal-paperwork.svg" />
                <h3>Minimal Paperwork</h3>
                <p>No US credit checks, tax returns or guarantors required. Guests fill out just a simple application, background check and copy of ID.</p>
              </div>

            </div>
          </div>

          <testimonials-slider items={this.testimonials} />

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

            <ion-button aria-label="Speak to an expert" class="static-button faq-button" onClick={() => {window.open('/faq', '_self') }}>
              Frequently Asked Questions
            </ion-button>
          </div>

          {
            this.privateRoomList.length && this.neighborhoodsLoaded ?
              <div class="predefined-search">

                {(this.isMobile) ? <listing-slider items={this.privateRoomList} /> : <listing-list items={this.privateRoomList} />}
              </div>
              : null
          }

          <find-more />

          <div class="reasons-about-wrapper">
            <div class="reasons">
              <div>
                <h2>Rent a Room in New York City</h2>
                <p>
                  You may be one of many who are looking for a New York sublet instead of a long term apartment. The price of your short term rental will depend on the neighborhood you choose to dwell in. The average rent in Manhattan will cost you around $4041 vs. other boroughs like Brooklyn and Queens whose averages range from $2194-2675.
                </p>
                <p>
                  To lower your budget, you may also want to room share in New York. Finding a room for rent with fellow professionals may be your best bet for temporary living in the concrete jungle.
                </p>
              </div>
            </div>

            <div class="image">
              <lazy-image src="/assets/images/private-rooms/what-defines-furnished-apartment.jpg" />
            </div>
          </div>

          <div class="reasons-about-wrapper">
            <div class="reasons">
              <div>
                <h2>It is more affordable to rent private rooms in New York.</h2>
                <p>
                  You need somewhere to call home but you might not spend that much time there.   Why pay thousands of dollars a month for somewhere to store your wardrobe, sleep and shower? As a roommate, you'll split the cost of the apartment with others, bringing down the amount you spend on rent and leaving you with more dollars in your pocket to spend on actually living. Not only will your monthly outgoings be lower, but you'll also have less to lay out in the first place in the shape of a security deposit, which makes it easier to secure a room for rent in nyc  than an apartment rental. Utilities are generally cheaper when you split the cost with roommates too.
                </p>
              </div>
            </div>

            <div class="image">
              <lazy-image src="/assets/images/private-rooms/make-payment-one-month-rent.jpg" />
            </div>
          </div>

          <div class="reasons-about-wrapper">
            <div class="reasons">
              <div>
                <h2>Renting a room is the best option when you just move to New York.</h2>
                <p>
                  If you're new to New York  city, or don't have a ready-made network of friends to socialize with, finding a room for rent  is the way to go.   Living with roommates gives you an instant connection, plugging you into the life of the city. Not everybody socializes with their roommates but many do and carry on being friends for years afterwards.
                  Even if you've already got a social life you might not want to come home to a silent and empty apartment. If you've got roommates you've got people to share problems, news, recipes, cool hangouts and the latest movies with. And, if you want some space, you still have your own room to retreat to.
                </p>
              </div>
            </div>

            <div class="image">
              <lazy-image src="/assets/images/private-rooms/worth-the-money.jpg" />
            </div>
          </div>

          <div class="reasons-about-wrapper">
            <div class="reasons">
              <div>
                <h2>Co-living, the new lifestyle </h2>
                <p>
                  It used to be the case that sharing was only something students and kids fresh out of college would contemplate. Nowadays the world has changed and professionals into their forties and above are happily renting together. Going into debt to buy or rent on your own isn't a sensible lifestyle choice; more and more people are choosing to share resources, from cars to jobs, so why not housing too?
                </p>
              </div>
            </div>

            <div class="image">
              <lazy-image src="/assets/images/private-rooms/less-maintenance.jpg" />
            </div>
          </div>

          <div class="reasons-about-wrapper">
            <div class="reasons">
              <div>
                <h2>Avoiding arguments with your roommates</h2>
                <p>
                  APT212 New York City  Corporate Housing offers fully furnished apartments which are move-in ready, affordable and convenient.  As one of the largest furnished corporate housing providers, we are positioned to assist your company needs nationwide. Each apartment has a full array of furniture, housewares, linens and appliances, technology, and all utilities are included in our low daily rates.
                </p>
              </div>
            </div>

            <div class="image">
              <lazy-image src="/assets/images/private-rooms/easy-mobility.jpg" />
            </div>
          </div>

          <div class="reasons-about-wrapper">
            <div class="reasons">
              <div>
                <h2>3 main reasons roommates argue and how to avoid them</h2>
                <p>
                  Here's a quick guide to avoiding arguments before they happen and dealing with them when they do
                  The three main areas for disagreement are space, noise and money, so it pays to discuss these things in advance and work out if you can really live together.
                </p>
              </div>
            </div>

            <div class="image">
              <lazy-image src="/assets/images/private-rooms/why-corporate-housing.jpg" />
            </div>
          </div>

          <div class="reasons-about-wrapper">
            <div class="reasons">
              <div>
                <h2>Space</h2>
                <p>
                  You may have very little space to call your own in a shared apartment. Respecting other people's space is therefore key to getting along with your roommates. Don't go into your roommate's room without asking and be considerate and respectful in shared areas. Don't take up more space than you're entitled to - if there are three shelves in the refrigerator and three people sharing the apartment then the math is pretty simple!
                </p>
                <p>
                  Where you're sharing space you'll also have to come to an agreement over how clean you intend to keep your living areas, kitchen, bathroom etc. If you can't agree between you on how often to vacuum and whose responsibility it is to take out the trash, maybe you shouldn't be living together (or maybe you just need to hire a cleaner!)
                </p>
              </div>
            </div>

            <div class="image">
              <lazy-image src="/assets/images/private-rooms/business-travelers.jpg" />
            </div>
          </div>

          <div class="reasons-about-wrapper">
            <div class="reasons">
              <div>
                <h2>Noise</h2>
                <p>
                  Another major reason why roommates fall out with each other is noise. Check each other's schedules and try to work around them. If your roommate needs to get up early, they won't appreciate you having the TV turned way up loud into the early hours. And if you're up early on a weekend, full of energy from your jog, your snoozing roommate might not appreciate it if you decide to start vacuuming the apartment - however much it needed it.
                </p>
                <p>
                  We're not saying you need to be super quiet every minute of the day, but do think before crashing around and waking up your roommates.
                </p>
              </div>
            </div>

            <div class="image">
              <lazy-image src="/assets/images/private-rooms/corporate-housing-solution.jpg" />
            </div>
          </div>

          <div class="reasons-about-wrapper">
            <div class="reasons">
              <div>
                <h2>Money</h2>
                <p>
                  Everything else seems to boil down to money. Not dealing with money issues before they escalate causes major headaches between roommates, so it's best to let people know if you've got a problem paying your share of the utilities or rent. If you can, pay up promptly - it's uncomfortable for your roommates to keep reminding you to hand over the cash you owe them.
                </p>
              </div>
            </div>

            <div class="image">
              <lazy-image src="/assets/images/private-rooms/corporate-housing-solution-copy.jpg" />
            </div>
          </div>

          <div class="reasons-about-wrapper">
            <div class="reasons">
              <div>
                <h2>Communication is key</h2>
                <p>
                  Most problems you'll run into when renting a room for rent and  sharing with people can be avoided by communicating. If someone is annoying you by cranking up the volume, failing to do their share of the chores or not paying their bills then it's always best to bring it up before you reach boiling point. Sit down for a coffee and talk through things calmly rather than wait till the last minute and lose your temper. As soon as you start shouting or swearing at someone you've lost all hope of resolving whatever the original problem was.
                </p>
              </div>
            </div>

            <div class="image">
              <lazy-image src="/assets/images/private-rooms/communication.jpg" />
            </div>
          </div>

          <div class="reasons-about-wrapper">
            <div class="reasons">
              <div>
                <h2>Make yourself at home</h2>
                <p>
                  Having a fully furnished apartment means that you don’t have to buy new furniture and you don’t have to move your belongings from one city to another. If you are staying in the apartment for a longer period of time, you might want to redecorate your new home to really feel at home -- there are a few tricks you can use to make quick changes without having to do any serious shopping.
                  Bedding: buy yourself a generous set of bedding. Nice, cozy sheets and an extra pillow can achieve wonders when trying to make the apartment homey.
                  Plants: small house plants are a great and inexpensive way to add a splash of color to your surroundings and an easy way to provide extra oxygen to increase productivity.
                  Scents: Use room sprays, candles, or your favorite laundry detergent to make your apartment smell like home. Adding familiar scents will people feel more at ease in a new place.
                </p>
              </div>
            </div>

            <div class="image">
              <lazy-image src="/assets/images/private-rooms/money.jpg" />
            </div>
          </div>

          <div id='learn-more-wrapper' class="learn-more">
            <div class="left">
              <div class="image">
                <lazy-image src="/assets/images/private-rooms/learn-more-about-apt-212.jpg" />
              </div>
            </div>
            <div class="right">
              <h2>LEARN MORE ABOUT APT212</h2>
              <p>
                APT212 is a marketplace for furnished apartments , sublets and legal short term rentals located across New York City's most prestigious neighborhoods
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

        <ion-fab horizontal="end" vertical="bottom" slot="fixed">
          <ion-fab-button class="chat">
            <svg class="chat-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#ffffff" d="M416 192c0-88.4-93.1-160-208-160S0 103.6 0 192c0 34.3 14.1 65.9 38 92-13.4 30.2-35.5 54.2-35.8 54.5-2.2 2.3-2.8 5.7-1.5 8.7S4.8 352 8 352c36.6 0 66.9-12.3 88.7-25 32.2 15.7 70.3 25 111.3 25 114.9 0 208-71.6 208-160zm122 220c23.9-26 38-57.7 38-92 0-66.9-53.5-124.2-129.3-148.1.9 6.6 1.3 13.3 1.3 20.1 0 105.9-107.7 192-240 192-10.8 0-21.3-.8-31.7-1.9C207.8 439.6 281.8 480 368 480c41 0 79.1-9.2 111.3-25 21.8 12.7 52.1 25 88.7 25 3.2 0 6.1-1.9 7.3-4.8 1.3-2.9.7-6.3-1.5-8.7-.3-.3-22.4-24.2-35.8-54.5z" /></svg>
          </ion-fab-button>
        </ion-fab>
      </ion-content>
    ];
  }
}
