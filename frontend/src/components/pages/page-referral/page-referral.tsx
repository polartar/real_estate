import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-referral',
  styleUrl: 'page-referral.scss'
})
export class PageReferral {
  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return [
      <app-header />,
        <ion-content class="page-referral">

          <section class="section hero">
                <div class="cta">

                  <h1>REFER A FRIEND &amp; EARN $200!</h1>

                  <p class="subtitle">
                    Know someone who is looking for a short-term, furnished apartment in New York City?
                    <br /><br />
                    For every referral that books with APT212, we'll send you a $200 gift card.  It's simple, just fill out the form below and we'll do the rest.
                  </p>

                  <h2>WHY RENT WITH US?</h2>

                  <p>
                    Apt212 makes finding a furnished short-term rental easy. Our secure booking platform brings the entire rental process online, from searching inventory to signing a lease.
                    <br /><br />
                    A team of local booking agents is available ot help 24/7 if you need any assistance along the way.  We work only with verified landlords and hosts. No credit checks, tax returns, or guarantors required.  It's that simple!
                  </p>

                </div>

                <div>
                  <div class="form">
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                      <h3>YOUR INFORMATION</h3>

                      <div class="input">
                        <label htmlFor="referrer-name" class="sr-only">Name</label>

                        <input id="referrer-name" type="text" class="apt212-input block" placeholder="Name" name="referrer_name" />
                      </div>

                      <div class="input">
                        <label htmlFor="referrer-phone" class="sr-only">Phone Number (Optional)</label>

                        <input id="referrer-phone" type="text" class="apt212-input block" placeholder="Phone Number (Optional)" name="referrer_phone" />
                      </div>

                      <div class="input">
                        <label htmlFor="referrer-email" class="sr-only">Email Address</label>

                        <input id="referrer-email" type="text" class="apt212-input block" placeholder="Email Address" name="referrer_email" />
                      </div>

                      <h3>REFERRAL's INFORMATION</h3>

                      <div class="input">
                        <label htmlFor="referral-name" class="sr-only">Referral Name</label>

                        <input id="referral-name" type="text" class="apt212-input block" placeholder="Referral Name" name="referral_name" />
                      </div>

                      <div class="input">
                        <label htmlFor="referral-phone" class="sr-only">Referral Phone Number (Optional)</label>

                        <input id="referral-phone" type="text" class="apt212-input block" placeholder="Referral Phone Number (Optional)" name="referral_phone" />
                      </div>

                      <div class="input">
                        <label htmlFor="referral-email" class="sr-only">Referral Email Address</label>

                        <input id="referral-email" type="text" class="apt212-input block" placeholder="Referral Email Address" name="referral_email" />
                      </div>

                      <div class="input">
                        <input type="submit" class="button-dark block" value="SUBMIT" />
                      </div>
                    </form>
                  </div>
                </div>

          </section>

          <app-footer />
        </ion-content>
    ];
  }
}
