import { Component, h, Prop } from '@stencil/core';
import { APIAdminService } from '../../../services/api/admin';
import serialize from 'form-serialize';
import { ToastService } from '../../../services/toast.service';

@Component({
  tag: 'owner-global-form',
  styleUrl: 'owner-global-form.scss'
})
export class OwnerGlobalForm {
  @Prop() owners!: any[];

  monthRatesInput: HTMLInputMonthRatesElement;

  async onSubmit(e) {
    e.preventDefault();
    const formValues = serialize(e.target, { hash: true });

    try {
      await APIAdminService.updateOwnerGlobal(formValues);

      ToastService.success('Owner listings have been updated');
    } catch(err) {
      ToastService.error(err.message);
    }
  }

  render() {
    return (
      <form class="owner-global-form" onSubmit={e => this.onSubmit(e)}>
        <fieldset>
          <h3>Global Change To Owner</h3>
          <p>Note: only fields that are given values will be updated. <br />
            eg. if you leave "Background Check" blank then the current background check values will be left alone
          </p>

          <div class="input">
            <label htmlFor="owners-input">Owner</label>
            <select name="owner_name" id="owners-input" class="apt212-input block">
              <option value=""></option>
              {
                this.owners.map(o => <option value={o}>{o}</option>)
              }
            </select>
          </div>
        </fieldset>

        <fieldset>
          <h3>Pricing</h3>

          <input-pricing name="rates" onRateChanged={e => this.monthRatesInput.updateDefault(e.detail.key, e.detail.value)} />
        </fieldset>

        <fieldset>
          <h3>Month Specific Rates</h3>
          <input-month-rates
              name="rates"
              rates={[]}
              ref={el => this.monthRatesInput = el as HTMLInputMonthRatesElement}
            />
        </fieldset>

        <fieldset>
          <h3>Utilities</h3>
          <input-utilities />
        </fieldset>

        <fieldset>
          <h3>Payment Timeline</h3>
          <input-payment-timeline />
        </fieldset>

        <input type="submit" class="button-dark" value="Save" />
      </form>
    )
  }
}
