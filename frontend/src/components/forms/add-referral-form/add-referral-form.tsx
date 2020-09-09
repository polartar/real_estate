import { Component, h, State } from '@stencil/core';
import serialize from 'form-serialize';
import Isemail from 'isemail';
import { LoadingService } from '../../../services/loading.service';
import { ToastService } from '../../../services/toast.service';
import { APIBookingService } from '../../../services/api/booking';

@Component({
  tag: 'add-referral-form',
  styleUrl: 'add-referral-form.scss',
})
export class AddReferralForm {
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
      await APIBookingService.signupReferer(results);

      this.submitted = true;
    } catch (err) {
      ToastService.error(err.message);
    }

    await LoadingService.hideLoading();
  }

  checkErrors(results) {
    const errors = [];

    let required = [
      'referral_name',
      'referral_phone',
      'referral_email',
      'referral_details',
      'referrer_agent',
    ];

    required.forEach((r) => {
      if (!results[r]) {
        errors.push(r);
      }
    });
    
    if (results.referral_email && !Isemail.validate(results.referral_email)) {
      errors.push('referral_email');
    }

    this.errors = errors;
  }

  render() {
    return (
      <form
        onSubmit={(e) => this.handleSubmit(e)}
        class='referral-form-component'
        ref={(el) => (this.form = el as HTMLFormElement)}
      >
        <div class={{ 'form-content': true, submitted: this.submitted }}>
          <div class='title'>Add New Referrral</div>
          
          <div
            class={{
              input: true,
              error: this.errors.includes('referral_name'),
            }}
          >
            <label class='label' htmlFor="referral_name">Referral Name</label>

            <input
              id='referral_name'
              type='text'
              class='apt212-input block'
              name='referral_name'
            />
          </div>

          <div
            class={{
              input: true,
              error: this.errors.includes('referral_phone'),
            }}
          >
            <label class='label' htmlFor="referral-phone">Referral Phone Number</label>
 
            <input
              id='referral-phone'
              type='text'
              class='apt212-input block'
              name='referral_phone'
            />
          </div>

          <div
            class={{
              input: true,
              error: this.errors.includes('referral_email'),
            }}
          >
            <label class='label' htmlFor="referral_email">Referral Email Address</label>

            <input
              id='referral_email'
              type='email'
              class='apt212-input block'
              name='referral_email'
            />
          </div>

          <div
            class={{
              input: true,
              error: this.errors.includes('referrer_agent'),
            }}
          >
            <label class='label' htmlFor="referrer_agent">Referral by Agent</label>

            <input
              id='referrer_agent'
              type='text'
              class='apt212-input block'
              name='referrer_agent'
            />
          </div>

          <div
            class={{
              input: true,
              error: this.errors.includes('referral_details'),
            }}
          >
            <label class='label' htmlFor="referral-details">Referral Details</label>

            <textarea
              id='referral-details'
              class='apt212-input block'
              name='referral_details'
            />
          </div>

          <div class='input'>
            <input type='submit' class='button-dark block' value='Submit' />
          </div>
        </div>
 
      </form>
    );
  }
}
