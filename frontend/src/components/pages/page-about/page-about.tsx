import { Component, h, Prop } from '@stencil/core';
import { EnvironmentConfigService } from '../../../services/environment/environment-config.service';

@Component({
  tag: 'page-about',
  styleUrl: 'page-about.scss'
})

export class PageAbout {
    @Prop() prefetching: boolean = false;

    componentWillLoad() {
        if (this.prefetching) {
          return;
        }
    
        const rel: any = document.querySelector('link[rel="canonical"]');
        if (rel) {
          rel.setAttribute('href', EnvironmentConfigService.getInstance().get('BASE_URL'));
        }
      }

    render() {
        return [
            <app-header />,
            <ion-content class="page-about">
    
            <section class="section">
                <div class="hero">
    
                <div class="cta">
                    <h1 class="title">ABOUT APT212</h1>
                    <p class="subtitle">#1 Source for New York furnished apartments.</p>
                </div>
    
                </div>
            <div class="static-page-wrapper">
                <div class="home-about-wrapper">
                    <div class="about">
                        <div>
                            <h2>What is APT212?</h2>

                            <p>
                            APT212 is a New York City marketplace for furnished apartments, sublets and short-term rentals. We offer a fresh solution to finding the perfect temporary home.</p>

                            <p>
                                Thanks to an easily navigable inventory, users can access the finest selection of move-in ready properties across Manhattan's most desirable neighborhood, ranging from private rooms in shared apartments to units in luxury buildings.
                            </p>

                            <p>Online booking through APT212 is seamless and secure, and our team of housing experts is available around the clock to help you along the way.
                                                        </p>

                        </div>
                    </div>

                    <div class="image">
                        <img src="/assets/images/about/iphone.png" />
                    </div>

                  
                </div>

                <hr />

                <div class="story-wrapper">
                <div class="image">
                        <img src="/assets/images/about/shape.png" />
                    </div>
                    <div class="about">
                        <div>
                            <h2>Our Story</h2>

                            <p>
                                Founded in 2010 as a traditional brokerage, APT212 has transformed into a marketplace for short-term, furnished rentals - a unique yet indispensable corner of Manhattan real estate.
                            </p>

                            <p>
                                Our team has knowledge of the industry's entire landscape, lending to a firsthand understanding of what clients, agents and hosts are seeking and how to best fulfill their needs.
                            </p>

                            <p>
                                As a result, the experts at APT212 know every in and out of renting in New York City and are passionate about providing guests with the perfect home away from home.
                            </p>


                        </div>
                    </div>
                </div>

                <div class="callout">
                    <h2>
                    Our Team
                    </h2>
                    <p>
                        The on-the-ground experts at APT212 are leaders in finding a well-suited property that matches guest's needs and expectations. Our team is comprised of licensed, multilingual, Manhattan-savvy agents that know the ins and outs of New York city real estate and have a unique understanding of the short-term rental market.
                    </p>
                    <p>
                    The agents are available to assist every step of the way, answering any questions, visiting the unit, and finalizing your rental. The staff prides itself on exceptional customer service to help make moving and relocating stress-free.
                    </p>
                </div>

                <div class="people-wrapper">
                    
                    <div class="people">
                        <div class="person">
                            <img src="/assets/images/about/adrian.jpg" />
                        </div>
                        <div class="person">
                            <img src="/assets/images/about/adrian.jpg" />
                        </div>
                        <div class="person">
                            <img src="/assets/images/about/adrian.jpg" />
                        </div>
                        <div class="person">
                            <img src="/assets/images/about/adrian.jpg" />
                        </div>
                    </div>

                    <div class="people">
                        <div class="person">
                            <img src="/assets/images/about/adrian.jpg" />
                        </div>
                        <div class="person">
                            <img src="/assets/images/about/adrian.jpg" />
                        </div>
                        <div class="person">
                            <img src="/assets/images/about/adrian.jpg" />
                        </div>
                        <div class="person">
                            <img src="/assets/images/about/adrian.jpg" />
                        </div>
                    </div>

                    <div class="people">
                        <div class="person">
                            <img src="/assets/images/about/adrian.jpg" />
                        </div>
                        <div class="person">
                            <img src="/assets/images/about/adrian.jpg" />
                        </div>
                        <div class="person">
                            <img src="/assets/images/about/adrian.jpg" />
                        </div>
                        <div class="person">
                            <img src="/assets/images/about/adrian.jpg" />
                        </div>
                    </div>
                </div>

                    <div class="edge-wrapper">
                        <h2>Our Edge</h2> 
                        <div class="edge">
                            
                            <div class="row">
                                   
                                <img src="/assets/images/about/flexibility.png" />
                                <h3>Flexible Lease Terms</h3>
                                <p>
                                    No need to commit to a long-term lease. APT212 offers 30-day minimum lease term for furnished units - a rare find in New York City.
                                </p>
                            </div>
                            <div class="row">
                                <img src="/assets/images/about/flexibility.png" />
                                <h3>Accuracy</h3>
                                    <p>
                                        No need to commit to a long-term lease. APT212 offers 30-day minimum lease term for furnished units - a rare find in New York City.
                                    </p>
                            </div>
                                
                        </div>
                        <div class="edge">
                            <div class="row">
                                <img src="/assets/images/about/flexibility.png" />
                                <h3>Flexible Lease Terms</h3>
                                <p>
                                    No need to commit to a long-term lease. APT212 offers 30-day minimum lease term for furnished units - a rare find in New York City.
                                </p>
                            </div>
                            <div class="row">
                            <img src="/assets/images/about/flexibility.png" />
                                <h3>Accuracy</h3>
                                <p>
                                    No need to commit to a long-term lease. APT212 offers 30-day minimum lease term for furnished units - a rare find in New York City.
                                </p>
                            </div>
                                
                        </div>
                        <div class="edge">
                            <div class="row">
                                <img src="/assets/images/about/flexibility.png" />
                                <h3>Flexible Lease Terms</h3>
                                <p>
                                    No need to commit to a long-term lease. APT212 offers 30-day minimum lease term for furnished units - a rare find in New York City.
                                </p>
                            </div>
                            <div class="row">
                                <img src="/assets/images/about/flexibility.png" />
                                <h3>Accuracy</h3>
                                <p>
                                    No need to commit to a long-term lease. APT212 offers 30-day minimum lease term for furnished units - a rare find in New York City.
                                </p>
                            </div>
                                
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