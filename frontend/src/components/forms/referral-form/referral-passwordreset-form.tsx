import { Component, h, State, Prop } from '@stencil/core';
import serialize from 'form-serialize';
import Isemail from 'isemail';
import { Store } from '@stencil/redux';
import { LoadingService } from '../../../services/loading.service';
import { ToastService } from '../../../services/toast.service';
import { APIBookingService } from '../../../services/api/booking';
import { RouterService } from '../../../services/router.service';

@Component({
  tag: 'referral-passwordreset-form',
  styleUrl: 'referral-form.scss',
})
export class ReferralPasswordResetForm {
  
  @Prop({ context: 'store' }) store: Store;
  @Prop() match: any;

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
    
    results.token = 'fa900f13b0d7216';

    await LoadingService.showLoading();

    try {
      await APIBookingService.resetPasswordReferrer(results);
      
      ToastService.success('You have updated the password successfully');
      RouterService.forward('/referral/signin')

    } catch (err) {
      ToastService.error(err.message);
    }

    await LoadingService.hideLoading();
  }

  checkErrors(results) {
    const errors = [];

    let required = ['email', 'password', 'password_confirmation'];

    required.forEach((r) => {
      if (!results[r]) {
        errors.push(r);
      }
    });

    if (results.email && !Isemail.validate(results.email)) {
      errors.push('email');
    }

    if (results.password !== results['password_confirmation']) { 
      errors.push('password_confirmation');
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
          <div class='title'>Password Reset</div>
          
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

          <div
            class={{
              input: true,
              error: this.errors.includes('password'),
            }}
          >
            <label class='label' htmlFor="password">Password</label>

            <input
              id='password'
              type='password'
              class='apt212-input block'
              name='password'
            />
          </div>

          <div
            class={{
              input: true,
              error: this.errors.includes('password_confirmation'),
            }}
          >
            <label class='label' htmlFor="password_confirmation">Confirm Password</label>

            <input
              id='password_confirmation'
              type='password'
              class='apt212-input block'
              name='password_confirmation'
            />
          </div>
          
          <div class='input'>
            <input type='submit' class='button-dark block' value='Reset' />
          </div>
        </div>

      </form>
    );
  }
}
