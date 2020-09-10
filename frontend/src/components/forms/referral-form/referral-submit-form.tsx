import { Component, h, State, Prop } from '@stencil/core';
import { Store } from '@stencil/redux';
import serialize from 'form-serialize';
import Isemail from 'isemail';
import { LoadingService } from '../../../services/loading.service';
import { ToastService } from '../../../services/toast.service';
import { APIBookingService } from '../../../services/api/booking';
import authSelectors from '../../../store/selectors/auth';
import { APIAdminService } from '../../../services/api/admin';

@Component({
  tag: 'referral-submit-form',
  styleUrl: 'referral-form.scss',
})
export class ReferralSubmitForm {
  @Prop({  context: 'store' }) store: Store;
  
  @State() submitted: boolean = false;
  @State() errors: string[] = [];
  @State() user: any = null   ;
  
  form: HTMLFormElement;
  agents:any[] = []
  
  async componentWillLoad() {
    this.store.mapStateToProps(this, state => {
       return {
        user: authSelectors.getUser(state),
      }
    });
   
    this.agents = await this.fetchAgents();
  }

  async handleSubmit(e) {
    e.preventDefault();

    let results = serialize(this.form, { hash: true, empty: true });

    this.checkErrors(results);

    if (this.errors.length) {
      return;
    }
    
    await LoadingService.showLoading();

    try {
      results.referrer_uid = this.user.id;  
 
      await APIBookingService.sendReferral(results);

      this.submitted = true;
    } catch (err) {
      ToastService.error(err.message);
    }

    await LoadingService.hideLoading();
  }

  async fetchAgents() {
    try {
      const result = await APIAdminService.getAgents();

      return result;

    } catch(err) {
      return ToastService.error(`Could not retrieve agents: ${err.message}`);
    }
  }

  checkErrors(results) {
    const errors = [];

    let required = ['referral_phone', 'referral_name', 'referral_email'];

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
          <div class='title'>Complete Your Referral</div>

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
            <label class='label' htmlFor="referrer_agent">Referred by Agent</label>

            <select
              id='referrer_agent'
              class='apt212-input block agent-select'
              name='referrer_agent'
            >
              {
                this.agents.map(agent=>{
                  return <option key={`agent_${agent.id}`} value={agent.name}>{agent.name}</option>    
                })
              }
            </select>
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
