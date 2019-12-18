import { Component, h, Prop, Element } from '@stencil/core';
import { Store, Action } from '@stencil/redux';
import bookingSelectors from '../../../store/selectors/booking';
import { bookingSetCheckin, bookingSetCheckout } from '../../../store/actions/booking';
import { getDate } from '../../../helpers/utils';

@Component({
  tag: 'input-booking-date',
  styleUrl: 'input-booking-date.scss'
})
export class InputBookingDate {
  @Prop({ context: "store" }) store: Store;
  @Element() el: HTMLElement;
  @Prop() type: string = 'checkin';
  @Prop() inPopover: boolean = false;
  @Prop() item!: any;
  @Prop() calendarSize: number = 1.6;

  checkinDate: any;
  checkoutDate: any;

  setCheckinDate: Action;
  setCheckoutDate: Action;

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        checkinDate: bookingSelectors.getCheckinDate(state),
        checkoutDate: bookingSelectors.getCheckoutDate(state)
      };
    });

    this.store.mapDispatchToProps(this, {
      setCheckinDate: bookingSetCheckin,
      setCheckoutDate: bookingSetCheckout
    });
  }

  closePopover() {
    const popover = this.el.closest('apt212-popover');

    if (popover) {
      popover.dismiss();
    }
  }

  dateSelected(e) {
    const date = e.detail ? e.detail : '';

    if (this.type === 'checkin') {
      this.setCheckinDate(this.item.id, date);
    }
    else {
      this.setCheckoutDate(this.item.id, date);
    }

    this.closePopover();
  }

  getMinDate() {
    let today = new Date();
    let available = today;

    if (this.item.available_date) {
      const aptAvailable = getDate(this.item.available_date);
      available = aptAvailable > available ? aptAvailable : available; // make it the more future one
    }

    return available;
  }

  render() {
    return (
      <div class="input-booking-date-component">
        {
          this.inPopover ?
          <div class={{'popover-marker': true, checkin: this.type === 'checkin', checkout: this.type === 'checkout' }} />
          : null
        }

        <div class="picker">
          <apt212-datepicker
            size={this.calendarSize}
            onSelected={e => this.dateSelected(e)}
            value={this.type === 'checkin' ? this.checkinDate : this.checkoutDate }
            minDate={this.getMinDate()}
          />
        </div>

        <div class="disclaimer">
          Minimum Stay 30 Days
        </div>

        { this.inPopover ?
        <ion-button aria-label="close" fill="clear" class="close reset" onClick={() => this.closePopover()}>
          <ion-icon src="/assets/images/icons/cancel.svg" slot="icon-only" />
        </ion-button>
        : null }
      </div>
    )
  }
}
