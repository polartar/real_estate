import { Component, h, Prop, State, Watch } from '@stencil/core';
import { Store, Action } from '@stencil/redux';
import authSelectors from '../../../store/selectors/auth';
import { login } from '../../../store/actions/auth';
import Isemail from 'isemail';
import { ToastService } from '../../../services/toast.service';
import { RouterService } from '../../../services/router.service';

@Component({
  tag: 'page-login',
  styleUrl: 'page-login.scss'
})
export class PageAdmin {
  @Prop({ context: "store" }) store: Store;
  @State() loading: boolean = false;
  @State() loginError;
  @State() isLoggedIn;

  loginAction: Action;
  email!: HTMLInputElement;
  password!: HTMLInputElement;
  isDirty: boolean = false;

  @State() errors: string[] = [];

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
console.log('back to admin');
      RouterService.forward('/admin');
    }
  }

  validateDirtyInputs() {
    if (!this.isDirty) {
      return true;
    }

    return this.validate();
  }

  validate() {
    const errors = [];
    if (!this.email.value) {
      errors.push('Please enter an email address');
    }
    else {
      if (!Isemail.validate(this.email.value)) {
        errors.push('Please enter a valid email address');
      }
    }

    if (!this.password.value) {
      errors.push('Please enter your password');
    }

    this.errors = errors;

    return !errors.length;
  }

  login() {
    this.isDirty = true;

    if (!this.validate()) {
      return;
    }

    this.loginAction(this.email.value, this.password.value);
  }

  render() {
    return [
      <ion-content>
        <app-header />

        <section class="section page-login">
          <div class="login-form">

          </div>
          <h1 class="title text-center">Log In</h1>

          <form onSubmit={e => { e.preventDefault(); this.login(); }} >
            <input
              type="email"
              name="email"
              value=""
              class="apt212-input block"
              placeholder="Email"
              ref={el => this.email = el as HTMLInputElement }
              onChange={() => this.validateDirtyInputs() }
            />

            <input
              type="password"
              name="password"
              value=""
              class="apt212-input block"
              placeholder="Password"
              ref={el => this.password = el as HTMLInputElement }
              onChange={() => this.validateDirtyInputs() }
            />

            {
              this.errors.length ? <div class="errors">
                {
                  this.errors.map(e => <div>{e}</div>)
                }
              </div>
              : null
            }

            <button
              type="submit"
              class="button-dark block login-submit"
              onClick={() => this.login()}
              disabled={this.loading}
            >
              Log In

              {
                this.loading ? <ion-spinner name="lines" color="light" /> : null
              }
            </button>
          </form>

        </section>

        <app-footer />
      </ion-content>
    ]
  }
}
