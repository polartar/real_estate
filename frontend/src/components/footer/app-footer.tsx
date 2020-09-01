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
  @State() expandPages: boolean = false;
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
          <div class="hr" />

          <div class="footer-wrapper first">
            <div class="footer-col footer-left">
              <div class="footer-links">
                <div class="links-left">
                  <ion-router-link href={ RouterService.getRoute('search') }>Furnished Apartments</ion-router-link>
                  <ion-router-link href={ RouterService.getRoute('coming-soon') }>Rentals</ion-router-link>
                  <ion-router-link href={ RouterService.getRoute('coming-soon') }>Sales</ion-router-link>
                  <ion-router-link href={ RouterService.getRoute('coming-soon') }>Investments</ion-router-link>

                  <ion-router-link href={ RouterService.getRoute('privacy') } class="skinny first">Privacy</ion-router-link>
                  <ion-router-link href={ RouterService.getRoute('coming-soon') } class="skinny">Sitemap</ion-router-link>
                  <ion-router-link href={ RouterService.getRoute('faq') } class="skinny">FAQ</ion-router-link>
                </div>
                <div class="links-right">
                  <ion-router-link href="javascript:void(0)" class="explore-more" onClick={() => { this.expandPages = !this.expandPages; } }>
                    Explore more
                    <ion-icon mode="md" name="md-arrow-dropdown" class={{ 'expand-indicator': true, 'expanded': this.expandPages }}></ion-icon>
                  </ion-router-link>

                  <div class={{'explore-more': true, expanded: this.expandPages }}>
                    <ion-router-link href={ RouterService.getRoute('coming-soon') }>Agents</ion-router-link>
                    <ion-router-link href={ RouterService.getRoute('booking') }>Bookings</ion-router-link>
                    <ion-router-link href={ RouterService.getRoute('referral') }>Referrals</ion-router-link>
                    <ion-router-link href={ RouterService.getRoute('neighborhoods') }>Neighborhood Guide</ion-router-link>
                    <ion-router-link href={ RouterService.getRoute('private-rooms') }>Private Rooms</ion-router-link>
                    <ion-router-link href={ RouterService.getRoute('corporate-rooms')}>Corporate Accounts</ion-router-link>
                    <ion-router-link href={ RouterService.getRoute('blog') }>APT212 blog</ion-router-link>
                  </div>
                </div>
              </div>
            </div>
            <div class="footer-col footer-right">
              <form onSubmit={e => this.handleSubmit(e)} novalidate class="dark">
                <p>Sign up for offers, updates, and more</p>
                <div class="input">
                  <label htmlFor="signup-email" class="sr-only">Email</label>
                  <input type="email" name="email" placeholder="Email Address" id="signup-email" class="block" autocomplete="off" />
                  <input type="submit" value="Sign Up" class="submit-inline" />
                </div>
              </form>

              <form onSubmit={e => this.handleWebIDSearch(e)} novalidate class="dark">
                <div class="input">
                  <label htmlFor="web-id-search" class="sr-only">Web ID</label>
                  <input type="text" placeholder="Search By Web ID" name="webID" class="input-webid block" id="web-id-search" autocomplete="off" ref={el => this.webidInput = el as HTMLInputElement }/>

                  <button type="submit" value="Sign Up" class="reset submit-inline" onClick={(e) => this.handleWebIDSearch(e) }>
                    <svg class="webid-icon" viewBox="0 0 25 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path d="M24,21.1886008 L18.6803754,15.9186997 C19.949079,14.3099652 20.6588954,12.3179013 20.6588954,10.238277 C20.6588954,5.14393658 16.472729,1 11.3303363,1 C6.18621089,1 2,5.14393658 2,10.238277 C2,15.3308573 6.18616646,19.4765539 11.3303363,19.4765539 C13.3071236,19.4765539 15.2318387,18.8457674 16.8196842,17.7010588 L22.1704099,23 L24,21.1886008 Z M11.3302919,16.9140717 C7.61273046,16.9140717 4.58934605,13.9182757 4.58934605,10.238365 C4.58934605,6.55849823 7.61268603,3.56265825 11.3302919,3.56265825 C15.0461205,3.56265825 18.0694605,6.55845423 18.0694605,10.238365 C18.0694605,12.2063608 17.1982293,14.0643123 15.6796059,15.3379854 C14.4664401,16.3537734 12.9218251,16.9140717 11.3302919,16.9140717 Z" fill="#5d5d5d"></path></g></svg>
                  </button>
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

                <lazy-image src="/assets/images/live-play-new-york.png" alt="Live Play New York" class="lpny" />
                <p>
                  &copy;{this.year} All Rights Reserved.
                </p>
              </div>
            </div>

            <div class="footer-col footer-right align-bottom">
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

                <a href="https://www.rebny.com/" target="_blank" rel="noopener">
                  <lazy-image src="/assets/images/icons/rebny.png" alt="REBNY" class="rebny" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    ];
  }
}
