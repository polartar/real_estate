import { Component, h, Prop, State, Watch } from '@stencil/core';
import { Store, Action } from "@stencil/redux";
import { toggleSearchFilterDisplay } from "../../../store/actions/search";
import { searchFilterSelectors } from '../../../store/selectors/search';
import neighborhoodSelectors from '../../../store/selectors/neighborhoods';
import { getNamedSearch } from '../../../store/actions/search';
import { EnvironmentConfigService } from '../../../services/environment/environment-config.service';
import { APISearchService } from '../../../services/api/search';
import taxonomySelectors from '../../../store/selectors/taxonomy';
import { SEOService } from '../../../services/seo.service';

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

    // TODO - routerservice url determination
    SEOService.setCanonical(EnvironmentConfigService.getInstance().get('BASE_URL') + '/nyc-neighborhood/' + this.neighborhoodName + '/apartments');
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

    let title = <h1 class="title">{item.name} APARTMENTS</h1>

    let subtitle = <p class="subtitle">Find the best short term rental apartments, rooms, sublets in {item.name}.</p>

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

    let experience_alt = "Experience " + item.name;
    let eat_alt = "Eat in " + item.name;
    let drink_alt = "Drink in " + item.name;
    let shop_alt = "Shop in " + item.name;
    let play_alt = "Play in " + item.name;
    let explore_alt = "Explore " + item.name;
    let life_alt = "Life in " + item.name;

    return [
      <ion-content>
        <app-header />

        <div class="page-neighborhood">

       <div class="hero">
        <lazy-image src={cover_image} class="hero-bg" alt="background image" />
          <section class="section">
            <div class="cta">
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

                <p innerHTML={item.description}></p>

                <h2 class="tag-title">Neighborhood tags</h2>

                <neighborhood-tags items={item.tags} />

              </div>
            </div>

            <div class="experience no-margin">
              <lazy-image src={main_image}  alt={experience_alt}/>
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
                      <lazy-image src={eat_image}  class="right" alt={eat_alt} />
                </div>
              </div>
              <div class='column'>
                <div class='text-column'>
                <h2>Eat in {item.name}</h2>
                <p innerHTML={item.eat}></p>
                </div>
              </div>
            </div>

            <div class='row reverse'>
              <div class='column'>
                <div class={this.size == "phone-only" ? "image-column reverse no-margin" : "image-column reverse"}>
                    <lazy-image src={drink_image}  class="left" alt={drink_alt} />
                </div>
              </div>
              <div class='column'>
                <div class='text-column'>
                <h2>Drink in {item.name}</h2>
                <p innerHTML={item.drink}></p>
                </div>
              </div>
            </div>

            <div class='row'>
              <div class='column'>
              <div class={this.size == "phone-only" ? "image-column no-margin" : "image-column"}>
                    <lazy-image src={shop_image} class="right" alt={shop_alt} />
                </div>
              </div>
              <div class='column'>
                <div class='text-column'>
                <h2>Shop in {item.name}</h2>
                <p innerHTML={item.shop}></p>
                </div>
              </div>
            </div>

            <div class='row reverse'>
              <div class='column'>
              <div class={this.size == "phone-only" ? "image-column reverse no-margin" : "image-column reverse"}>
                    <lazy-image src={play_image}  class="left" alt={play_alt} />
                </div>
              </div>
              <div class='column'>
                <div class='text-column'>
                <h2>Play in {item.name}</h2>
                <p innerHTML={item.play}></p>
                </div>
              </div>
            </div>

            <div class='row'>
              <div class='column'>
              <div class={this.size == "phone-only" ? "image-column no-margin" : "image-column"}>
                    <lazy-image src={explore_image}  class="right" alt={explore_alt} />
                </div>
              </div>
              <div class='column'>
                <div class='text-column'>
                <h2>Explore in {item.name}</h2>
                <p innerHTML={item.explore}></p>
                </div>
              </div>
            </div>

            <div class='row reverse'>
              <div class='column'>
              <div class={this.size == "phone-only" ? "image-column reverse no-margin" : "image-column reverse"}>
                    <lazy-image src={life_image}  class="left" alt={life_alt} />
                </div>
              </div>
              <div class='column'>
                <div class='text-column'>
                <h2>Life in {item.name}</h2>
                <p innerHTML={item.life}></p>
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


        </div>
        <app-footer />
      </ion-content>
    ];
  }
}
