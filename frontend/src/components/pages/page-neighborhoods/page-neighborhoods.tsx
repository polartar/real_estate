import { Component, h, Prop, State } from '@stencil/core';
import { Store } from '@stencil/redux';
import taxonomySelectors from '../../../store/selectors/taxonomy';

@Component({
  tag: 'page-neighborhoods',
  styleUrl: 'page-neighborhoods.scss'
})
export class PageNeighborhoods {
  @Prop({ context: "store" }) store: Store;
  @State() size: string = 'phone-only';
  @State() isMobile: boolean = true;
  @State() loaded: boolean = false;

  @State() neighborhoods: any[] = [];

  hasLoaded: boolean = false;

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        neighborhoods: taxonomySelectors.getFeaturedNeighborhoods(state)
      }
    });
  }

  async componentDidLoad() {
    this.loaded = true;
  }

  render() {

    let title = <h1 class="title">NYC NEIGHBORHOODS</h1>
    let subtitle = <p class="subtitle">Explore Manhattan's most prestigious<br></br> neighborhoods.</p>

    return [
      <ion-content>
        <app-header />

        <div class="page-neighborhoods">

        <div class="hero">
          <lazy-image src="/assets/images/neighborhoods/neighborhood-full.jpg" class="hero-bg" alt="background image" />
          <section class="section">
            <div class="cta">
              {title}
              {subtitle}
            </div>
          </section>
        </div>

        <section class="section">
          <section class="neighborhood-list">

            <div class="neighborhoods-grid">


              {
                this.neighborhoods.map(neighborhood =>

                  <div class="module">
                    <ion-router-link href={`/nyc-neighborhood/${neighborhood.slug}/apartments`}>
                      <div class="neighborhood-card">
                        <lazy-image src={`/assets/images/neighborhoods/${neighborhood.slug}-cover.jpg`} alt={neighborhood.name} class="neighborhood-feature-image" />
                        <div class="hover-cover" />
                        <div class="hover-cover-text">EXPLORE</div>
                        <h4 class="neighborhood-title">{neighborhood.name}</h4>
                      </div>
                    </ion-router-link>
                  </div>
                )
              }

            </div>

          </section>

        </section>
        </div>

        <app-footer />
      </ion-content>
    ];
  }
}
