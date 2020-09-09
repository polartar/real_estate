import { Component, h, State } from '@stencil/core';
import serialize from 'form-serialize';
import Isemail from 'isemail';
import { LoadingService } from '../../../services/loading.service';
import { ToastService } from '../../../services/toast.service';
import { APIBookingService } from '../../../services/api/booking';
import { RouterService } from '../../../services/router.service';

@Component({
  tag: 'referral-signin-form',
  styleUrl: 'referral-form.scss',
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
      await APIBookingService.signupReferer(results);

      this.submitted = true;
    } catch (err) {
      ToastService.error(err.message);
    }

    await LoadingService.hideLoading();
  }

  checkErrors(results) {
    const errors = [];

    let required = ['email', 'password'];

    required.forEach((r) => {
      if (!results[r]) {
        errors.push(r);
      }
    });
    if (results.email && !Isemail.validate(results.email)) {
      errors.push('email');
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
          <div class='title'>Sign In</div>

          <div class='subtitle'>
            <span class='grey'>New User? </span>{' '}

            <ion-router-link
              href={RouterService.getRoute('referral')}
              class='white'
            >
              Sign Up
            </ion-router-link>
          </div>

          <div
            class={{
              input: true,
              error: this.errors.includes('email'),
            }}
          >
            <div class='label'>Email Address</div>

            <input
              id='email'
              type='email'
              class='apt212-input block'
              name='email'
            />
          </div>

          <div
            class={{
              input: true,
              error: this.errors.includes('password'),
            }}
          >
            <div class='label'>Password</div>

            <input
              id='password'
              type='password'
              class='apt212-input block'
              name='password'
            />
          </div>

          <div class='label'>
            <span class='grey'>Forgot Password? </span>
            
            <ion-router-link
              href={RouterService.getRoute('referral')}
              class='white'
            >
              Restore
            </ion-router-link>
          </div>

          <div class='input'>
            <input type='submit' class='button-dark block' value='Sign In' />
          </div>
        </div>

        {this.submitted ? (
          <div class='thank-you-msg flex-vertical-center text-center'>
            <div>
              <p>
                Thank you. <br />
                Your referral has now been sent.
              </p>

              <ion-icon name='md-checkmark' />
            </div>
          </div>
        ) : null}
      </form>
    );
  }
}
