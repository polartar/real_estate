import { Component, h, State } from '@stencil/core';
import { ModalService } from '../../../services/modal.service';
import serialize from 'form-serialize';
import { LoadingService } from '../../../services/loading.service';
import { ToastService } from '../../../services/toast.service';
import { APIBookingService } from '../../../services/api/booking';

@Component({
  tag: 'page-booking',
  styleUrl: 'page-booking.scss'
})
export class PageBooking {
  @State() authorized: boolean = false;

  form: HTMLFormElement;

  async handleSubmit(e) {
    e.preventDefault();

    const results = serialize(this.form, { hash: true, empty: true });

    await LoadingService.showLoading();

    try {
        await APIBookingService.checkPassword(results);

        this.authorized = true;
    } catch (err) {
        ToastService.error(err.message);
    }

    await LoadingService.hideLoading();
  }

  render() {

    return [
      <ion-content class="page-booking">
        <app-header-home />

        <section class="page-booking-body">
          <div class="section payment-section-wrapper">
            <div class="payment-hero flex">
              <div class="payment-content-wrapper">

                {
                  this.authorized ?
                  <div class="payment-cta">
                    <h1 class="title">Wire Details</h1>

                    <ul class="payment-cta-list">
                      <li><strong>Account Name</strong>: APT212</li>
                      <li><strong>Account #</strong> 616008915</li>
                      <li><strong>Routing #</strong> 021000021</li>
                      <li><strong>Swift Code*</strong> CHASUS33* only for international wires</li>
                    </ul>

                    <p class="text-center">We are currently only accepting <b>Wire Transfers.</b><br></br> ACH Payments and CASH are not accepted.</p>

                    <h3 class="center">Questions About Payments?</h3>

                    <button class="white" onClick={() => ModalService.contactUs() }>Contact Us</button>

                  </div>

                  :

                  <div class="payment-cta-form">
                    <h1 class="title">Secure Online Payment</h1>

                    <form onSubmit={e => this.handleSubmit(e)} ref={el => this.form = el as HTMLFormElement }>
                      <div class="input">
                          <label htmlFor="booking-password" class="sr-only">Password</label>
                          <input id="booking-password" type="password" class="apt212-input block" placeholder="Enter Password" name="password" />
                      </div>
                    </form>

                    <p>
                    Payment online are made via wire transfers.<br />
                    Please obtain a password from the Agent you are working with
                    or email <a href="mailto=info@apt212.com">info@apt212.com</a> to get one.
                    </p>
                  </div>
                }

              </div>
            </div>
          </div>


        </section>

        <app-footer />

      </ion-content>
    ];
  }
}
