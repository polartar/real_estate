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

    neighborhoods: any = [];
  
    hasLoaded: boolean = false;
  
    componentWillLoad() {
        this.store.mapStateToProps(this, state => {
            return {
              neighborhoods: taxonomySelectors.getNeighborhoods(state)
            }
          });
    }
  
    async componentDidLoad() {
      this.loaded = true;
    }

    render() {

      let title = <h1 class="title">NEIGHBORHOODS</h1>
      let subtitle = <p class="subtitle">Explore Manhattan's most prestigious<br></br> neighborhoods.</p>

      return [
          
        <app-header />,
        <ion-content class="page-neighborhoods">

          <section class="section">
           
            <div class="hero">

                <div class="cta">
                    {title}
                    {subtitle}
                </div>

            </div>

            <section class="neighborhood-list">

                <div class="neighborhoods-grid">
                    
                    {
                        this.neighborhoods.map(neighborhood =>
                        <div class="module">
                            <ion-router-link href={`/neighborhood/${neighborhood.slug}`}>
                                <div class="neighborhood-card">
                                <lazy-image src={neighborhood.image} alt="title" class="neighborhood-feature-image"/>
                                <h4 class="neighborhood-title">{neighborhood.name}</h4>
                                </div>
                            </ion-router-link>
                        </div>
                        )
                    }
                   
                </div>

            </section>

          </section>
  
          <app-footer />
        </ion-content>
      ];
    }
  }
  