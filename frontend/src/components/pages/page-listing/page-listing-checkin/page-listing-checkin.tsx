import { Component, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'page-listing-checkin',
  styleUrl: 'page-listing-checkin.scss'
})
export class PageListingCheckin {
  guests: number = 0;

  @Event() showSeasonalRates: EventEmitter;
  @Event() showCheckInInput: EventEmitter;
  @Event() showCheckOutInput: EventEmitter;
  @Event() showGuestsInput: EventEmitter;
  @Event() showAskQuestionInput: EventEmitter;
  @Event() showBookingDetails: EventEmitter;

  render() {
    return (
      <div class="page-listing-checkin-component">
        <div class="check-in-out">
          <button aria-label="Check in date" class="button-reset checkin-button" onClick={e => this.showCheckInInput.emit({ target: e.currentTarget })}>
            <lazy-image src="/assets/images/icons/calendar.svg" /> Check In
          </button>

          <img src="/assets/images/icons/arrow.svg" class="arrow" />

          <button aria-label="Check out date" class="button-reset checkin-button checkout" onClick={e => this.showCheckOutInput.emit({ target: e.currentTarget })}>
            <lazy-image src="/assets/images/icons/calendar.svg" /> Check Out
          </button>
        </div>

        <button aria-label="Number of guests" class="button-reset guests" onClick={e => this.showGuestsInput.emit({ target: e.currentTarget })}>
          <div class="guest-value">Guests { this.guests ? this.guests : null }</div> <ion-icon mode="md" name="md-arrow-dropdown" class="dropdown"></ion-icon>
        </button>

        <button class="button-dark booking-details" onClick={e => this.showBookingDetails.emit({ target: e.currentTarget })}>
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
