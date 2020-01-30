import { Component, h, Prop, Element, Method } from '@stencil/core';
import { formatDate } from '../../../helpers/utils';
import { ToastService } from '../../../services/toast.service';
import isNumber from 'is-number';
import getDaysInMonth from 'date-fns/getDaysInMonth';

@Component({
  tag: 'input-month-rates',
  styleUrl: 'input-month-rate.scss'
})
export class InputMonthRates {
  @Element() el: HTMLElement;
  @Prop() rates: any[] = [];
  @Prop() name: string;

  @Method()
  updateDefault(key, value) {
    switch (key) {
      case 'monthly_rate':
      case 'security_deposit_percent':
      case 'service_fee_host':
      case 'service_fee_client':
        const inputs: any = this.el.querySelectorAll(`input.rate-input.${key}`);

        if (inputs) {
          inputs.forEach(i => {
            if (!i.value.length) {
              i.value = value;

              const evt = document.createEvent("HTMLEvents");
              evt.initEvent("change", false, true);
              i.dispatchEvent(evt);
            }
          });
        }
      break;
      default:
        // nothing
      break;
    }
  }

  changeMonthRate(event, month, key) {
    if (!event.target.value.length) {
      return;
    }

    if (!isNumber(event.target.value)) {
      ToastService.error('Invalid number entered');
      return;
    }

    if (key === 'monthly_rate') {
      // set the night rate
      const today = new Date();
      const val = parseFloat(event.target.value);
      const days = getDaysInMonth(today.setMonth(month));

      const nightRate = (val / days).toFixed(2);
      const input: any = this.el.querySelector(`input[name="${this.name}[${month}][night_rate]"]`);

      if (input) {
        input.value = nightRate;
      }
    }
  }

  render() {
    const pricemodel = [
      {
        name: '<span>Monthly Rate</span>',
        key: 'monthly_rate',
        disabled: false,
      },
      {
        name: '<span>Night Rate</span>',
        key: 'night_rate',
        disabled: true,
      },
      {
        name: '<span>Security %</span>',
        key: 'security_deposit_percent',
        disabled: false
      },
      {
        name: '<span>Service Fee <br /> Host (%)</span>',
        key: 'service_fee_host',
        disabled: false
      },
      {
        name: '<span>Service Fee <br /> Client (%)</span>',
        key: 'service_fee_client',
        disabled: false
      }
    ];

    return [
      <div class="monthly-rates-wrapper">
        <table class="monthly-rates">
          <thead>
            <tr>
              <td></td>
              {
                [0,1,2,3,4,5].map(m => {
                  const date = new Date().setMonth(m);
                  return (
                    <td>{ formatDate(date, 'MMM') }</td>
                  )
                })
              }
            </tr>
          </thead>
          <tbody>
            {
              pricemodel.map(p =>
                <tr>
                  <td class="label" innerHTML={p.name}>
                  </td>

                  { [0,1,2,3,4,5].map(m => {
                    const classObj = {'apt212-input': true, block: true, 'rate-input': true };
                    classObj[p.key] = true;

                    return (
                      <td>
                        <input
                          type="text"
                          class={classObj}
                          name={`${this.name}[${m}][${p.key}]`}
                          value={this.rates.length ? this.rates.find(r => r.month == m)[p.key] : ''}
                          disabled={p.disabled}
                          onChange={e => this.changeMonthRate(e, m, p.key)}
                        />
                      </td>
                    )
                  })
                  }
                </tr>
              )
            }
          </tbody>
        </table>
      </div>,

      <div class="monthly-rates-wrapper">
        <table class="monthly-rates">
          <thead>
            <tr>
              <td></td>
              {
                [6,7,8,9,10,11].map(m => {
                  const date = new Date().setMonth(m);
                  return (
                    <td>{ formatDate(date, 'MMM') }</td>
                  )
                })
              }
            </tr>
          </thead>
          <tbody>
            {
              pricemodel.map(p =>
                <tr>
                  <td class="label" innerHTML={p.name}>
                  </td>

                  { [6,7,8,9,10,11].map(m => {
                    const classObj = {'apt212-input': true, block: true, 'rate-input': true };
                    classObj[p.key] = true;

                    return (
                      <td>
                        <input
                          type="text"
                          class={classObj}
                          name={`${this.name}[${m}][${p.key}]`}
                          value={this.rates.length ? this.rates.find(r => r.month == m)[p.key] : ''}
                          disabled={p.disabled}
                          onChange={e => this.changeMonthRate(e, m, p.key)}
                        />
                      </td>
                    )
                    })
                  }
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    ]
  }
}
