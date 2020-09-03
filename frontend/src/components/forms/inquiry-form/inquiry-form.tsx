import { Component, h, Prop, State, Element } from '@stencil/core';
import { Store } from '@stencil/redux';
import TaxonomySelectors from '../../../store/selectors/taxonomy';
import serialize from 'form-serialize';
import Isemail from 'isemail';
import { LoadingService } from '../../../services/loading.service';
import { ToastService } from '../../../services/toast.service';
import { APIBookingService } from '../../../services/api/booking';

@Component({
  tag: 'inquiry-form',
  styleUrl: 'inquiry-form.scss'
})
export class InquiryForm {
  @Element() el: HTMLElement;

  @Prop({ context: "store" }) store: Store;

  @State() bedroomTypes: any[] = [];
  @State() errors: string[] = [];

  form: HTMLFormElement;

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        bedroomTypes: TaxonomySelectors.getBedroomTypes(state)
      }
    });
  }

  close() {
    const modal: any = this.el.closest('ion-modal');
    if (modal) {
      modal.dismiss();
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
      await APIBookingService.sendInquiry(results);

      ToastService.success('Your message has been sent, we will contact you as soon as possible');

      this.close();
    } catch (err) {
      ToastService.error(err.message);
    }

    await LoadingService.hideLoading();
  }

  checkErrors(results) {
    const errors = [];

    let required = ['name', 'email', 'message'];

    required.forEach(r => {
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
      <form class="inquiry-form-component" onSubmit={e => this.handleSubmit(e)} ref={el => this.form = el as HTMLFormElement }>
        <div class="title desktop-center">Contact An Agent</div>

        <p class="desktop-center">We are available to assist every step of the way insuring you have a seamless transaction.</p>

        <div class="columns">
          <div class="left">
            <div class={{ input: true, error: this.errors.includes('name')}}>
              <label htmlFor="inquiry-name" class="sr-only">Name</label>
              <input id="inquiry-name" type="text" name="name" placeholder="Name" class="apt212-input block" />
            </div>

            <div class={{ input: true, error: this.errors.includes('email')}}>
              <label htmlFor="inquiry-email" class="sr-only">Email</label>
              <input id="inquiry-email" type="email" name="email" placeholder="Email" class="apt212-input block" />
            </div>

            <div class="input">
              <label htmlFor="inquiry-phone" class="sr-only">Phone</label>
              <input id="inquiry-phone" type="text" name="phone" placeholder="Phone" class="apt212-input block" />
            </div>

            <p class="interest">I am interested in: </p>

            <div class="radiobuttons-container">

              <label htmlFor="buy" class="apt212-radio">
                <input id="buy" class="apt212-radio__button" type="checkbox" name="interested" value="buy" />
                <span class="apt212-radio__label">Buy</span>
              </label>

              <label htmlFor="sell" class="apt212-radio">
                <input id="sell" class="apt212-radio__button" type="checkbox" name="interested" value="sell" />
                <span class="apt212-radio__label">Sell</span>
              </label>

              <label htmlFor="rent" class="apt212-radio">
                <input id="rent" class="apt212-radio__button" type="checkbox" name="interested" value="rent" />
                <span class="apt212-radio__label">Rent</span>
              </label>

              <label htmlFor="list" class="apt212-radio">
                <input id="list" class="apt212-radio__button" type="checkbox" name="interested" value="list" />
                <span class="apt212-radio__label">List</span>
              </label>

              <label htmlFor="rent-furnished" class="apt212-radio">
                <input id="rent-furnished" class="apt212-radio__button" type="checkbox" name="interested" value="rent-furnished" />
                <span class="apt212-radio__label">Rent&nbsp;Furnished</span>
              </label>

              <label htmlFor="other" class="apt212-radio">
                <input id="other" class="apt212-radio__button" type="checkbox" name="interested" value="other" />
                <span class="apt212-radio__label">Other</span>
              </label>

			  	</div>

            <div class={{ input: true, error: this.errors.includes('message')}} >
              <label htmlFor="inquiry-message" class="sr-only">How can we help?</label>
              <textarea id="inquiry-message" name="message" placeholder="How can we help?" class="apt212-input block" />
            </div>

          </div>
        </div>

        <div class="columns columns-mobile">
          <div class="left">

          </div>

        </div>

        <div class="input submit">
          <input type="submit" value="SUBMIT" class="button-dark block" />
        </div>
      </form>
    )
  }
}
