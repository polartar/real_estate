import { Component, h, Prop, Element } from '@stencil/core';
import isNumber from 'is-number';

@Component({
  tag: 'input-utilities',
  styleUrl: 'input-utilities.scss'
})
export class InputUtilities {
  @Element() el: HTMLElement;

  @Prop() item: any;

  utilitiesChanged() {
    const inputs: any = this.el.querySelectorAll('input.utility');

    let sum = 0;
    inputs.forEach(i => {
      if (i.value && isNumber(i.value)) {
        sum += parseFloat(i.value);
      }
    });

    const utilitiesTotal: any = this.el.querySelector('#listing-monthly-utilities');
    if (utilitiesTotal) {
      utilitiesTotal.value = sum.toFixed(2);
    }
  }

  render() {
    return (
      <div class="input-utilities-component fieldset-inputs utilities">
        <div class="input">
          <label htmlFor="listing-cable">Cable</label>
          <input
            type="text"
            id="listing-cable"
            name="utility_cable"
            class="apt212-input block utility"
            value={this.item ? this.item.utility_cable : ''}
            onChange={() => this.utilitiesChanged()}
          />
        </div>

        <div class="input">
          <label htmlFor="listing-wifi">Wifi</label>
          <input
            type="text"
            id="listing-wifi"
            name="utility_wifi"
            class="apt212-input block utility"
            value={this.item ? this.item.utility_wifi : ''}
            onChange={() => this.utilitiesChanged()}
          />
        </div>

        <div class="input">
          <label htmlFor="listing-electricity">Electricity</label>
          <input
            type="text"
            id="listing-electricity"
            name="utility_electricity"
            class="apt212-input block utility"
            value={this.item ? this.item.utility_electricity : ''}
            onChange={() => this.utilitiesChanged()}
          />
        </div>

        <div class="input">
          <label htmlFor="listing-cleaning">Monthly Cleaning</label>
          <input
            type="text"
            id="listing-cleaning"
            name="utility_cleaning"
            class="apt212-input block utility"
            value={this.item ? this.item.utility_cleaning : ''}
            onChange={() => this.utilitiesChanged()}
          />
        </div>

        <div class="input">
          <label htmlFor="listing-monthly-utilities">Total Monthly Utilities</label>
          <input
            type="number"
            id="listing-monthly-utilities"
            name="monthly_utilities"
            class="apt212-input block"
            value={this.item ? this.item.monthly_utilities.toFixed(2) : ''}
            disabled
          />
        </div>

        <div class="input">
          <label htmlFor="listing-moveout-fee">Move out fee</label>
          <input
            type="number"
            id="listing-moveout-fee"
            name="move_out_fee"
            class="apt212-input block"
            value={this.item ? this.item.move_out_fee : ''}
            step={0.01}
          />
        </div>
      </div>
    )
  }
}
