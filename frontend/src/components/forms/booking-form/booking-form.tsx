import { Component, h, State, Prop } from '@stencil/core';
import { Store } from '@stencil/redux';
import bookingSelectors from '../../../store/selectors/booking';
import { generateId } from '../../../helpers/utils';

@Component({
  tag: 'booking-form',
  styleUrl: 'booking-form.scss'
})
export class BookingForm {
  @Prop({ context: "store" }) store: Store;
  @State() method: string = 'ach';
  @State() agent: string = 'yes';
  @State() bookingDetails: any = null;
  @State() errors: any = [];

  @State() idSuffix: string = generateId(5);

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        bookingDetails: bookingSelectors.getBookingDetails(state)
      }
    });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log('submitted');

    this.errors = ['amount'];
  }

  render() {
    const agents = [
      {
        id: 1,
        name: 'Office'
      },
      {
        id: 2,
        name: 'Adi'
      },
      {
        id: 3,
        name: 'Margaret'
      }
    ];

    return (
      <form onSubmit={e => this.onSubmit(e)} class="booking-form-component">
        <div class="title text-center">Select a payment method</div>

        <div class="payment-method text-center">
          <div class="button-toggles">
            <button
              type="button"
              class={{ 'button-dark': true,  active: this.method === 'ach'}}
              onClick={() => this.method = 'ach'}
            >
              Bank Transfer
            </button>
          </div>

          <div class="button-toggles">
            <button
              type="button"
              class={{ 'button-dark': true,  active: this.method === 'credit'}}
              onClick={() => this.method = 'credit'}
            >
              Credit Card
            </button>

            <div class="subtext">* Additional 3% for processing fees</div>
          </div>

          <input type="hidden" name="payment_method" value={this.method} />
        </div>

        <div class="default-fields">
          <div class={{ input: true, error: this.errors.includes('amount') }}>
            <label htmlFor={`amount-${this.idSuffix}`}>Amount you would like to pay</label>
            <input
              id={`amount-${this.idSuffix}`}
              type="number"
              name="amount"
              value={this.bookingDetails ? this.bookingDetails.timeline.due_to_reserve : null }
            />
          </div>

          <div class="input">
            <label htmlFor={`webid-${this.idSuffix}`}>Address or Web ID</label>
            <input
              id={`webid-${this.idSuffix}`}
              type="text"
              name="webid"
              value={this.bookingDetails ? this.bookingDetails.id : null }
            />
          </div>

          <div class="columns">
            <div class="input agent">
              <label>Working with an agent?</label>

              <div class="button-toggles">
                <button
                  type="button"
                  class={{ 'button-dark': true,  active: this.agent === 'yes'}}
                  onClick={() => this.agent = 'yes'}
                >
                  Yes
                </button>

                <button
                  type="button"
                  class={{ 'button-dark': true,  active: this.agent === 'no'}}
                  onClick={() => this.agent = 'no'}
                >
                  No
                </button>
              </div>

              <input type="hidden" name="using_agent" value={this.agent} />
            </div>

            <div class="input">
              <label htmlFor={`agent-${this.idSuffix}`}>Agent Name</label>
              <select
                id={`agent-${this.idSuffix}`}
                name="agent"
              >
                <option value=""></option>

                {
                  agents.map(a => <option value={a.id}>{a.name}</option>)
                }
              </select>
            </div>

            <div class="input">
              <label htmlFor={`firstname-${this.idSuffix}`}>First Name</label>
              <input
                id={`firstname-${this.idSuffix}`}
                type="text"
                name="firstname"
              />
            </div>

            <div class="input">
              <label htmlFor={`lastname-${this.idSuffix}`}>Last Name</label>
              <input
                id={`lastname-${this.idSuffix}`}
                type="text"
                name="lastname"
              />
            </div>

            <div class="input">
              <label htmlFor={`email-${this.idSuffix}`}>Email</label>
              <input
                id={`email-${this.idSuffix}`}
                type="email"
                name="email"
              />
            </div>

            <div class="input">
              <label htmlFor={`phone-${this.idSuffix}`}>Phone</label>
              <input
                id={`phone-${this.idSuffix}`}
                type="text"
                name="phone"
              />
            </div>
          </div>
        </div>

        <div class="input">
          <div class="flex-vertical-align">
              <label class="inline">
                Do you agree to terms of service? <button class="button-reset tos-view">View</button>
              </label>
              <apt212-checkbox name="tos" value="1" class="tos" />
          </div>
        </div>

        <div class="input">
          <button type="submit" class="button button-dark block active">Proceed to payment gateway</button>
        </div>
      </form>
    )
  }
}
