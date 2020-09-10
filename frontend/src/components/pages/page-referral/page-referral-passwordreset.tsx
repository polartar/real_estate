import { Component, h } from '@stencil/core';
import { RouterService } from '../../../services/router.service';

@Component({
  tag: 'page-referral-passwordreset',
  styleUrl: 'page-referral.scss',
})
export class PageReferral {
  render() {
    return [
      <ion-content>
        <app-header />

        <div class='page-referral'>
          <section class='section hero'>
            <div class='left-body'>
              <div class='cta'>
                <h3>REFER A FRIEND &amp; EARN $200!</h3>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled

                  <br />

                  <br />
                  
                  it to make a type specimen book. It has survived not only five
                  centuries, but also the leap into electronic typesetting,
                  remaining essentially unchanged. It was popularised in the
                  1960s with the release of Letraset
                </p>

                <p>
                  <ion-router-link href={RouterService.getRoute('privacy')}>
                    <span class='underline'> Terms and Conditions </span>

                    <img src='/assets/images/arrow.png' />
                  </ion-router-link>
                </p>
              </div>
            </div>

            <div class='right-body'>
              <div class='form'>
                <referral-passwordreset-form />
              </div>
            </div>
          </section>
        </div>

        <app-footer />
      </ion-content>,
    ];
  }
}
