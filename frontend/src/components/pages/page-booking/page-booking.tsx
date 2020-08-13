import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'page-booking',
  styleUrl: 'page-booking.scss'
})
export class PageBooking {

  @State() isMobile: boolean = true;

  render() {

    return [
      <app-header hide-search />,
      <ion-content class="page-booking">

        <section class="page-booking-body">
          <div class="payment-section-wrapper">


            <div class="payment-bg-mask" />

            <div class={{ section: !this.isMobile }}>
            <div class="payment-hero flex">
              <div class="payment-content-wrapper">

                <div class="payment-cta">
                  <h1 class="title">Wire Details</h1>

                  <ul class="payment-cta-list">
                    <li>Account Name: APT212</li>
                    <li>Account # 616008915</li>
                    <li>Routing # 021000021</li>
                    <li>Swift Code* CHASUS33* only for international wires</li>
                  </ul>

                  <p>We are currently only accepting <b>Wire Transfers.</b><br></br> ACH Payments and CASH are not accepted.</p>

                  <h3 class="center">Questions About Payments?</h3>

                  <p class="center">Reach out to us and let us help</p>

                  <a href="/contact" class="contact">
                    <button class="white">Contact Us</button>
                  </a>

                </div>
              </div>
            </div>
            </div>
          </div>


        </section>

        <app-footer />

      </ion-content>
    ];
  }
}
