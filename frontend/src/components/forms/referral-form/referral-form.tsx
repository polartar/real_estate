import { Component, h, State, Prop } from '@stencil/core';
import serialize from 'form-serialize';
import Isemail from 'isemail';
import { Store } from '@stencil/redux';
import { LoadingService } from '../../../services/loading.service';
import { ToastService } from '../../../services/toast.service';
import { APIBookingService } from '../../../services/api/booking';
import { RouterService } from '../../../services/router.service';
import { ReferralAlertService } from '../../../services/referral-alerts.service';

@Component({
  tag: 'referral-form',
  styleUrl: 'referral-form.scss',
})
export class ReferralForm {

  @Prop({ context: 'store' }) store: Store;

  @State() errors: string[] = [];

  form: HTMLFormElement;

  async handleSubmit(e) {
    e.preventDefault();

    const results = serialize(this.form, { hash: true, empty: true });
    this.checkErrors(results);

    if (this.errors.length) {
      return;
    }


    if(results.agree !== 'on')
     {
       await ReferralAlertService.alert('', 'Please check terms and conditions box to proceed');
       return;
     }

     await LoadingService.showLoading();

    try {
      await APIBookingService.signupReferer(results);

      RouterService.forward('/referral/signin')

    } catch (err) {
      ToastService.error(err.message);
    }

    await LoadingService.hideLoading();
  }

  checkErrors(results) {
    const errors = [];

    let required = ['email', 'name', 'password', 'password_confirmation'];

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
        <div class={{ 'form-content': true }}>
          <div class='title'>Sign Up to Submit Your Referal</div>

          <div class='subtitle'>
            <span class='grey'>Already have an account? </span>

            <ion-router-link
              href={RouterService.getRoute('referral/signin')}
              class='white'
            >
              Sign In
            </ion-router-link>
          </div>

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
              error: this.errors.includes('name'),
            }}
          >
            <label class='label' htmlFor="name">Name</label>

            <input
              id='name'
              type='text'
              class='apt212-input block'
              name='name'
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

          <div class='label '>
            <label class='agreesection'>
              <input type='checkbox' name='agree'></input>

              <span class='grey'>
                Creating an account means you're okay with our&nbsp;{' '}
              </span>
              
              <div class='terms'>
                <a target='_blank' href={RouterService.getRoute('admin/terms')}>
                  Terms and Conditions
                </a>
              </div>

              
            </label>
          </div>

          <div class='input'>
            <input type='submit' class='button-dark block' value='Continue' />
          </div>
        </div>

      </form>
    );
  }
}
