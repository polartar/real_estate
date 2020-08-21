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
                      <li>Account Name: APT212</li>
                      <li>Account # 616008915</li>
                      <li>Routing # 021000021</li>
                      <li>Swift Code* CHASUS33* only for international wires</li>
                    </ul>

                    <p class="text-center">We are currently only accepting <b>Wire Transfers.</b><br></br> ACH Payments and CASH are not accepted.</p>

                    <h3 class="center">Questions About Payments?</h3>

                    <p class="center">Reach out to us and let us help</p>

                    <button class="white" onClick={() => ModalService.contactUs() }>Contact Us</button>

                  </div>

                  :

                  <div class="payment-cta-form">
                    <p class="text-center" style={{'padding-top': '50px'}}>
                      Our new booking portal is still under construction.
                    </p>
                    <p class="text-center">
                      The new and improved booking portal will integrate the full rental experience.
                    </p>
                    <p class="text-center">
                      We expect to launch the portal very soon, check back soon for updates!
                    </p>

                    <form onSubmit={e => this.handleSubmit(e)} ref={el => this.form = el as HTMLFormElement }>
                      <div class="input input-inline">                       
                          <label htmlFor="booking-password">Password</label>
                          <input id="booking-password" type="password" class="apt212-input block" name="password" />
                      </div>

                      <div class="input text-right">
                            <input type="submit" class="button-light" value="SUBMIT" />
                        </div>
                    </form>
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
