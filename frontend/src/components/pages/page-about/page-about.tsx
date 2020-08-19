import { Component, h, Prop } from '@stencil/core';

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
      }

    render() {
        return [
            <ion-content class="page-about">
                <app-header />


                <div class="hero">
                    <lazy-image src="/assets/images/about/about-full.jpg" class="hero-bg" alt="background image" />
                    <section class="section">
                        <div class="cta">
                            <h1 class="title">ABOUT APT212</h1>
                            <p class="subtitle">#1 Source for New York furnished apartments.</p>
                        </div>
                    </section>
                </div>

                <section class="section">
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
                        <lazy-image src="/assets/images/about/iphone.png" />
                    </div>


                </div>

                <hr />

                <div class="story-wrapper">
                <div class="image">
                        <lazy-image src="/assets/images/about/shape.png" />
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
                            <lazy-image src="/assets/images/about/adrian.jpg" />
                        </div>
                        <div class="person">
                            <lazy-image src="/assets/images/about/adrian.jpg" />
                        </div>
                        <div class="person">
                            <lazy-image src="/assets/images/about/adrian.jpg" />
                        </div>
                        <div class="person">
                            <lazy-image src="/assets/images/about/adrian.jpg" />
                        </div>
                    </div>

                    <div class="people">
                        <div class="person">
                            <lazy-image src="/assets/images/about/adrian.jpg" />
                        </div>
                        <div class="person">
                            <lazy-image src="/assets/images/about/adrian.jpg" />
                        </div>
                        <div class="person">
                            <lazy-image src="/assets/images/about/adrian.jpg" />
                        </div>
                        <div class="person">
                            <lazy-image src="/assets/images/about/adrian.jpg" />
                        </div>
                    </div>

                    <div class="people">
                        <div class="person">
                            <lazy-image src="/assets/images/about/adrian.jpg" />
                        </div>
                        <div class="person">
                            <lazy-image src="/assets/images/about/adrian.jpg" />
                        </div>
                        <div class="person">
                            <lazy-image src="/assets/images/about/adrian.jpg" />
                        </div>
                        <div class="person">
                            <lazy-image src="/assets/images/about/adrian.jpg" />
                        </div>
                    </div>
                </div>

                    <div class="edge-wrapper">
                        <h2>Our Edge</h2>
                        <div class="edge">

                            <div class="row">

                                <lazy-image src="/assets/images/about/flexibility.png" />
                                <h3>Flexible Lease Terms</h3>
                                <p>
                                    No need to commit to a long-term lease. APT212 offers 30-day minimum lease term for furnished units - a rare find in New York City.
                                </p>
                            </div>
                            <div class="row">
                                <lazy-image src="/assets/images/about/flexibility.png" />
                                <h3>Accuracy</h3>
                                    <p>
                                        No need to commit to a long-term lease. APT212 offers 30-day minimum lease term for furnished units - a rare find in New York City.
                                    </p>
                            </div>

                        </div>
                        <div class="edge">
                            <div class="row">
                                <lazy-image src="/assets/images/about/flexibility.png" />
                                <h3>Flexible Lease Terms</h3>
                                <p>
                                    No need to commit to a long-term lease. APT212 offers 30-day minimum lease term for furnished units - a rare find in New York City.
                                </p>
                            </div>
                            <div class="row">
                            <lazy-image src="/assets/images/about/flexibility.png" />
                                <h3>Accuracy</h3>
                                <p>
                                    No need to commit to a long-term lease. APT212 offers 30-day minimum lease term for furnished units - a rare find in New York City.
                                </p>
                            </div>

                        </div>
                        <div class="edge">
                            <div class="row">
                                <lazy-image src="/assets/images/about/flexibility.png" />
                                <h3>Flexible Lease Terms</h3>
                                <p>
                                    No need to commit to a long-term lease. APT212 offers 30-day minimum lease term for furnished units - a rare find in New York City.
                                </p>
                            </div>
                            <div class="row">
                                <lazy-image src="/assets/images/about/flexibility.png" />
                                <h3>Accuracy</h3>
                                <p>
                                    No need to commit to a long-term lease. APT212 offers 30-day minimum lease term for furnished units - a rare find in New York City.
                                </p>
                            </div>

                        </div>
                    </div>

            </section>
            <app-footer />


            </ion-content>
        ];
    }

}
