import { Component, h, Event, EventEmitter, Prop, State } from '@stencil/core';
import { Store, Action } from '@stencil/redux';
import { bookingReset, bookingSetDetails } from '../../../../store/actions/booking';
import bookingSelectors from '../../../../store/selectors/booking';
import { formatDate } from '../../../../helpers/utils';
import { LoadingService } from '../../../../services/loading.service';
import { APIApartmentsService } from '../../../../services/api/apartments';

@Component({
  tag: 'page-listing-checkin',
  styleUrl: 'page-listing-checkin.scss'
})
export class PageListingCheckin {
  @Prop({ context: "store" }) store: Store;
  @Prop() item!: any;

  bookingReset: Action;
  bookingSetDetails: Action;

  @State() guests: number = 0;
  @State() checkinDate: Date | null = null;
  @State() checkoutDate: Date | null = null;
  @State() submitAttempt: number = 0;
  @State() apartmentId: number | null = null;
  @State() errors: string[] = [];

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
        apartmentId: bookingSelectors.getApartmentId(state),
        checkinDate: bookingSelectors.getCheckinDate(state),
        checkoutDate: bookingSelectors.getCheckoutDate(state)
      };
    });

    this.store.mapDispatchToProps(this, {
      bookingReset,
      bookingSetDetails
    });

    if (this.apartmentId !== this.item.id) {
      // reset the booking state
      this.bookingReset();
    }
  }

  checkErrors() {
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

    this.errors = errors;
  }

  async submit() {
    this.submitAttempt++;

    this.checkErrors();

    if (this.errors.length) {
      return;
    }

    await LoadingService.showLoading();

    try {
      const details = await APIApartmentsService.getBookingDetails(this.item.id, this.checkinDate, this.checkoutDate, this.guests);

      this.bookingSetDetails(details);

      await LoadingService.hideLoading();

      this.showBookingDetails.emit(details);
    } catch (err) {
      this.errors = [err.message];

      await LoadingService.hideLoading();
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
                this.errors.map(e => <div>{e}</div>)
              }
            </div>
          : null
        }

        <button class="button-dark booking-details" onClick={() => this.submit()}>
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
