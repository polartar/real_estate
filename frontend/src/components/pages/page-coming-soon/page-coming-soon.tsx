import { Store } from "@stencil/redux";
import { Component, h, Prop } from '@stencil/core';

@Component({
    tag: 'page-coming-soon',
    styleUrl: 'page-coming-soon.scss'
  })
  export class PageComingSoon {
    @Prop({ context: "store" }) store: Store;

    render() {

      let title = <h1 class="title">COMING SOON</h1>
      let subtitle = <p class="subtitle">We are working on something big.</p>

      return [

        <app-header-home />,
        <ion-content class="page-coming-soon">


        <div class="hero">
          <lazy-image src="/assets/images/neighborhoods/neighborhood-full.jpg" class="hero-bg" alt="background image" />
          <section class="section">
            <div class="cta">
              {title}
              {subtitle}
            </div>
          </section>
        </div>

        <app-footer />

        </ion-content>
      ];
    }
  }
