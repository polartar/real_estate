import { Component, h, Prop, State, Watch } from '@stencil/core';
import { Store, Action } from "@stencil/redux";
import { toggleSearchFilterDisplay } from "../../../store/actions/search";
import { searchFilterSelectors } from '../../../store/selectors/search';
import neighborhoodSelectors from '../../../store/selectors/neighborhoods';
import { getNamedSearch } from '../../../store/actions/search';
import { EnvironmentConfigService } from '../../../services/environment/environment-config.service';
import { APISearchService } from '../../../services/api/search';
import taxonomySelectors from '../../../store/selectors/taxonomy';

@Component({
  tag: 'page-neighborhood',
  styleUrl: 'page-neighborhood.scss'
})
export class PageNeighborhood {
  @Prop({ context: "store" }) store: Store;
  @Prop() prefetching: boolean = false;
  @Prop() neighborhoodId: number;
  @Prop() neighborhoodName: string;
  @State() size: string = 'phone-only';
  @State() isMobile: boolean = true;
  @State() displayFilter: boolean;
  toggleSearchFilterDisplay: Action;

  @State() apartmentsList: any[] = [];
  getNamedSearch: Action;

  @State() neighborhoods: any[] = [];
  @State() neighborhoodsLoaded: boolean = false;
  @State() neighborhoodsFeatured: any[] = [];

