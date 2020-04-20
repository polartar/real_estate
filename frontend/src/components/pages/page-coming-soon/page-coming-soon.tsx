import { Store } from "@stencil/redux";
import { Component, h, Prop } from '@stencil/core';

@Component({
    tag: 'page-coming-soon',
    styleUrl: 'page-coming-soon.scss'
  })
  export class PageComingSoon {
    @Prop({ context: "store" }) store: Store;
   
    render() {
      return [

        <app-header />,
        <ion-content class="page-coming-soon">

            <div class="hero">
                <div class="section">
                  <div class="cta">

                    <h1>Coming Soon</h1>


                  </div>
                </div>
            </div>

            <app-footer />
            
        </ion-content>
      ];
    }
  }
