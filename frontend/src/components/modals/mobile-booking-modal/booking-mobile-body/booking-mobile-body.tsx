import { Component, h, Prop } from '@stencil/core';
import { formatDate, formatMoney } from '../../../../helpers/utils';

@Component({
  tag: 'booking-mobile-body',
  styleUrl: 'booking-mobile-body'
})
export class BookingMobileBody {
  @Prop() item!: any;

  render() {
    return (
      <div class="booking-mobile-body-component">
        <div class="rate-date-details">
          <span class="highlight">{ formatMoney(this.item.rate) }</span> per month<br />
          <span class="highlight">{ formatDate(this.item.available_date, 'm.d.y')}</span> next available date
        </div>
      </div>
    )
  }
}
