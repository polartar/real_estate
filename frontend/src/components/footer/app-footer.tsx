import { Component, h, State} from '@stencil/core';

@Component({
  tag: 'app-footer',
  styleUrl: 'app-footer.scss'
})
export class AppFooter {
  @State() year: number = 2019;

  componentDidLoad() {
    let dt = new Date();
    this.year = dt.getFullYear();
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(e);
  }

  render() {
    return [
      <footer class="app-footer">
        <div class="section">
          <div class="footer-wrapper">
            <div class="footer-col footer-left">
              <div class="footer-links">
                <div class="links-left">
                  <ion-router-link href="/bookings">Bookings</ion-router-link>
                  <ion-router-link href="/faq">FAQ</ion-router-link>
                  <ion-router-link href="/about">About</ion-router-link>
                  <ion-router-link href="/neighborhoods">Neighborhoods</ion-router-link>
                  <ion-router-link href="/private-rooms">Private Rooms</ion-router-link>
                </div>
                <div class="links-right">
                  <ion-router-link href="/brokers">Brokers</ion-router-link>
                  <ion-router-link href="/careers">Careers</ion-router-link>
                  <ion-router-link href="/blog">APT212 blog</ion-router-link>
                  <ion-router-link href="/referrals">Referrals</ion-router-link>
                </div>
              </div>
            </div>
            <div class="footer-col footer-center">

            </div>
            <div class="footer-col footer-right">
              <form onSubmit={e => this.handleSubmit(e)} novalidate class="dark">
                <p>Sign up for offers, updates, and more</p>
                <div class="input">
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" placeholder="Email Address" />
                  <p class="help-text">
                    By submitting this form, you are consenting to receive marketing emails from: APT212.  You can revoke your consent to receive emails at any time by using the SaveUnsubscribe&reg; link found at the bottom of every email.  Emails are serviced by Constant Contact.
                  </p>
                </div>

                <div class="input">
                  <input type="submit" value="SIGN UP" class="button-light" />
                </div>
              </form>

              <form onSubmit={e => this.handleSubmit(e)} novalidate class="dark">
                <div class="input">
                  <input type="text" placeholder="WEB ID" name="webID" class="input-webid" />
                  <svg class="webid-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" stroke="black" stroke-width="3" fill="transparent"></circle><line stroke="black" stroke-width="3" x1="24" x2="16.65" y1="24" y2="16.65"></line></svg>
                </div>
              </form>
            </div>
          </div>

          <div class="footer-wrapper">
            <div class="footer-col footer-left">
              <div class="copyright">
                <ion-router-link href="/" class="logo-link">
                  <img src="/assets/images/logo-white.svg" class="logo"></img>
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
                <a href="https://www.facebook.com/Apt212/" target="_blank">
                  <lazy-image src="/assets/images/icons/social-media/facebook-square.svg" alt="Facebook" />
                </a>

                <a href="https://twitter.com/apt212" target="_blank">
                  <lazy-image src="/assets/images/icons/social-media/twitter.svg" alt="Twitter" />
                </a>

                <a href="https://google.com/+APT212NewYork" target="_blank">
                  <lazy-image src="/assets/images/icons/social-media/instagram.svg" alt="Instagram" />
                </a>

                <a href="https://youtube.com/c/APT212NewYork" target="_blank">
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
