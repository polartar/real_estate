import { Component, h, Prop, Element } from '@stencil/core';
import serialize from 'form-serialize';
import { APIApartmentsService } from '../../../services/api/apartments';
import { ToastService } from '../../../services/toast.service';
import { formatDate } from '../../../helpers/utils';

@Component({
  tag: 'listing-attribute-update-modal',
  styleUrl: 'listing-attribute-update-modal.scss'
})
export class ListingAttributeUpdateModal {
  @Element() el: HTMLElement;

  @Prop() item!: any;
  @Prop() attribute!: string;
  @Prop() month: number|null = null;

  close(value) {
    const modal: any = this.el.closest('ion-modal');

    modal.dismiss(value);
  }

  getValue() {
    const rateTypes = ['monthly_rate', 'tax_percent', 'background_check_rate', 'service_fee_host', 'service_fee_client', 'security_deposit_percent'];

    if (rateTypes.includes(this.attribute)) {
      return this.item.rates.find(r => r.month == this.month)[this.attribute];
    }

    return this.item[this.attribute];
  }

  async onSubmit(e) {
    e.preventDefault();

    let result = serialize(e.target, {hash: true});

    const rateTypes = ['monthly_rate', 'tax_percent', 'background_check_rate', 'service_fee_host', 'service_fee_client', 'security_deposit_percent'];
    if (rateTypes.includes(this.attribute)) {
      const value = result[this.attribute];

      result = { rates: [] };

      result.rates[this.month] = {};
      result.rates[this.month][this.attribute] = value;
    }

    result.id = this.item.id;

    try {
      const apt = await APIApartmentsService.updateApt(result);

      this.close(apt);

    } catch (err) {
      ToastService.error(err.message);
    }
  }

  render() {
    console.log(this.attribute, this.month, this.item);

    const dateTypes = [
      'available_date'
    ];

    const numberTypes = [
      'size', 'utility_cable', 'utility_wifi', 'utility_electricity', 'utility_cleaning', 'move_out_fee', 'months_due_on_checkin', 'days_due_on_checkin',
      'doci_advance_payment_days', 'rating', 'lat', 'lng', 'monthly_rate', 'tax_percent', 'background_check_rate', 'service_fee_host', 'service_fee_client',
      'security_deposit_percent'
    ];

    const textTypes = [
      'onwer_name', 'address', 'zip', 'city', 'state', 'apartment_number', 'floor', 'cross_streets', 'video_url', 'title', 'description'
    ];

    return (
      <div class="listing-attribute-update-modal-component">
        <button onClick={() => this.close(null)} class="button-reset close"><img src="/assets/images/icons/cancel.svg" /></button>

        <h3>Update Apartment</h3>
        {
          this.month !== null ?
            <div>Month: { formatDate(new Date(new Date().setDate(1)).setMonth(this.month), 'MMM') }</div>
          : null
        }

        <form onSubmit={e => this.onSubmit(e)} >
          {
            dateTypes.includes(this.attribute) ?
              <div class="input">
                <input-date value={this.getValue()} name={this.attribute} />
              </div>
            : null
          }

          {
            numberTypes.includes(this.attribute) ?
              <div class="input">
                <input type="number" step="0.01" name={this.attribute} value={this.getValue()} class="apt212-input block" />
              </div>
            : null
          }

          {
            textTypes.includes(this.attribute) ?
              <div class="input">
                <input type="text" name={this.attribute} value={this.getValue()} class="apt212-input block" />
              </div>
            : null
          }

          <input type="submit" class="button-dark block" value="submit" />
        </form>

      </div>
    )
  }
}
