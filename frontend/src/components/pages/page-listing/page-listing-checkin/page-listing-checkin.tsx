import { Component, h, Event, EventEmitter, Prop, State } from '@stencil/core';
import { Store } from '@stencil/redux';
import bookingSelectors from '../../../../store/selectors/booking';
import { formatDate } from '../../../../helpers/utils';

@Component({
  tag: 'page-listing-checkin',
  styleUrl: 'page-listing-checkin.scss'
})
export class PageListingCheckin {
  @Prop({ context: "store" }) store: Store;
  @State() guests: number = 0;
  @State() checkinDate: Date | null = null;
  @State() checkoutDate: Date | null = null;
  @State() submitAttempt: number = 0;

  @Event() showSeasonalRates: EventEmitter;
  @Event() showCheckInInput: EventEmitter;
  @Event() showCheckOutInput: EventEmitter;
  @Event() showGuestsInput: EventEmitter;
  @Event() showAskQuestionInput: EventEmitter;
  @Event() showBookingDetails: EventEmitter;

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        guests: bookingSelectors.getGuests(state),
        checkinDate: bookingSelectors.getCheckinDate(state),
        checkoutDate: bookingSelectors.getCheckoutDate(state)
      };
    });
  }

  getErrors() {
    const errors = [];

    if (!this.checkinDate || !this.checkoutDate || !this.guests) {
      errors.push('Please select check in/out dates and a number of guests');
    }

    if (this.checkinDate && this.checkoutDate) {
      if (this.checkinDate > this.checkoutDate) {
        errors.push('Check out date must be after check in date');
      }
      else {
        // ensure min 30 days
        const timeDiff = this.checkoutDate.getTime() - this.checkinDate.getTime();
        const days = timeDiff / (1000 * 3600 * 24);

        if (days < 30) {
          errors.push('Check out date must be at least 30 days after check in');
        }
      }
    }

    return errors;
  }

  submit(e) {
    const errors = this.getErrors();
    this.submitAttempt++;

    if (!errors.length) {
      this.showBookingDetails.emit({ target: e.currentTarget });
    }
  }

  render() {
    return (
      <div class="page-listing-checkin-component">
        <div class="check-in-out">
          <button aria-label="Check in date" class="button-reset checkin-button" onClick={e => this.showCheckInInput.emit({ target: e.currentTarget })}>
            <lazy-image src="/assets/images/icons/calendar.svg" /> { this.checkinDate ? formatDate(this.checkinDate, 'm/d/Y'): 'Check In' }
          </button>

          <img src="/assets/images/icons/arrow.svg" class="arrow" />

          <button aria-label="Check out date" class="button-reset checkin-button checkout" onClick={e => this.showCheckOutInput.emit({ target: e.currentTarget })}>
            <lazy-image src="/assets/images/icons/calendar.svg" /> { this.checkoutDate ? formatDate(this.checkoutDate, 'm/d/Y'): 'Check Out' }
          </button>
        </div>

        <button aria-label="Number of guests" class="button-reset guests" onClick={e => this.showGuestsInput.emit({ target: e.currentTarget })}>
          <div class="guest-value">Guests{ this.guests ? `: ${this.guests}` : null }</div> <ion-icon mode="md" name="md-arrow-dropdown" class="dropdown"></ion-icon>
        </button>

        {
          this.submitAttempt ?
            <div class="errors">
              {
                this.getErrors().map(e => <div>{e}</div>)
              }
            </div>
          : null
        }

        <button class="button-dark booking-details" onClick={e => this.submit(e)}>
          Booking Details
        </button>

        <button class="button-reset ask-question" onClick={e => this.showAskQuestionInput.emit({ target: e.currentTarget })}>
          Ask a question
        </button>

        <div class="seasonal-rating">
          <div class="min-stay">
            30 Days minimum
          </div>

          <button aria-label="Seasonal Rating" class="button-reset rating" onClick={e => this.showSeasonalRates.emit({ target: e.currentTarget })}>
            Seasonal Rating <ion-icon name="ios-arrow-forward" mode="ios" />
          </button>
        </div>
      </div>
    )
  }
}
