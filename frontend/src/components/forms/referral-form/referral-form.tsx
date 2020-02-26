import { Component, h, State } from '@stencil/core';
import serialize from 'form-serialize';
import Isemail from 'isemail';
import { LoadingService } from '../../../services/loading.service';
import { ToastService } from '../../../services/toast.service';
import { APIBookingService } from '../../../services/api/booking';

@Component({
  tag: 'referral-form',
  styleUrl: 'referral-form.scss'
})
export class ReferralForm {
  @State() submitted: boolean = false;
  @State() errors: string[] = [];

  form: HTMLFormElement;

  async handleSubmit(e) {
    e.preventDefault();

    const results = serialize(this.form, { hash: true, empty: true });

    this.checkErrors(results);

    if (this.errors.length) {
      return;
    }

    await LoadingService.showLoading();

    try {
      await APIBookingService.sendReferral(results);

      this.submitted = true;
    } catch (err) {
      ToastService.error(err.message);
    }

    await LoadingService.hideLoading();
  }

  checkErrors(results) {
    const errors = [];

    let required = ['referrer_name', 'referrer_email', 'referral_name', 'referral_email'];

    required.forEach(r => {
      if (!results[r]) {
        errors.push(r);
      }
    });

    if (results.referrer_email && !Isemail.validate(results.referrer_email)) {
      errors.push('referrer_email');
    }

    if (results.referral_email && !Isemail.validate(results.referral_email)) {
      errors.push('referral_email');
    }

    this.errors = errors;
  }

  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)} class="referral-form-component" ref={el => this.form = el as HTMLFormElement }>
        <div class={{ 'form-content': true, submitted: this.submitted }}>
          <h3>YOUR INFORMATION</h3>

          <div class={{ input: true, error: this.errors.includes('referrer_name')}}>
            <label htmlFor="referrer-name" class="sr-only">Name</label>

            <input id="referrer-name" type="text" class="apt212-input block" placeholder="Name" name="referrer_name" />
          </div>

          <div class={{ input: true, error: this.errors.includes('referrer_phone')}}>
            <label htmlFor="referrer-phone" class="sr-only">Phone Number (Optional)</label>

            <input id="referrer-phone" type="text" class="apt212-input block" placeholder="Phone Number (Optional)" name="referrer_phone" />
          </div>

          <div class={{ input: true, error: this.errors.includes('referrer_email')}}>
            <label htmlFor="referrer-email" class="sr-only">Email Address</label>

            <input id="referrer-email" type="email" class="apt212-input block" placeholder="Email Address" name="referrer_email" />
          </div>

          <h3>REFERRAL's INFORMATION</h3>

          <div class={{ input: true, error: this.errors.includes('referral_name')}}>
            <label htmlFor="referral-name" class="sr-only">Referral Name</label>

            <input id="referral-name" type="text" class="apt212-input block" placeholder="Referral Name" name="referral_name" />
          </div>

          <div class={{ input: true, error: this.errors.includes('referral_phone')}}>
            <label htmlFor="referral-phone" class="sr-only">Referral Phone Number (Optional)</label>

            <input id="referral-phone" type="text" class="apt212-input block" placeholder="Referral Phone Number (Optional)" name="referral_phone" />
          </div>

          <div class={{ input: true, error: this.errors.includes('referral_email')}}>
            <label htmlFor="referral-email" class="sr-only">Referral Email Address</label>

            <input id="referral-email" type="email" class="apt212-input block" placeholder="Referral Email Address" name="referral_email" />
          </div>

          <div class="input">
            <input type="submit" class="button-dark block" value="SUBMIT" />
          </div>
        </div>

        {
          this.submitted ?
            <div class="thank-you-msg flex-vertical-center text-center">
              <div>
                <p>
                  Thank you. <br />
                  Your referral has now been sent.
                </p>

                <ion-icon name="md-checkmark" />
              </div>
            </div>
          : null
        }
      </form>
    )
  }
}
