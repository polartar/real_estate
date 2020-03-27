import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'input-payment-timeline',
  styleUrl: 'input-payment-timeline.scss'
})
export class InputPaymentTimeline {
  @Prop() item: any;

  defaultOptions = [
    {
      label: '1. Background Check',
      value: 'background_check'
    },
    {
      label: '2. Refundable Deposit',
      value: 'security_deposit'
    },
    {
      label: '3. Service Fee',
      value: 'service_fee'
    },
    {
      label: '4. Move out cleaning',
      value: 'move_out_cleaning'
    },
    {
      label: '5. Rent (Months due at ck in)',
      value: 'months_due_on_checkin'
    },
    {
      label: '6. Rent (Days due at ck in)',
      value: 'days_due_on_checkin'
    },
    {
      label: '7. Utilites',
      value: 'utilities'
    },
    {
      label: '8. Tax',
      value: 'tax'
    }
  ];

  @State() dtrOptions = [...this.defaultOptions];

  @State() dbcOptions = [...this.defaultOptions];

  dueToReserveInput: HTMLInputMultiselectElement;
  dueByCheckinInput: HTMLInputMultiselectElement;

  componentWillRender() {
    if (this.item && this.item.due_by_checkin) {
      const dtrOptions = [...this.dtrOptions].filter(option => !this.item.due_by_checkin.includes(option.value));

      this.dtrOptions = dtrOptions;
    }

    if (this.item && this.item.due_to_reserve) {
      const dbcOptions = [...this.dbcOptions].filter(option => !this.item.due_to_reserve.includes(option.value));

      this.dbcOptions = dbcOptions;
    }
  }

  timelineChanged(name, event) {
    const newOptions = [...this.defaultOptions].filter(option => !event.detail.includes(option.value));

    if (name === 'due_by_checkin') {
      this.dueToReserveInput.updateOptions(newOptions);
    }
    else {
      this.dueByCheckinInput.updateOptions(newOptions);
    }
  }

  render() {
    return (
      <div class="input-payment-timeline-component fieldset-inputs payment-timeline">
        <div class="input">
          <label htmlFor="months-due-on-checkin">Months Due upon Check In</label>
          <input
            id="months-due-on-checkin"
            type="number"
            name="months_due_on_checkin"
            class="apt212-input block"
            value={this.item ? this.item.months_due_on_checkin : ''}
          />
        </div>

        <div class="input">
          <label htmlFor="days-due-on-checkin">Days Due upon Check In</label>
          <input
            id="days-due-on-checkin"
            type="number"
            name="days_due_on_checkin"
            class="apt212-input block"
            value={this.item ? this.item.days_due_on_checkin : ''}
          />
        </div>

        <div class="input">
          <label htmlFor="duci_advance_payment_days">DUCI Payment Days in Advance</label>
          <select
            id="duci_advance_payment_days"
            name="duci_advance_payment_days"
            class="apt212-input block"
          >
            {
              [...[''], ...Array(31).keys()].map(v =>
                <option value={v} selected={this.item ? this.item.duci_advance_payment_days === v : false }>{v}</option>
              )
            }
          </select>
        </div>

        <div class="input">
          <label htmlFor="due-to-reserve">Due Now to Reserve</label>
          <input-multiselect
            id="due-to-reserve"
            name="due_to_reserve"
            options={this.dtrOptions}
            value={this.item ? this.item.due_to_reserve : []}

            onOnValueChange={e => this.timelineChanged('due_to_reserve', e)}

            ref={el => this.dueToReserveInput = el as HTMLInputMultiselectElement }
          />
        </div>

        <div class="input">
          <label htmlFor="due-by-checkin">Due By Check In</label>
          <input-multiselect
            id="due-by-checkin"
            name="due_by_checkin"
            options={this.dbcOptions}
            value={this.item ? this.item.due_by_checkin : []}

            onOnValueChange={e => this.timelineChanged('due_by_checkin', e)}

            ref={el => this.dueByCheckinInput = el as HTMLInputMultiselectElement }
          />
        </div>
      </div>
    )
  }
}
