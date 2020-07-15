import { Component, h, Prop, State, Element } from '@stencil/core';
import { Store } from '@stencil/redux';
import BookingSelectors from '../../store/selectors/booking';
import { EnvironmentConfigService } from '../../services/environment/environment-config.service';
import Clipboard from 'clipboard';
import serialize from 'form-serialize';
import Isemail from 'isemail';
import { ToastService } from '../../services/toast.service';
import { formatDate } from '../../helpers/utils';
import { APIBookingService } from '../../services/api/booking';
import { LoadingService } from '../../services/loading.service';

@Component({
  tag: 'share-listing',
  styleUrl: 'share-listing.scss'
})
export class ShareListing {
  @Prop({ context: "store" }) store: Store;
  @Element() el: HTMLElement;
  @Prop() items!: any[];
  @State() view: string = 'email';

  @State() checkindate;
  @State() checkoutdate;
  @State() guests;
  @State() bookingId;
  @State() errors: string[] = [];

  form: HTMLFormElement;

  clipboard: any;
  copytarget: HTMLInputElement;

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        bookingId: BookingSelectors.getApartmentId(state),
        checkindate: BookingSelectors.getCheckinDate(state),
        checkoutdate: BookingSelectors.getCheckoutDate(state),
        guests: BookingSelectors.getGuests(state)
      }
    });
  }

  componentDidLoad() {
    if (this.copytarget) {
      this.clipboard = new Clipboard(this.copytarget);

      this.clipboard.on('success', () => {
        return ToastService.success('The link has been copied to your clipboard');
      });

      this.clipboard.on('error', () => {
        return ToastService.error('There was an issue copying the link');
      });
    }
  }

  close() {
    const modal: any = this.el.closest('ion-modal');

    if (modal) {
      modal.dismiss();
    }
  }

  async submitForm(e) {
    e.preventDefault();

    const results = serialize(this.form, { hash: true, empty: true });

    this.checkErrors(results);

    if (this.errors.length) {
      ToastService.error('Please fill out the email and message and try again');
      return;
    }

    const data = {
      ...results,
      ids: this.items.map(i => i.id),
      checkin: this.checkindate ? formatDate(this.checkindate, 'm/d/y') : null,
      checkout: this.checkoutdate ? formatDate(this.checkoutdate, 'm/d/y') : null,
      guests: this.guests,
      urls: this.items.map(i => this.getLink(i))
    };

    try {
      await LoadingService.showLoading();

      await APIBookingService.shareListing(data);

      ToastService.success('Thank you, your message has been sent');

      this.close();
    } catch (err) {
      ToastService.error(err.message);
    }

    await LoadingService.hideLoading();
  }

  checkErrors(results) {
    const errors = [];
    let required = ['email', 'message'];

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

  getLink(item) {
    const baseURL = EnvironmentConfigService.getInstance().get('BASE_URL') + item.url_path;
    const params: any = {};

    if (this.bookingId === item.id) {
      // add in booking details
      if (this.checkindate) {
        params.checkin = formatDate(this.checkindate, 'm/d/y');
      }

      if (this.checkoutdate) {
        params.checkout = formatDate(this.checkoutdate, 'm/d/y');
      }

      if (this.guests) {
        params.guests = this.guests;
      }
    }

    const url = Object.keys(params).length ? baseURL + '?' + Object.keys(params).map(key => key + '=' + params[key]).join('&') : baseURL;
    return url;
  }


  render() {
    return (
      <div class="share-listing-component">
        <h2 class="text-center">Share Apartment</h2>

        {
          this.items.length === 1 ?
          <div class="share-nav">
            <button class="button-reset has-icon" aria-label="Send Email" onClick={() => this.view = 'email'}>
              <img src="/assets/images/icons/email.svg" />Send Email
            </button>

            <button class="button-reset has-icon" aria-label="Copy Link" onClick={() => this.view = 'copylink'}>
              <img src="/assets/images/icons/link.svg" />Copy Link
            </button>
          </div>
          : <div style={{ height: '70px' }} />
        }

        <form onSubmit={e => this.submitForm(e)} class={{ hidden: this.view !== 'email'}} ref={el => this.form = el as HTMLFormElement }>
          <label htmlFor="share-listing-email">Send To</label>
          <div class="email-input">
            <input
              id="share-listing-email"
              type="email"
              name="email"
              placeholder="Enter the recipient's email address"
              class={{ error: this.errors.includes('email') }}
            />
            <img src="/assets/images/icons/email.svg" role="presentation" alt="" />
          </div>

          <label htmlFor="share-listing-message">Message</label>
          <textarea
            id="share-listing-message"
            placeholder="Enter your message"
            name="message"
            class={{ error: this.errors.includes('message') }}
          />

          <input type="submit" class="button-dark submit" value="SEND" />
        </form>

        {
          this.items.length === 1 ?
          <form onSubmit={e => e.preventDefault()} class={{ hidden: this.view !== 'copylink' }}>
            <label htmlFor="share-listing-copytext" class="sr-only" />
            <input
              id="share-listing-copytext"
              type="text"
              value={ this.getLink(this.items[0]) }
              readOnly
              class="text"
            />

            <input
              type="submit"
              class="button-dark submit copytext"
              value="COPY LINK"
              data-clipboard-target="#share-listing-copytext"
              ref={el => this.copytarget = el as HTMLInputElement }
            />
          </form>
          : null
        }

      </div>
    )
  }
}
