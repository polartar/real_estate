import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';
import { formatDate } from '../../../helpers/utils';
import { APIApartmentsService } from '../../../services/api/apartments';
import { ToastService } from '../../../services/toast.service';

@Component({
  tag: 'listing-availability-form',
  styleUrl: 'listing-availability-form.scss'
})
export class ListingAvailabilityForm {
  @Prop() item!: any;

  input: HTMLInputElement;
  form: HTMLFormElement;

  @Event() updateSuccess: EventEmitter;

  componentDidLoad() {
    this.input.focus();
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (!/^\d{1,2}\.\d{1,2}\.\d{4}$/.test(this.input.value)) {
      ToastService.error('Invalid date format');
      return;
    }

    const dateParts = this.input.value.split('.');

    // convert from dot-notation date
    const date = `${dateParts[0]}/${dateParts[1]}/${dateParts[2]}`;

    const result = {
      id: this.item.id,
      available_date: formatDate(date, 'm/d/Y')
    }

    try {
      const apt = await APIApartmentsService.updateApt(result);

      this.updateSuccess.emit(apt);
    } catch (err) {
      ToastService.error(err.message);
    }
  }

  render() {
    return (
      <form class="listing-availability-form" onSubmit={e => this.handleSubmit(e)} ref={el => this.form = el as HTMLFormElement }>
        <input
          type="text"
          name="availability"
          value={formatDate(this.item.available_date)}
          autofocus
          ref={el => this.input = el as HTMLInputElement }
          onChange={e => this.handleSubmit(e)}
        />
      </form>
    )
  }
}
