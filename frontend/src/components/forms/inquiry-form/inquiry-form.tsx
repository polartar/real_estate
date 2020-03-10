import { Component, h, Prop, State, Element } from '@stencil/core';
import { Store } from '@stencil/redux';
import TaxonomySelectors from '../../../store/selectors/taxonomy';
import { getBedsListingText } from '../../../helpers/filters';
import { formatMoney } from '../../../helpers/utils';
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
        <div class="title desktop-center">Make An Inquiry</div>

        <p class="desktop-center">We are here to help 24/7</p>
        <p class="desktop-center">212.380.1375 &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; info@apt212.com</p>

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
          </div>

          <div class="right">
            <div class={{ input: true, error: this.errors.includes('message')}}>
              <label htmlFor="inquiry-message" class="sr-only">How can we help?</label>
              <textarea id="inquiry-message" name="message" placeholder="How can we help?" class="apt212-input block" />
            </div>
          </div>
        </div>

        <div class="tell-more">
          Tell us more about your search
        </div>

        <div class="columns columns-mobile">
          <div class="left">
            <div class="input">
              <input-date name="arrival" placeholder="Arrival" />
            </div>

            <div class="input">
              <label htmlFor="inquiry-apt-size" class="sr-only">Apt Size</label>
              <select id="inquiry-apt-size" class="apt212-input block" name="size">
                <option>Apt Size</option>
                {
                  this.bedroomTypes.map(b => <option value={ getBedsListingText(b, 'short') }>{ getBedsListingText(b, 'short') }</option>)
                }
              </select>
            </div>
          </div>

          <div class="right">
            <div class="input">
              <input-date name="departure" placeholder="Departure" />
            </div>

            <div class="input">
              <label htmlFor="inquiry-budget" class="sr-only">Budget</label>
              <select id="inquiry-budget" class="apt212-input block" name="budget">
                {
                  [...Array(10).keys()].map(k => {
                    let val = '';
                    let text = '';

                    if (k === 0) {
                      val = '';
                      text = 'Budget';
                    } else {
                      val = `${ formatMoney((k + 1) * 1000, {minimumFractionDigits: 0, maximumFractionDigits: 0})}${ k === 9 ? '+' : ''} / Month`;
                      text = val;
                    }

                    return (
                      <option value={val}>{text}</option>
                    )
                  })
                }
              </select>
            </div>
          </div>
        </div>

        <div class="input submit">
          <input type="submit" value="SUBMIT" class="button-dark block" />
        </div>
      </form>
    )
  }
}
