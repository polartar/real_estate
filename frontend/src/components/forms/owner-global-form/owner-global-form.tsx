import { Component, h, Prop } from '@stencil/core';
import serialize from 'form-serialize';

@Component({
  tag: 'owner-global-form',
  styleUrl: 'owner-global-form.scss'
})
export class OwnerGlobalForm {
  @Prop() owners!: any[];

  monthRatesInput: HTMLInputMonthRatesElement;

  onSubmit(e) {
    e.preventDefault();
    const formValues = serialize(e.target, { hash: true });

    console.log(formValues);
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
            <select name="owner" id="owners-input" class="apt212-input block">
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

        <input type="submit" class="button-dark" value="Save" />
      </form>
    )
  }
}