  @State() nearbyApts: any[] = [];
  @State() taxonomyLoaded: boolean = false;

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
        neighborhoods: neighborhoodSelectors.getNeighborhoods(state),
        neighborhoodsFeatured: taxonomySelectors.getFeaturedNeighborhoods(state),
        neighborhoodsLoaded: neighborhoodSelectors.getNeighborhoodsLoaded(state),
        taxonomyLoaded: taxonomySelectors.getTaxonomyLoaded(state)
      };

    });

    this.store.mapDispatchToProps(this, {
      toggleSearchFilterDisplay,
      getNamedSearch
    });

    const rel: any = document.querySelector('link[rel="canonical"]');
    if (rel) {
      rel.setAttribute('href', EnvironmentConfigService.getInstance().get('BASE_URL') + '/neighborhood/' + this.neighborhoodName);
    }

    console.log(this.size);
  }

  @Watch('taxonomyLoaded')
  async taxonomyLoadedChanged(newval, oldval) {
    if (newval !== oldval && newval && !this.prefetching) {
      try {
        const item = this.neighborhoods.find(v => v.slug === this.neighborhoodName);
        this.apartmentsList = await APISearchService.getNamedSearch('apartmentsByNeighborhood', {id: item.id});

      } catch (err) {
        console.log(err);
      }
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
    const splitIndex = Math.round(this.neighborhoodsFeatured.length / 2);

    if (num === 1) {
      return this.neighborhoodsFeatured.slice(0, splitIndex);
    }

    return this.neighborhoodsFeatured.slice(splitIndex + 1);
  }


  render() {
    if (this.prefetching) {
      return null;
    }

    const item = this.neighborhoods.find(v => v.slug === this.neighborhoodName);

    if (!item) {
      return null;
    }

    let title = <h1 class="title">{item.name}</h1>

    let subtitle = <p class="subtitle">Find the best short term apartment rentals in {item.name}.</p>

    let search = <button class="light" onClick={() => { this.toggleSearchFilterDisplay(!this.displayFilter) }}>
                    Search
                  </button>

    let neighborhoodTitle = 'Other New York City Neighborhoods';
    let neighborhoodSubTitle = 'Experience some other neighborhoods';

    let main_image = "/assets/images/neighborhoods/" + item.slug + "-main.jpg";
    let eat_image = "/assets/images/neighborhoods/" + item.slug + "-eat.jpg";
    let drink_image = "/assets/images/neighborhoods/" + item.slug + "-drink.jpg";
    let shop_image = "/assets/images/neighborhoods/" + item.slug + "-shop.jpg";
    let play_image = "/assets/images/neighborhoods/" + item.slug + "-play.jpg";
    let explore_image = "/assets/images/neighborhoods/" + item.slug + "-explore.jpg";
    let life_image = "/assets/images/neighborhoods/" + item.slug + "-life.jpg";
    let cover_image = "/assets/images/neighborhoods/" + item.slug + "-cover.jpg";

    return [
      <app-header />,
      <ion-content class="page-neighborhood">

       <div class="hero">
        <lazy-image src={cover_image} class="hero-bg" alt="background image" />
          <section class="section">
            <div class="cta">
              HELLO SIR
              {title}
              {subtitle}
              {search}
            </div>
          </section>
        </div>

        
        <section class={this.size == "phone-only" ? "section" : "section no-margin"}>
          <div class="neighborhood-about-wrapper">
            <div class="about">
              <div>
                <h2>Experience {item.name}</h2>

                <p>
                  {item.experience}
                </p>

                <h2 class="tag-title">Neighborhood tags</h2>

                <neighborhood-tags items={item.tags} />

              </div>
            </div>

            <div class="experience no-margin">
              <lazy-image src={main_image}  alt="Experience"/>
            </div>

            
          </div>

          </section>

          <div class="map-wrapper">
            <neighborhood-map item={item} />
          </div>

          <section class={this.size == "phone-only" ? "section" : "section no-margin"}>

          <div class="listings-wrapper">
          {
            this.apartmentsList.length ?
            
            <div class="predefined-search">

              {(this.isMobile) ? <listing-slider items={this.apartmentsList.slice(0, 3)} /> : null}
              {(this.isMobile) ? <listing-slider items={this.apartmentsList.slice(3, 6)} /> : null}
              {(this.isMobile) ? <listing-slider items={this.apartmentsList.slice(6, 9)} /> : null}

              {(this.isMobile) ? 
                <listing-slider items={this.apartmentsList.slice(9, 12)} />
              : 
                <listing-list items={this.apartmentsList} />}
            </div>
            
            : null
          }
          </div>

          <find-more />

          

          <div class="highlights">
              <h2>
                  Highlights of {item.name} NYC
              </h2>
              <p>
                  Here are a few great things about {item.name}
              </p>
          </div>

          <div class="highlights-wrapper">
       
            <div class='row'>
              <div class='column'>
                <div class={this.size == "phone-only" ? "image-column no-margin" : "image-column"}>
                      <lazy-image src={eat_image}  class="right" alt="Eat in" />
                </div>
              </div>
              <div class='column'>
                <div class='text-column'>
                <h2>Eat in {item.name}</h2>
                <p>{item.eat}</p>
                </div>
              </div>
            </div>

            <div class='row reverse'>
              <div class='column'>
                <div class={this.size == "phone-only" ? "image-column reverse no-margin" : "image-column reverse"}>
                    <lazy-image src={drink_image}  class="left" alt="Eat in" />
                </div>
              </div>
              <div class='column'>
                <div class='text-column'>
                <h2>Drink in {item.name}</h2>
                <p>{item.drink}</p>
                </div>
              </div>
            </div>

            <div class='row'>
              <div class='column'>
              <div class={this.size == "phone-only" ? "image-column no-margin" : "image-column"}>
                    <lazy-image src={shop_image} class="right" alt="Eat in" />
                </div>
              </div>
              <div class='column'>
                <div class='text-column'>
                <h2>Shop in {item.name}</h2>
                <p>{item.shop}</p>
                </div>
              </div>
            </div>

            <div class='row reverse'>
              <div class='column'>
              <div class={this.size == "phone-only" ? "image-column reverse no-margin" : "image-column reverse"}>
                    <lazy-image src={play_image}  class="left" alt="Eat in" />
                </div>
              </div>
              <div class='column'>
                <div class='text-column'>
                <h2>Play in {item.name}</h2>
                <p>{item.play}</p>
                </div>
              </div>
            </div>

            <div class='row'>
              <div class='column'>
              <div class={this.size == "phone-only" ? "image-column no-margin" : "image-column"}>
                    <lazy-image src={explore_image}  class="right" alt="Eat in" />
                </div>
              </div>
              <div class='column'>
                <div class='text-column'>
                <h2>Explore in {item.name}</h2>
                <p>{item.explore}</p>
                </div>
              </div>
            </div>

            <div class='row reverse'>
              <div class='column'>
              <div class={this.size == "phone-only" ? "image-column reverse no-margin" : "image-column reverse"}>
                    <lazy-image src={life_image}  class="left" alt="Eat in" />
                </div>
              </div>
              <div class='column'>
                <div class='text-column'>
                <h2>Life in {item.name}</h2>
                <p>{item.life}</p>
                </div>
              </div>
            </div>

          </div>
          </section>

          <section class="section">
          
          {
            this.neighborhoods.length && this.neighborhoodsLoaded?
            <div class="predefined-search">
              <h2>{neighborhoodTitle}</h2>
              <p>{neighborhoodSubTitle}</p>
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
