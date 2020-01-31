import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';
import { ToastService } from '../../../services/toast.service';
import isNumber from 'is-number';

@Component({
  tag: 'input-pricing',
  styleUrl: 'input-pricing.scss'
})
export class InputPricing {
  @Prop() rate: any;
  @Prop() name!: string;
  @Prop() disableKeys: string[] = [];

  @Event() rateChanged: EventEmitter;

  changeDefaultMonthRate(e, key) {
    if (!isNumber(e.target.value)) {
      ToastService.error('Invalid number entered');
      return;
    }

    this.rateChanged.emit({
      key,
      value: e.target.value
    });
  }

  render() {
    return (
      <div class="input-pricing-component fieldset-inputs pricing">

        {
          !this.disableKeys.includes('monthly_rate') ?
            <div class="input">
              <label htmlFor="listing-monthly-rate">Monthly Rate</label>
              <input
                type="text"
                id="listing-monthly-rate"
                name={`${this.name}[default][monthly_rate]`}
                class="apt212-input block"
                value={this.rate ? this.rate.monthly_rate : ''}
                onChange={e => this.changeDefaultMonthRate(e, 'monthly_rate')}
              />
            </div>
          : null
        }

        {
          !this.disableKeys.includes('tax_percent') ?
            <div class="input">
              <label htmlFor="listing-tax">Tax (%)</label>
              <input
                type="text"
                id="listing-tax"
                name={`${this.name}[default][tax_percent]`}
                class="apt212-input block"
                value={this.rate ? this.rate.tax_percent : ''}
                onChange={e => this.changeDefaultMonthRate(e, 'tax_percent')}
              />
            </div>
          : null
        }

        {
          !this.disableKeys.includes('background_check_rate') ?
            <div class="input">
              <label htmlFor="listing-background-check">Background Check</label>
              <input
                type="text"
                id="listing-background-check"
                name={`${this.name}[default][background_check_rate]`}
                class="apt212-input block"
                value={this.rate ? this.rate.background_check_rate : ''}
                onChange={e => this.changeDefaultMonthRate(e, 'background_check_rate')}
              />
            </div>
          : null
        }

        {
          !this.disableKeys.includes('service_fee_host') ?
            <div class="input">
              <label htmlFor="listing-service-fee-host">Service Fee Host Side (%)</label>
              <input
                type="text"
                id="listing-service-fee-host"
                name={`${this.name}[default][service_fee_host]`}
                class="apt212-input block"
                value={this.rate ? this.rate.service_fee_host : ''}
                onChange={e => this.changeDefaultMonthRate(e, 'service_fee_host')}
              />
            </div>
          : null
        }

        {
          !this.disableKeys.includes('service_fee_client') ?
            <div class="input">
              <label htmlFor="listing-service-fee-client">Service Fee Client Side (%)</label>
              <input
                type="text"
                id="listing-service-fee-client"
                name={`${this.name}[default][service_fee_client]`}
                class="apt212-input block"
                value={this.rate ? this.rate.service_fee_client : ''}
                onChange={e => this.changeDefaultMonthRate(e, 'service_fee_client')}
              />
            </div>
          : null
        }

        {
          !this.disableKeys.includes('security_deposit_percent') ?
            <div class="input">
              <label htmlFor="listing-security-deposit">Security Deposit (%)</label>
              <input
                type="text"
                id="listing-security-deposit"
                name={`${this.name}[default][security_deposit_percent]`}
                class="apt212-input block"
                value={this.rate ? this.rate.security_deposit_percent : ''}
                onChange={e => this.changeDefaultMonthRate(e, 'security_deposit_percent')}
              />
              <div class="help-text">% of monthly rate</div>
            </div>
          : null
        }
      </div>
    )
  }
}
