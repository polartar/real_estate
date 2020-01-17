import { Component, h, Prop, State } from '@stencil/core';
import { Store } from '@stencil/redux';
import taxonomySelectors from '../../../store/selectors/taxonomy'
import serialize from 'form-serialize';
import { APINeighborhoodsService } from '../../../services/api/neighborhoods';
import { ToastService } from '../../../services/toast.service';
import neighborhoodSelectors from '../../../store/selectors/neighborhoods';

@Component({
  tag: 'listing-edit-form',
  styleUrl: 'listing-edit-form.scss'
})
export class ListingEditForm {
  @Prop({ context: "store" }) store: Store;
  @Prop() item: any;

  form: HTMLFormElement;
  neighborhoodsInput: HTMLInputElement;
  longitudeInput: HTMLInputElement;
  latitudeInput: HTMLInputElement;

  @State() geocodingInProgress: boolean = false;

  @State() isLoggedIn: boolean = false;
  @State() isAdmin: boolean = false;

  @State() bedroomTypes: any[];
  @State() buildingTypes: any[];
  @State() neighborhoods: any[];

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        bedroomTypes: taxonomySelectors.getBedroomTypes(state),
        buildingTypes: taxonomySelectors.getBuildingTypes(state),
        neighborhoods: taxonomySelectors.getNeighborhoods(state)
      }
    });
  }

  async onSubmit(e) {
    e.preventDefault();

    const result = serialize(this.form, { hash: true, empty: true });

    console.log(result);
  }

  async geocodeListing() {
    const results = serialize(this.form, { hash: true, empty: true });

    if (!results.address || !results.city || !results.state) {
      ToastService.error('Please enter an address, city, and state to find the latitude/longitude');
      return;
    }

    this.geocodingInProgress = true;

    let address = results.address;

    if (results.city) {
      address = address ? `${address} ${results.city}` : results.city;
    }

    if (results.state) {
      address = address ? `${address} ${results.state}` : results.state;
    }

    if (results.zip) {
      address = address ? `${address} ${results.zip}` : results.zip;
    }

    try {
      const result = await APINeighborhoodsService.geocodeAddress(address);

      this.longitudeInput.value = result.lng;
      this.latitudeInput.value = result.lat;

      const neighborhoodNames = result.neighborhoods.reduce((acc, v) => {
        if (acc.length) {
          acc = `${acc}, `;
        }

        return acc += v.name;
      }, '');

      this.neighborhoodsInput.value = neighborhoodNames;

    } catch(err) {
      ToastService.error(err.message);
    }

    this.geocodingInProgress = false;
  }

  async updateNeighborhoods() {
    if (!this.longitudeInput.value.length || !this.latitudeInput.value.length) {
      return;
    }

    try {
      const neighborhoods = await APINeighborhoodsService.neighborhoodsFromPoint(this.longitudeInput.value, this.latitudeInput.value);

      const neighborhoodNames = neighborhoods.reduce((acc, v) => {
        if (acc.length) {
          acc = `${acc}, `;
        }

        return acc += v.name;
      }, '');

      this.neighborhoodsInput.value = neighborhoodNames;

    } catch(err) {
      ToastService.error(err.message);
    }
  }

  render() {
    let neighborhoodsValue = '';
    if (this.item) {
      neighborhoodsValue = this.item.neighborhood_ids.reduce((acc, id) => {
        let names = acc.split(', ').filter(n => !!n);

        const n = neighborhoodSelectors.getNeighborhoodById(id, this.neighborhoods);
        if (n) {
          names.push(n.name);
        }

        return names.join(', ');
      }, neighborhoodsValue);
    }

    const bathroomOptions = [1, 1.5, 2, 2.5, 3, 3.5, 4];

    return [
      <div class="listing-edit-form-component">
        <form onSubmit={e => this.onSubmit(e)} ref={el => this.form = el as HTMLFormElement }>
          <fieldset>
            <h3>Address</h3>

            <div class="fieldset-inputs address">
              <div class="input">
                <label htmlFor="listing-webid">Web ID</label>
                <input id="listing-webid" name="id" class="apt212-input block" value={this.item ? this.item.id : ''} disabled />
              </div>

              <div class="input">
                <label htmlFor="owner-name">Owner Name</label>
                <input id="owner-name" name="owner_name" class="apt212-input block" value={this.item ? this.item.owner_name : ''}/>
              </div>

              <div class="input">
                <label htmlFor="address">Address</label>
                <input id="address" name="address" class="apt212-input block" value={this.item ? this.item.address : ''}/>
              </div>

              <div class="input">
                <label htmlFor="apt-num">Apt#</label>
                <input id="apt-num" name="apartment_number" class="apt212-input block" value={this.item ? this.item.apartment_number : ''} />
              </div>

              <div class="input">
                <label htmlFor="city">City</label>
                <input id="city" name="city" class="apt212-input block" value={this.item ? this.item.city : ''}/>
              </div>

              <div class="input">
                <label htmlFor="state">State</label>
                <input id="state" name="state" class="apt212-input block" value={this.item ? this.item.state : ''} />
              </div>

              <div class="input">
                <label htmlFor="zipcode">Zip</label>
                <input id="zipcode" name="zip" class="apt212-input block" value={this.item ? this.item.zip : ''} />
              </div>

              <div class="input">
                <label htmlFor="cross-streets">Cross Streets</label>
                <input id="cross-streets" name="cross_streets" class="apt212-input block" value={this.item ? this.item.cross_streets : ''} />
              </div>
            </div>

            <div class="flex-vertical-center action-button">
              <button type="button" class="button-dark" onClick={() => this.geocodeListing()}>Find Latitude/Longitude</button>
              {
                this.geocodingInProgress ?
                <ion-spinner name="lines" />
                : null
              }
            </div>


            <div class="fieldset-inputs address">
              <div class="input">
                <label htmlFor="neighborhoods">Neighborhoods</label>
                <input
                  id="neighborhoods"
                  name="neighborhoods"
                  value={neighborhoodsValue}
                  class="apt212-input block"
                  disabled
                  ref={el => this.neighborhoodsInput = el as HTMLInputElement }

                />
              </div>

              <div class="input">
                <label htmlFor="latitude">Latitude</label>
                <input
                  id="latitude"
                  name="latitude"
                  value={ this.item ? this.item.lat : '' }
                  class="apt212-input block"
                  ref={el => this.latitudeInput = el as HTMLInputElement }
                  onChange={() => this.updateNeighborhoods()}
                />
              </div>

              <div class="input">
                <label htmlFor="longitude">Longitude</label>
                <input
                  id="longitude"
                  name="longitude"
                  value={ this.item ? this.item.lng : '' }
                  class="apt212-input block"
                  ref={el => this.longitudeInput = el as HTMLInputElement }
                  onChange={() => this.updateNeighborhoods()}
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <h3>Description</h3>

            <div class="fieldset-inputs description">
              <div class="input">
                <label htmlFor="listing-title">Title</label>
                <input
                  id="listing-title"
                  name="title"
                  class="apt212-input block"
                  value={this.item ? this.item.title : ''}
                />
              </div>

              <div class="input">
                <label htmlFor="listing-description">Description</label>
                <textarea
                  id="listing-description"
                  name="description"
                  class="apt212-input block"
                >
                  { this.item ? this.item.description : '' }
                </textarea>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <h3>Features</h3>

            <div class="fieldset-inputs features">
              <div class="input">
                <label htmlFor="listing-bedrooms">Bedrooms</label>
                <select id="listing-bedrooms" class="apt212-input block" name="bedroom_type_id">
                  {
                    this.bedroomTypes.map(b =>
                      <option value={b.id} selected={this.item ? this.item.bedroom_type_id === b.id : false}>
                        {b.name}
                      </option>
                    )
                  }
                </select>
              </div>

              <div class="input">
                <label htmlFor="listing-bathrooms">Bathrooms</label>
                <select id="listing-bathrooms" class="apt212-input block" name="bathrooms">
                  {
                    bathroomOptions.map(b =>
                      <option value={b} selected={this.item ? this.item.bathrooms === b : false}>{b}</option>
                    )
                  }
                </select>
              </div>

              <div class="input">
                <label htmlFor="listing-buildingtype">Building Type</label>
                <select id="listing-buildingtype" class="apt212-input block" name="building_type_id">
                  {
                    this.buildingTypes.map(b =>
                      <option value={b.id} selected={this.item ? this.item.building_type_id === b.id : false}>
                        {b.name}
                      </option>
                    )
                  }
                </select>
              </div>

              <div class="input">
                <label htmlFor="listing-floor">Floor</label>
                <input
                  id="listing-floor"
                  class="apt212-input block"
                  name="floor"
                  value={this.item ? this.item.floor : ''}
                />
              </div>

              <div class="input">
                <label htmlFor="listing-size">Square Footage</label>
                <input
                  id="listing-size"
                  class="apt212-input block"
                  name="size"
                  value={this.item ? this.item.size : ''}
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <h3>Subways</h3>

            <div class="fieldset-inputs subways">

            </div>
          </fieldset>

          <input type="submit" class="button-dark" value="Submit" />
        </form>
      </div>
    ]
  }
}
