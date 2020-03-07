import { Component, h, Prop, State } from '@stencil/core';
import { Store } from '@stencil/redux';
import { EnvironmentConfigService } from '../../../services/environment/environment-config.service';
import bookingSelectors from '../../../store/selectors/booking';
import sizeSelectors from '../../../store/selectors/screensize';
import Debounce from 'debounce-decorator';

@Component({
  tag: 'page-booking',
  styleUrl: 'page-booking.scss'
})
export class PageBooking {
  @Prop({ context: "store" }) store: Store;

  @State() details: any = null;
  @State() faqItem: number = 1;
  @State() isMobile: boolean = true;

  scrollContent: HTMLIonContentElement;
  mobileBookingCTA: HTMLElement;

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        details: bookingSelectors.getBookingDetails(state),
        isMobile: sizeSelectors.getIsMobile(state)
      }
    });

    const rel: any = document.querySelector('link[rel="canonical"]');
    if (rel) {
      rel.setAttribute('href', EnvironmentConfigService.getInstance().get('BASE_URL') + '/booking');
    }
  }

  toggleFAQ(num) {
    if (this.faqItem === num) {
      this.faqItem = 0;
    }
    else {
      this.faqItem = num;
    }
  }

  @Debounce(100)
  bookingScroll(e) {
    if (e.detail.scrollTop > 400) {
      this.mobileBookingCTA.classList.add('active');
    } else {
      this.mobileBookingCTA.classList.remove('active');
    }
  }

  render() {

    const faqQuestions = [
      {
        question: 'What credit/debit cards are accepted?',
        answer: 'We accept Visa / Mastercard / American Express / Discover credit cards and all debit cards'
      },
      {
        question: 'Is there a cost for paying via debit card?',
        answer: 'Debit cards have a $3.00 service charge per transaction.'
      },
      {
        question: 'Is there a cost for paying via credit card?',
        answer: 'Credit cards have a 3% service charge per transaction to cover the fees that are incurred to process your payment.'
      },
      {
        question: 'Is there a cost for ACH/Wire payment?',
        answer: 'No! All ACH/Wire Payments are 100% free.'
      },
      {
        question: 'If I have a roommate, can we split our rent or deposit payments?',
        answer: 'Yes! Roommates can pay their individual portion of the rent/deposit instead of having to send the full amount in one payment!'
      },
      {
        question: 'If my application is not approved, is my deposit refundable?',
        answer: 'Yes! All deposits are 100% refundable if your application is denied or rejected.'
      },
      {
        question: 'Do you store my credit card / wire information after my payment is made?',
        answer: 'No! All payments are made through either Plaid or Stripes Secure gateways. No payment information is stored by APT212 or any of its affiliates!'
      }
    ];

    return [
      <app-header hide-search />,
      <ion-content
        class="page-booking"
        scrollEvents
        onIonScroll={e => this.bookingScroll(e)}
        ref={ el => this.scrollContent = el as HTMLIonContentElement }
      >

        <section class="page-booking-body">
          <div class="payment-section-wrapper">
            <lazy-image src="/assets/images/booking_hero1.png" class="payment-bg" alt="background-image" aria-label="" />

            <div class="payment-bg-mask" />

            <div class={{ section: !this.isMobile }}>
            <div class="payment-hero flex">
              <div class="payment-content-wrapper">

                <div class="payment-form-wrapper mobile">
                  <div class="payment-form">
                    <booking-form />
                  </div>
                </div>

                <div class="payment-cta">
                  <h1 class="title">Secure and easy online payments</h1>

                  <p>Use any debit / credit card or Direct ACH wire transfer to pay your rent or secure an apartment online today.  Quick, easy, &amp; secure process!</p>

                  <ul class="payment-cta-list">
                    <li>Debit / credit card payments are powered and secured by Stripe.</li>
                    <li>ACH Wire transfers are made through Plaid and are 100% free.</li>
                    <li>Reserve an apartment or submit your rent payment in just minutes!</li>
                    <li>No account creation needed.  Just fill in the required information, click, and pay!</li>
                  </ul>

                  <div class="flex-vertical-center cta-logos">
                    <img src="/assets/images/stripe.png" alt="Powered by Stripe" class="cta-logo" />
                    <img src="/assets/images/secure.png" alt="Secured" class="cta-logo" />
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>

          <div class="section">
            <div class="payment-content-wrapper payment-info">
              <h2>Stripe Online Payments</h2>

              <p class="sub-title">Stripe is a leading cloud payment platform designed to accept and manage your online transactions and is 100% safe and secure</p>

              <div class="payment-info-items">
                <div class="payment-info-item">
                  <h3>Secure Processing</h3>

                  <p>Stripe meets all Payment Card Industry Data Security Standards (PCI DSS)</p>
                </div>

                <div class="payment-info-item">
                  <h3>Data Security</h3>

                  <p>All information submitted through stripe is encrypted and will never be sold to third parties!</p>
                </div>

                <div class="payment-info-item">
                  <h3>A Name Brand You Can Trust</h3>

                  <p>Stripe processes for Lyft, Doordash, Under Armour, Docusign, Booking.com, and many more!</p>
                </div>

                <div class="payment-info-item">
                  <h3>Plaid- Wire/ACH Transfer</h3>

                  <p>Plaid is a trusted brand leader in software that allows consumers to make direct ACH and wire payments through their financial tech applications</p>
                </div>

                <div class="payment-info-item">
                  <h3>Plaid Security</h3>

                  <p>The Plaid API only allows client requests using strong TLS protocols and ciphers.<br />
                  Communication between Plaid infrastructure and financial institutions is transmitted over encrypted tunnels.</p>
                </div>

                <div class="payment-info-item">
                  <h3>Use Plaid for free!</h3>

                  <p>All wire and ACH transfers are 100% free</p>
                </div>
              </div>

              <lazy-image src="/assets/images/bank_cards.png" class="card-logos" />
              <lazy-image src="/assets/images/stripe_black.png" class="card-logos" />
              <lazy-image src="/assets/images/plaid_logo.png" class="card-logos" />
            </div>
          </div>

          <div class="payment-section-wrapper payment-faq">
            <lazy-image src="/assets/images/booking_hero2.png" class="payment-bg" alt="background-image" aria-label="" />

            <div class="payment-bg-mask" />

            <div class="payment-hero">
              <div class="section">
              <div class="payment-content-wrapper payment-faq-wrapper">
              {
                faqQuestions.map((q, index) =>
                  <div class="faq-item">
                    <div class="item">
                      <div class="question" onClick={() => this.toggleFAQ(index + 1)}>
                        {q.question}
                      </div>

                      {
                        this.faqItem === index + 1 ?
                          <div class="answer">
                            {q.answer}
                          </div>
                        : null
                      }
                    </div>

                    <div class="icon">
                      <button class="button-reset" aria-label="Toggle Answer" onClick={() => this.toggleFAQ(index + 1)}>
                        <ion-icon name={this.faqItem === index + 1 ? 'remove' : 'add'}></ion-icon>
                      </button>
                    </div>
                  </div>
                )
              }

                <div class="faq-cta">
                  <h2 class="faq-title">FAQ</h2>
                  <p>Have anymore questions?</p>

                  <ion-router-link class="button-light faq-link" href="/faq">
                    Frequently Asked Questions
                  </ion-router-link>
                </div>
              </div>
            </div>
            </div>
          </div>

          <div class="section">
          <div class="payment-content-wrapper payment-booking">
              <div class="title">
                The booking process
              </div>

              <div class="booking-process flex-vertical-center">
                <div class="icon">
                  <lazy-image src="/assets/images/icons/add.svg" />
                </div>

                Submit a payment of 1 month's rent to secure the apartment
              </div>

              <div class="booking-process flex-vertical-center">
                <div class="icon">
                  <lazy-image src="/assets/images/icons/application.svg" />
                </div>

                Fill out an online application
              </div>

              <div class="booking-process flex-vertical-center">
                <div class="icon">
                  <lazy-image src="/assets/images/icons/approved.svg" />
                </div>

                We will get you approved within 48 hours
              </div>

              <div class="booking-process flex-vertical-center">
                <div class="icon">
                  <lazy-image src="/assets/images/icons/sign_lease.svg" />
                </div>

                Sign a lease online
              </div>

              <div class="booking-process flex-vertical-center">
                <div class="icon">
                  <lazy-image src="/assets/images/icons/shield.svg" />
                </div>

                Pick up a key and check in
              </div>
          </div>
          </div>

          <div class="payment-form-wrapper desktop">
            <div class="payment-form">
              <booking-form />
            </div>
          </div>
        </section>

        <app-footer />

        <div class="mobile-booking-cta" ref={ el => this.mobileBookingCTA = el as HTMLElement }>
          <button class="button-dark block" onClick={() => this.scrollContent.scrollToTop(1500)}>
              BOOK NOW
          </button>
        </div>
      </ion-content>
    ];
  }
}
