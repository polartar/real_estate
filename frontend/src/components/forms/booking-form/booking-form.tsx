import { Component, h, State, Prop } from '@stencil/core';
import { Store } from '@stencil/redux';
import bookingSelectors from '../../../store/selectors/booking';
import { generateId } from '../../../helpers/utils';
import serialize from 'form-serialize';
import isNumber from 'is-number';
import Isemail from 'isemail';
import { EnvironmentConfigService } from '../../../services/environment/environment-config.service';
import { ScriptLoaderService } from '../../../services/script-loader.service';
import { LoadingService } from '../../../services/loading.service';
import { APIBookingService } from '../../../services/api/booking';
import { ToastService } from '../../../services/toast.service';
import { ModalService } from '../../../services/modal.service';
import { APIAdminService } from '../../../services/api/admin';

declare var Stripe: any;
declare var Plaid: any;

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
  @State() submitted: boolean = false;
  @State() agents: any[] = [];

  @State() idSuffix: string = generateId(5);

  form: HTMLFormElement;

  stripe: any;
  plaidLoaded: boolean = false;
  stripeElements: any;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;


  async fetchAgents() {
    try {
      const result = await APIAdminService.getAgents();

      this.agents = result;

      return result;

    } catch(err) {
      return ToastService.error(`Could not retrieve agents. Please try again later. ${err.message}`);
    }
  }

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        bookingDetails: bookingSelectors.getBookingDetails(state)
      }
    });
  }

  componentDidLoad() {
    this.fetchAgents();

    ScriptLoaderService.loadScript('Stripe', 'https://js.stripe.com/v3/')
      .then(() => {
        this.stripe = Stripe(EnvironmentConfigService.getInstance().get('STRIPE_PUBLIC_KEY'));

        this.stripeElements = this.stripe.elements({
          fonts: [
            {
              cssSrc: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro',
            },
          ],
        });

        this.stripeInit();
      })
      .catch(err => {
        console.log(err);
      });

    ScriptLoaderService.loadScript('Plaid', 'https://cdn.plaid.com/link/v2/stable/link-initialize.js')
      .then(() => {
        this.plaidLoaded = true;
      })
      .catch(err => {
        console.log(err);
      });
  }

  stripeInit() {

    const stripeStyles = {
      base: {
        fontFamily: 'Source sans pro',
      }
    };

    try {
      if (!this.cardNumber) {
        this.cardNumber = this.stripeElements.create('cardNumber', { style: stripeStyles });
        this.cardNumber.addEventListener('change', ev => {
          if (ev.error) {
            ToastService.error(ev.error.message);
          }
        });
      }

      if (!this.cardExpiry) {
        this.cardExpiry = this.stripeElements.create('cardExpiry', { style: stripeStyles });
        this.cardExpiry.addEventListener('change', ev => {
          if (ev.error) {
            ToastService.error(ev.error.message);
          }
        });
      }

      if (!this.cardCvc) {
        this.cardCvc = this.stripeElements.create('cardCvc', { style: stripeStyles });
        this.cardCvc.addEventListener('change', ev => {
          if (ev.error) {
            ToastService.error(ev.error.message);
          }
        });
      }


      this.cardNumber.mount(`#cardNumber-${this.idSuffix}`);
      this.cardNumber.clear();
      this.cardExpiry.mount(`#cardExpiry-${this.idSuffix}`);
      this.cardCvc.mount(`#cardCvc-${this.idSuffix}`);

    } catch (err) {
      console.log(err);
      // ignore since the element may not exist
    }
  }

  async onSubmit(e) {
    e.preventDefault();

    let results = serialize(this.form, { hash: true, empty: true });

    this.checkErrors(results);

    if (this.errors.length) {
      return;
    }

    // add in some additional info
    if (this.bookingDetails) {
      results.bookingDetails = JSON.stringify(this.bookingDetails);
    }

    if (results.using_agent === 'yes') {
      results.agentName = this.agents.filter(a => a.email === results.agent).map(a => a.name)[0];
    }

    if (results.payment_method == 'credit') {
      this.processCreditCard(results);
    }
    else {
      this.processACH(results);
    }
  }

  checkErrors(results) {
    const errors = [];

    let required = ['amount', 'webid', 'firstname', 'lastname', 'email', 'phone', 'tos'];

    if (results.payment_method === 'credit') {
      required = [...required, 'zipcode'];
    }

    if (this.agent === 'yes') {
      required = [...required, 'agent'];
    }

    required.forEach(r => {
      if (!results[r]) {
        errors.push(r);
      }
    });

    if (!isNumber(results.amount)) {
      errors.push('amount');
    }

    if (!Isemail.validate(results.email)) {
      errors.push('email');
    }

    if (results.payment_method === 'credit') {
      if (this.cardNumber._empty || this.cardNumber._invalid) {
        errors.push('cardNumber');
      }

      if (this.cardExpiry._empty || this.cardExpiry._invalid) {
        errors.push('cardExpiry');
      }

      if (this.cardCvc._empty || this.cardExpiry._invalid) {
        errors.push('cardCvc');
      }
    }

    this.errors = errors;
  }

  async processCreditCard(results) {
    await LoadingService.showLoading();

    try {
      const intent = await APIBookingService.getPaymentIntent(results);

      const stripeResult = await this.stripe.confirmCardPayment(intent, {
        payment_method: {
          card: this.cardNumber,
          billing_details: {
            name: `${results.firstname} ${results.lastname}`,
            email: results.email,
            address: {
              postal_code: results.zipcode
            }
          }
        }
      });

      if (stripeResult.error) {
        throw new Error(stripeResult.error.message);
      }

      await LoadingService.hideLoading();

      this.submitted = true;

    } catch (err) {
      ToastService.error(err.message, { duration: 10000 });
    }

    await LoadingService.hideLoading();
  }

  async processACH(results) {
    if (!this.plaidLoaded) {
      ToastService.error('Could not contact Plaid');
      return;
    }

    const plaidFlow = Plaid.create({
      env: EnvironmentConfigService.getInstance().get('PLAID_ENVIRONMENT'),
      clientName: 'APT212',
      key: EnvironmentConfigService.getInstance().get('PLAID_PUBLIC_KEY'),
      product: ['auth'],
      selectAccount: true,
      onSuccess: async (public_token, metadata) => {
        await LoadingService.showLoading();

        try {
          const stripeResult = await APIBookingService.checkoutACH(results, public_token, metadata.account_id);

          if (stripeResult.error) {
            throw new Error(stripeResult.error.message);
          }

          await LoadingService.hideLoading();

          this.submitted = true;

        } catch (err) {
          ToastService.error(err.message, { duration: 10000 });
        }

        await LoadingService.hideLoading();
      },
      onExit: (err, _metadata) => {
        if (err != null) {
          // The user encountered a Plaid API error prior to exiting.
          ToastService.error('Could not establish ACH authorization, please try again');
          return;
        }

        // The user exited the Link flow.
        ToastService.error('ACH authorization has been cancelled');
      },
    });

    plaidFlow.open();
  }

  render() {
    return (
      <form onSubmit={e => this.onSubmit(e)} class="booking-form-component" ref={el => this.form = el as HTMLFormElement }>
        <div class={{ 'form-content': true, submitted: this.submitted }}>
        <div class="title text-center">Select a payment method</div>

        <div class="payment-method text-center">
          <div class="button-toggles">
            <button
              type="button"
              class={{ 'button-dark': true,  active: this.method === 'ach'}}
              onClick={() => this.method = 'ach'}
            >
              <img src={`/assets/images/icons/bank_transfer_${this.method === 'ach' ? 'white' : 'black'}.svg`} alt="" class="payment-method-icon"/>
              Bank Transfer
            </button>
          </div>

          <div class="button-toggles">
            <button
              type="button"
              class={{ 'button-dark': true,  active: this.method === 'credit'}}
              onClick={() => this.method = 'credit'}
            >
              <img src={`/assets/images/icons/credit_card_${this.method === 'credit' ? 'white' : 'black'}.svg`} alt="" class="payment-method-icon" />
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
              step="0.01"
            />
          </div>

          <div class={{ input: true, error: this.errors.includes('webid') }}>
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

            <div class={{ input: true, error: this.errors.includes('agent')}}>
              {
                this.agent === 'yes' ?
                  <div>
                    <label htmlFor={`agent-${this.idSuffix}`}>Agent Name</label>
                      <select
                        id={`agent-${this.idSuffix}`}
                        name="agent"
                      >
                        {
                          this.agents.map(a => <option value={a.email}>{a.name}</option>)
                        }
                      </select>
                  </div>
                : null
              }
            </div>

            <div class={{ input: true, error: this.errors.includes('firstname') }}>
              <label htmlFor={`firstname-${this.idSuffix}`}>First Name</label>
              <input
                id={`firstname-${this.idSuffix}`}
                type="text"
                name="firstname"
              />
            </div>

            <div class={{ input: true, error: this.errors.includes('lastname') }}>
              <label htmlFor={`lastname-${this.idSuffix}`}>Last Name</label>
              <input
                id={`lastname-${this.idSuffix}`}
                type="text"
                name="lastname"
              />
            </div>

            <div class={{ input: true, error: this.errors.includes('email') }}>
              <label htmlFor={`email-${this.idSuffix}`}>Email</label>
              <input
                id={`email-${this.idSuffix}`}
                type="email"
                name="email"
              />
            </div>

            <div class={{ input: true, error: this.errors.includes('phone') }}>
              <label htmlFor={`phone-${this.idSuffix}`}>Phone</label>
              <input
                id={`phone-${this.idSuffix}`}
                type="text"
                name="phone"
              />
            </div>
          </div>
        </div>

        <div class={{ 'credit-inputs': true, visible: this.method === 'credit' }}>
          <div class={{ input: true, error: this.errors.includes('cardNumber')}}>
            <label>Credit Card Number</label>
            <div id={`cardNumber-${this.idSuffix}`} class="stripe-input" />
          </div>

          <div class="columns">
            <div class={{ input: true, error: this.errors.includes('zipcode')}}>
              <label>Zip/Postal Code</label>
              <input id={`zipcode-${this.idSuffix}`} type="text" name="zipcode" />
            </div>

            <div class="columns">
              <div class={{ input: true, error: this.errors.includes('cardExpiry')}}>
                <label>Exp Date</label>
                <div id={`cardExpiry-${this.idSuffix}`} class="stripe-input" />
              </div>

              <div class={{ input: true, error: this.errors.includes('cardCvc')}}>
                <label>CVC</label>
                <div id={`cardCvc-${this.idSuffix}`} class="stripe-input" />
              </div>
            </div>
          </div>
        </div>

        <div class={{ input: true, error: this.errors.includes('tos') }}>
          <div class="flex-vertical-center">
              <label class="inline">
              I have read and agree to the terms &amp; conditions of service  
              </label>
              <apt212-checkbox name="tos" value="1" class="tos" />
              <button type="button" class="button-reset tos-view" onClick={() => ModalService.bookingTOS()}>View</button>
          </div>
        </div>

        <div class="input">
          <button type="submit" class="button button-dark block active">
            Proceed to payment gateway
          </button>
        </div>
        </div>

        {
        this.submitted ?      
          <div class="thank-you-msg flex-vertical-center text-center">
            <div>
              <p>
              Your payment has been processed successfully! <br /><br />
              We are now processing your booking and will email you shortly with the next steps.

              </p>

              <ion-icon name="md-checkmark" />
            </div>
          </div> : null
        }

      </form>
    )
  }
}
