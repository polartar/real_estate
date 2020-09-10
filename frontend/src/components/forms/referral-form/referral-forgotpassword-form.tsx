import { Component, h, State } from '@stencil/core';
import serialize from 'form-serialize';
import Isemail from 'isemail';
import { LoadingService } from '../../../services/loading.service';
import { ToastService } from '../../../services/toast.service';
import { APIBookingService } from '../../../services/api/booking';

@Component({
  tag: 'referral-forgotpassword-form',
  styleUrl: 'referral-form.scss',
})
export class ReferralForgotPasswordForm {

  @State() submitted: boolean = false;
  @State() errors: string[] = [];
  @State() loading: boolean = false;

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
      await APIBookingService.forgotPassword(results);
    } catch (err) {
      ToastService.error(err.message);
    }

    await LoadingService.hideLoading();
  }

  checkErrors(results) {
    const errors = [];

    let required = ['email'];

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
          <div class='title'>Forgot Password</div>

          <div
            class={{
              input: true,
              error: this.errors.includes('email'),
            }}
          >
           <label class='label' htmlFor="email">Email Address</label>

            <input
              id='email'
              type='email'
              class='apt212-input block'
              name='email'
            />
          </div>

          <div class='input'>
            <input type='submit' class='button-dark block' value='Send Password Reset Link' disabled={this.loading}/>
          
          </div>
        </div>

       
      </form>
    );
  }
}
