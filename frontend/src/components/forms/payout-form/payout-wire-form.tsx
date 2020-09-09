import { Component, h, State } from '@stencil/core';
import serialize from 'form-serialize';
import { LoadingService } from '../../../services/loading.service';
import { ToastService } from '../../../services/toast.service';
import { APIBookingService } from '../../../services/api/booking';

@Component({
  tag: 'payout-wire-form',
  styleUrl: 'payout-form.scss',
})
export class PayoutWireForm {
  @State() submitted: boolean = false;
  @State() errors: string[] = [];
  @State() isVisible: boolean = false;

  form: HTMLFormElement;

  showForm() {
    this.isVisible = !this.isVisible;
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
      'bankName',
      'accountName',
      'accountNumber',
      'routingNumber',
    ];

    required.forEach((r) => {
      if (!results[r]) {
        errors.push(r);
      }
    });
    
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
          <div class='title' onClick={() => this.showForm()}>
            <span>Wire</span>

            <img
              src='/assets/icon/arrowright.svg'
              class={this.isVisible ? 'arrowdown' : 'arrowup'}
            ></img>
          </div>

          {this.isVisible ? (
            <div>
              {' '}
              <div
                class={{
                  input: true,
                  error: this.errors.includes('bankName'),
                }}
              >
                <label class='label' htmlFor="bankName">Bank Name</label>

                <input
                  id='bankName'
                  type='text'
                  class='apt212-input block'
                  name='bankName'
                />
              </div>

              <div
                class={{
                  input: true,
                  error: this.errors.includes('accountName'),
                }}
              >
                <label class='label' htmlFor="accountName">Account Name</label>

                <input
                  id='accountName'
                  type='text'
                  class='apt212-input block'
                  name='accountName'
                />
              </div>

              <div
                class={{
                  input: true,
                  error: this.errors.includes('accountNumber'),
                }}
              >
                <label class='label' htmlFor="accountNumber">Account Number</label>

                <input
                  id='accountNumber'
                  type='text'
                  class='apt212-input block'
                  name='accountNumber'
                />
              </div>

              <div
                class={{
                  input: true,
                  error: this.errors.includes('routingNumber'),
                }}
              >
                <label class='label' htmlFor="routingNumber">Routing Number</label>

                <input
                  id='routingNumber'
                  type='text'
                  class='apt212-input block'
                  name='routingNumber'
                />
              </div>

              <div class='input'>
                <input type='submit' class='button-dark block' value='Submit' />
              </div>
            </div>
          ) : null}
        </div>
      </form>
    );
  }
}
