import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';
import { APIApartmentsService } from '../../../services/api/apartments';
import { ToastService } from '../../../services/toast.service';
import isNumber from 'is-number';

@Component({
  tag: 'listing-monthly-rate-form',
  styleUrl: 'listing-monthly-rate-form.scss'
})
export class ListingMonthlyRateForm {
  @Prop() item!: any;
  @Prop() month: number;

  input: HTMLInputElement;
  form: HTMLFormElement;

  @Event() updateSuccess: EventEmitter;

  componentDidLoad() {
    this.input.focus();
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (!isNumber(this.input.value)) {
      ToastService.error('Rate must be a number');
      return;
    }

    if (parseFloat(this.input.value) < 0) {
      ToastService.error('Rate must be a positive number');
      return;
    }

    let rates = [];
    rates[this.month] = {
      monthly_rate: this.input.value
    };

    const result = {
      id: this.item.id,
      rates
    };

    try {
      const apt = await APIApartmentsService.updateApt(result);

      this.updateSuccess.emit(apt);
    } catch (err) {
      ToastService.error(err.message);
    }
  }

  render() {
    return (
      <form class="listing-monthly-rate-form" onSubmit={e => this.handleSubmit(e)} ref={el => this.form = el as HTMLFormElement }>
        <input
          type="number"
          name="rate"
          value={this.item.rates.find(r => r.month == this.month).monthly_rate}
          autofocus
          ref={el => this.input = el as HTMLInputElement }
          onChange={e => this.handleSubmit(e)}
        />
      </form>
    )
  }
}
