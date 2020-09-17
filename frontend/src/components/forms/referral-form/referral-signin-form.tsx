import { Component, h, State, Prop, Watch } from '@stencil/core';
import serialize from 'form-serialize';
import Isemail from 'isemail';
import { LoadingService } from '../../../services/loading.service';
import { ToastService } from '../../../services/toast.service';
import { RouterService } from '../../../services/router.service';
import { Store, Action } from '@stencil/redux';
import authSelectors from '../../../store/selectors/auth';
import { login } from '../../../store/actions/auth';

@Component({
  tag: 'referral-signin-form',
  styleUrl: 'referral-form.scss',
})
export class ReferralForm {
  @Prop({ context: "store" }) store: Store;

  @State() submitted: boolean = false;

  @State() errors: string[] = [];
  @State() loading: boolean = false;
  @State() loginError;
  @State() isLoggedIn;

  form: HTMLFormElement;
  loginAction: Action;

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        loading: authSelectors.getIsLoading(state),

        loginError: authSelectors.getLoginError(state),

        isLoggedIn: authSelectors.isLoggedIn(state)
      }
    });

    this.store.mapDispatchToProps(this, {
      loginAction: login
    });
  }

  @Watch('loginError')
  loginErrorChanged() {
    if (this.loginError) {
      let message = this.loginError;

      if (message === 'Unauthorized') {
        message = 'Could not log in. Please check your email/password.';
      }

      return ToastService.error(message);
    }
  }

  @Watch('isLoggedIn')
  loginChanged() {
    if (this.isLoggedIn) {
      ToastService.success('You have been logged in');
      
      RouterService.forward('/referral/submit');
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    const results = serialize(this.form, { hash: true, empty: true });
    
    this.checkErrors(results);

    if (this.errors.length) {
      return;
    }

    await LoadingService.showLoading();

    try {
      this.loginAction(results.email, results.password);

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
        <div class={{ 'form-content': true }}>
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

          <div class='label'>
            <span class='grey'>Forgot Password? </span>

            <ion-router-link
              href={RouterService.getRoute('referral/forgotpassword')}
              class='white'
            >
              Restore
            </ion-router-link>
          </div>

          <div class='input'>
            <input type='submit' class='button-dark block' value='Sign In' disabled={this.loading}/>
          
          </div>
        </div>
      </form>
    );
  }
}
