import { Component, h, Prop, Element } from '@stencil/core';
import { Store, Action } from '@stencil/redux';
import { bookingSetGuests } from '../../../store/actions/booking';
import bookingSelectors from '../../../store/selectors/booking';

@Component({
  tag: 'input-booking-guests',
  styleUrl: 'input-booking-guests.scss'
})
export class InputBookingGuests {
  @Prop({ context: "store" }) store: Store;
  @Element() el: HTMLElement;
  @Prop() item!: any;

  setGuests: Action;

  value: any;

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        value: bookingSelectors.getGuests(state)
      };
    });

    this.store.mapDispatchToProps(this, {
      setGuests: bookingSetGuests
    });
  }

  submitTest(val) {
    this.setGuests(this.item.id, val);

    const popover = this.el.closest('apt212-popover');

    if (popover) {
      popover.dismiss();
    }
  }

  render() {
    const options = [1,2,3,4,5,6,7,8];

    return (
      <div class="input-booking-guests-component">
        {
          options.map(o => <button class={{'button-reset': true, option: true, selected: this.value === o}} onClick={() => this.submitTest(o)}>{o}</button>)
        }
      </div>
    );
  }
}
