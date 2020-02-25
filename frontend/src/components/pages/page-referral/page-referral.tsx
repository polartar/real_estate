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
                    <referral-form />
                  </div>
                </div>

          </section>

          <app-footer />
        </ion-content>
    ];
  }
}
