import { Component, h, State } from '@stencil/core';
import { APIAdminService } from '../../../services/api/admin';
import serialize from 'form-serialize';
import { ToastService } from '../../../services/toast.service';

@Component({
  tag: 'owner-global-form',
  styleUrl: 'owner-global-form.scss'
})
export class OwnerGlobalForm {
  @State() owners: any[] = [];
  @State() selectedOwner: string;
  @State() ownerStats: any = null;
  @State() loaded: boolean = false;

  monthRatesInput: HTMLInputMonthRatesElement;

  async componentDidLoad() {
    try {
      const owners = await APIAdminService.getAptOwners();

      this.loaded = true;
      this.owners = owners;
    }
    catch (e) {
      this.loaded = true; // just show the 404
      ToastService.error(e.message);
    }
  }

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

  async getOwnerStats(e) {
    if (!e.target.value) {
      this.ownerStats = null;
      return;
    }

    try {
      const stats = await APIAdminService.getOwnerStats(e.target.value);
      this.ownerStats = stats;
    } catch(err) {
      ToastService.error(err.message);
    }
  }

  render() {
    return (
      <div class="owner-global-form-component">
        {
          this.loaded && this.owners.length ?
            <form class="owner-global-form" onSubmit={e => this.onSubmit(e)}>
              <fieldset>
                <h3>Global Change To Owner</h3>
                <p>Note: only fields that are given values will be updated. <br />
                  eg. if you leave "Background Check" blank then the current background check values will be left alone
                </p>

                <div class="input">
                  <label htmlFor="owners-input">Owner</label>
                  <select name="owner_name" id="owners-input" class="apt212-input block" onChange={e => this.getOwnerStats(e)}>
                    <option value=""></option>
                    {
                      this.owners.map(o => <option value={o}>{o}</option>)
                    }
                  </select>
                </div>

                {
                  this.ownerStats !== null ?
                    <div class="owner-stats">
                      <h4>Owner Listings</h4>
                      <div class="listing-stat">All: {this.ownerStats.total}</div>
                      <div class="listing-stat">Active: {this.ownerStats.active}</div>
                      <div class="listing-stat">Inactive: {this.ownerStats.inactive}</div>
                    </div>
                  : null
                }
              </fieldset>

              <fieldset>
                <h3>7. Pricing</h3>

                <input-pricing
                  name="rates"
                  disableKeys={['monthly_rate']}
                  onRateChanged={e => this.monthRatesInput.updateDefault(e.detail.key, e.detail.value)}
                />
              </fieldset>

              <fieldset>
                <h3>8. Month Specific Rates</h3>
                <input-month-rates
                    name="rates"
                    rates={[]}
                    disableKeys={['monthly_rate', 'night_rate']}
                    ref={el => this.monthRatesInput = el as HTMLInputMonthRatesElement}
                  />
              </fieldset>

              <fieldset>
                <h3>9. Utilities/Move out fee</h3>
                <input-utilities />
              </fieldset>

              <fieldset>
                <h3>10. Payment Timeline</h3>
                <input-payment-timeline />
              </fieldset>

              <input type="submit" class="button-dark" value="Save" />
            </form>
          : null
        }

        {
          !this.loaded ?
            <div class="text-center">
              <ion-spinner name="lines" />
            </div>
          : null
        }

        {
          (this.loaded && !this.owners.length) ?
            <div class="text-center">
              No owners were found to update
            </div>
          : null
        }
      </div>
    )
  }
}
