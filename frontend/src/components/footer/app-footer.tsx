import { Component, h, State, Prop} from '@stencil/core';
import { RouterService } from '../../services/router.service';
import isNumber from 'is-number';
import { ToastService } from '../../services/toast.service';

@Component({
  tag: 'app-footer',
  styleUrl: 'app-footer.scss'
})
export class AppFooter {
  @State() year: number = 2019;
  @Prop() noMargin: boolean = false;

  webidInput: HTMLInputElement;

  componentDidLoad() {
    let dt = new Date();
    this.year = dt.getFullYear();
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleWebIDSearch(e) {
    e.preventDefault();

    if (!this.webidInput.value) {
      return;
    }

    if (!isNumber(this.webidInput.value)) {
      ToastService.error('Webid must be a number');
      return;
    }

    RouterService.forward(`/listing/${this.webidInput.value}`);
  }

  render() {
    return [
      <footer class={{'app-footer': true, 'no-margin': this.noMargin}}>
        <div class="section">
          <div class="footer-wrapper">
            <div class="footer-col footer-left">
              <div class="footer-links">
                <div class="links-left">
                 <ion-router-link href={ RouterService.getRoute('search') }>Search Apartments</ion-router-link>
                  <ion-router-link href="/booking">Bookings</ion-router-link>
                  <ion-router-link href="/faq">FAQ</ion-router-link>
                  <ion-router-link href="/about">What is Apt212?</ion-router-link>
                  <ion-router-link href="/coming-soon">List with us</ion-router-link>
                  <ion-router-link href="/referral">Referrals</ion-router-link>
                  
                </div>
                <div class="links-right">
                <ion-router-link href="/neighborhoods">Neighborhoods</ion-router-link>
                  <ion-router-link href="/private-rooms">Private Rooms</ion-router-link>
                  <ion-router-link href="/brokers">Corporate Accounts</ion-router-link>
                  <ion-router-link href="/careers">Careers</ion-router-link>
                  <ion-router-link href="http://apt212.asuscomm.com">APT212 blog</ion-router-link>
                  <ion-router-link href="/privacy">Privacy Policy</ion-router-link>
                  
                </div>
              </div>
            </div>
            <div class="footer-col footer-center">

            </div>
            <div class="footer-col footer-right">
              <form onSubmit={e => this.handleSubmit(e)} novalidate class="dark">
                <p>Sign up for offers, updates, and more</p>
                <div class="input">
                  <label htmlFor="signup-email">Email</label>
                  <input type="email" name="email" placeholder="Email Address" id="signup-email" class="block" />
                  <p class="help-text">
                    By submitting this form, you are consenting to receive marketing emails from: APT212.  You can revoke your consent to receive emails at any time by using the SaveUnsubscribe&reg; link found at the bottom of every email.  Emails are serviced by Constant Contact.
                  </p>
                </div>

                <div class="input">
                  <input type="submit" value="SIGN UP" class="button-light block" />
                </div>
              </form>

              <form onSubmit={e => this.handleWebIDSearch(e)} novalidate class="dark">
                <div class="input">
                  <label htmlFor="web-id-search" class="sr-only">Web ID</label>
                  <input type="text" placeholder="WEB ID" name="webID" class="input-webid block" id="web-id-search" ref={el => this.webidInput = el as HTMLInputElement }/>
                  <svg onClick={(e) => this.handleWebIDSearch(e) } class="webid-icon" viewBox="0 0 25 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path d="M24,21.1886008 L18.6803754,15.9186997 C19.949079,14.3099652 20.6588954,12.3179013 20.6588954,10.238277 C20.6588954,5.14393658 16.472729,1 11.3303363,1 C6.18621089,1 2,5.14393658 2,10.238277 C2,15.3308573 6.18616646,19.4765539 11.3303363,19.4765539 C13.3071236,19.4765539 15.2318387,18.8457674 16.8196842,17.7010588 L22.1704099,23 L24,21.1886008 Z M11.3302919,16.9140717 C7.61273046,16.9140717 4.58934605,13.9182757 4.58934605,10.238365 C4.58934605,6.55849823 7.61268603,3.56265825 11.3302919,3.56265825 C15.0461205,3.56265825 18.0694605,6.55845423 18.0694605,10.238365 C18.0694605,12.2063608 17.1982293,14.0643123 15.6796059,15.3379854 C14.4664401,16.3537734 12.9218251,16.9140717 11.3302919,16.9140717 Z" fill="#5d5d5d"></path></g></svg>
                </div>
              </form>
            </div>
          </div>

          <div class="footer-wrapper">
            <div class="footer-col footer-left">
              <div class="copyright">
                <ion-router-link href="/" class="logo-link">
                  <lazy-image src="/assets/images/logo-white.svg" class="logo" alt="APT212 logo" />
                </ion-router-link>
                <p class="no-margin">
                  <strong>#1 SOURCE</strong> FOR NEW YORK FURNISHED APARTMENTS<br />
                  &copy;{this.year} APT212 INC. All Rights Reserved.
                </p>
              </div>
            </div>
            <div class="footer-col footer-center">

            </div>
            <div class="footer-col footer-right">
              <div class="social-media">
                <a href="https://www.facebook.com/Apt212/" target="_blank" rel="noopener">
                  <lazy-image src="/assets/images/icons/social-media/facebook-square.svg" alt="Facebook" />
                </a>

                <a href="https://twitter.com/apt212" target="_blank" rel="noopener">
                  <lazy-image src="/assets/images/icons/social-media/twitter.svg" alt="Twitter" />
                </a>

                <a href="https://www.instagram.com/apt212/" target="_blank" rel="noopener">
                  <lazy-image src="/assets/images/icons/social-media/instagram.svg" alt="Instagram" />
                </a>

                <a href="https://youtube.com/c/APT212NewYork" target="_blank" rel="noopener">
                  <lazy-image src="/assets/images/icons/social-media/youtube.svg" alt="Youtube" />
                </a>
              </div>

              <div class="contact">
                Contact Us: <a href="mailto:info@apt212.com">info@apt212.com</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    ];
  }
}
