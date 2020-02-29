import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';
import { formatDate, formatMoney } from '../../../../helpers/utils';
import { ModalService } from '../../../../services/modal.service';

@Component({
  tag: 'booking-mobile-body',
  styleUrl: 'booking-mobile-body.scss'
})
export class BookingMobileBody {
  @Prop() item!: any;

  @Event() setViewEvent: EventEmitter;
  @Event() showGuestInput: EventEmitter;

  render() {
    return (
      <div class="booking-mobile-body-component">
        <div class="rate-date-details">
          <div><span class="highlight">{ formatMoney(this.item.rate) }</span> per month</div>
          <div><span class="highlight">{ formatDate(this.item.available_date, 'm.d.y')}</span> next available date</div>
        </div>

        <page-listing-checkin
          item={this.item}
          onShowCheckInInput={() => this.setViewEvent.emit('checkinInput')}
          onShowCheckOutInput={() => this.setViewEvent.emit('checkoutInput')}
          onShowGuestsInput={() => this.showGuestInput.emit()}
          onShowSeasonalRates={() => this.setViewEvent.emit('seasonalRates')}
          onShowBookingDetails={() => this.setViewEvent.emit('bookingDetails')}
          onShowAskQuestionInput={() => ModalService.contactUs()}
        />
      </div>
    )
  }
}
