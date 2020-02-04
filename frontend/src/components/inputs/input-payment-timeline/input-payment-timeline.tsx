import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'input-payment-timeline',
  styleUrl: 'input-payment-timeline.scss'
})
export class InputPaymentTimeline {
  @Prop() item: any;

  render() {
    return (
      <div class="input-payment-timeline-component fieldset-inputs payment-timeline">
        <div class="input">
          <label htmlFor="months-due-on-checkin">Months Due on Check In</label>
          <input
            id="months-due-on-checkin"
            type="number"
            name="months_due_on_checkin"
            class="apt212-input block"
            value={this.item ? this.item.months_due_on_checkin : ''}
          />
        </div>

        <div class="input">
          <label htmlFor="days-due-on-checkin">Days Due on Check In</label>
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
            options={[
              {
                label: 'Background Check',
                value: 'background_check'
              },
              {
                label: 'Full Service Fee',
                value: 'service_fee'
              },
              {
                label: 'Security Deposit',
                value: 'security_deposit'
              },
              {
                label: 'Months Due on Check In',
                value: 'months_due_on_checkin'
              },
              {
                label: 'Days Due on Check In',
                value: 'days_due_on_checkin'
              }
            ]}
            value={this.item ? this.item.due_to_reserve : []}
          />
        </div>

        <div class="input">
          <label htmlFor="due-by-checkin">Due By Check In</label>
          <input-multiselect
            id="due-by-checkin"
            name="due_by_checkin"
            options={[
              {
                label: 'Background Check',
                value: 'background_check'
              },
              {
                label: 'Full Service Fee',
                value: 'service_fee'
              },
              {
                label: 'Security Deposit',
                value: 'security_deposit'
              },
              {
                label: 'Months Due on Check In',
                value: 'months_due_on_checkin'
              },
              {
                label: 'Days Due on Check In',
                value: 'days_due_on_checkin'
              }
            ]}
            value={this.item ? this.item.due_by_checkin : []}
          />
        </div>
      </div>
    )
  }
}
