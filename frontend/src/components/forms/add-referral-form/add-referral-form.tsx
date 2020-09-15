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
  tag: 'add-referral-form',
  styleUrl: 'add-referral-form.scss',
})
export class AddReferralForm {
  @State() submitted: boolean = false;
  @State() errors: string[] = [];
  @Prop({  context: 'store' }) store: Store;
  @State() user: any = null;
  @State() agents: any[] = [];

  form: HTMLFormElement;

  componentWillLoad() {

    this.store.mapStateToProps(this, state => {
       return {
        user: authSelectors.getUser(state),
      }
    });

  }


  async fetchAgents() {
    try {
      const result = await APIAdminService.getAgents();

      this.agents = result;

      return result;

    } catch(err) {
      return ToastService.error(`Could not retrieve agents. Please try again later. ${err.message}`);
    }
  }

  componentDidLoad() {
    this.fetchAgents();
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
      results.referrer_uid = this.user.id;
      results.referrer_email = this.user.email;

      await APIBookingService.sendReferral(results);

      this.submitted = true;
    } catch (err) {
      ToastService.error(err.message);
    }

    await LoadingService.hideLoading();
  }

  checkErrors(results) {
    const errors = [];

    let required = [
      'referral_name',
      'referral_phone',
      'referral_email',
      'referral_details',
      'referrer_agent',
    ];

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
          <div class='title'>Add New Referral</div>
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
            <label class='label' htmlFor="referrer_agent">Referral by Agent</label>

            <select
              id='referrer_agent'
              class='apt212-input block agent-select'
              name='referrer_agent'
            >
              {
                this.agents.map(a => <option value={a.name}>{a.name}</option>)
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

      </form>
    );
  }
}
