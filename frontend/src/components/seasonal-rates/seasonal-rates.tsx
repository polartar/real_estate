import { Component, h, Prop } from '@stencil/core';
import { formatMoney, formatDate } from '../../helpers/utils';

@Component({
  tag: 'seasonal-rates',
  styleUrl: 'seasonal-rates.scss'
})
export class SeasonalRates {
  @Prop() item!: any;

  getMonth(monthNum) {
    // js uses 0 indexed months
    const date = new Date(new Date().setDate(1)).setMonth(monthNum);

    return formatDate(date, 'MMMM');
  }

  render() {
    const sortedRates = this.item.rates.filter(r => r.month !== 'default');

    sortedRates.sort((a, b) => {
      if (a.month === b.month) {
        return 0;
      }

      return parseInt(a.month) > parseInt(b.month) ? 1 : -1;
    });

    return (
      <div class="seasonal-rates-component">
        <h2>Seasonal Rates</h2>

        <p>
          Different seasons have different rates -- rates are reflected on the invoice based on the rates below.<br />
          If different months with different rates are selected the price displayed will be the amortized price.
        </p>

        {
          sortedRates.map(r => <div class="rate"><span class="month">{ this.getMonth(r.month)}</span><span class="value">{ formatMoney(r.display_rate) }</span></div>)
        }

      </div>
    )
  }
}
