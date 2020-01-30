import { Component, h, Prop, State, Element, Event, EventEmitter } from '@stencil/core';
import { Store } from '@stencil/redux';
import taxonomySelectors from '../../../store/selectors/taxonomy'
import serialize from 'form-serialize';
import { APINeighborhoodsService } from '../../../services/api/neighborhoods';
import { ToastService } from '../../../services/toast.service';
import neighborhoodSelectors from '../../../store/selectors/neighborhoods';
import { APIApartmentsService } from '../../../services/api/apartments';
import { formatDate } from '../../../helpers/utils';

//@ TODO - date input modal close/sizing

@Component({
  tag: 'listing-edit-form',
  styleUrl: 'listing-edit-form.scss'
})
export class ListingEditForm {
  @Prop({ context: "store" }) store: Store;

  @Element() el: HTMLElement;

  @Prop() item: any;

  @Event() success: EventEmitter;

  form: HTMLFormElement;
  neighborhoodsInput: HTMLInputElement;
  longitudeInput: HTMLInputElement;
  latitudeInput: HTMLInputElement;
  subwayInputs: HTMLElement;
  amenityInputs: HTMLElement;
  blockDateStartInput: HTMLElement;
  blockDateEndInput: HTMLElement;
  monthRatesInput: HTMLInputMonthRatesElement;

  @State() geocodingInProgress: boolean = false;
  @State() blockedDateErrors: string[] = [];
  @State() blockedDates: any[] = [];

  @State() isLoggedIn: boolean = false;
  @State() isAdmin: boolean = false;

  @State() bedroomTypes: any[];
  @State() buildingTypes: any[];
  @State() neighborhoods: any[];
  @State() subways: any[];
  @State() amenities: any[];

  @State() submitting: boolean = false;

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        bedroomTypes: taxonomySelectors.getBedroomTypes(state),
        buildingTypes: taxonomySelectors.getBuildingTypes(state),
        neighborhoods: taxonomySelectors.getNeighborhoods(state),
        subways: taxonomySelectors.getSubways(state),
        amenities: taxonomySelectors.getAmenities(state)
      }
    });

    this.blockedDates = this.item && this.item.block_dates ? this.item.block_dates : [];
  }

  componentDidLoad() {
    // trigger change events on monthly-rates inputs
    const monthlyRatesInputs: any = this.el.querySelectorAll('input.rate-input.monthly_rate');

    monthlyRatesInputs.forEach(input => {
      const evt = document.createEvent("HTMLEvents");
      evt.initEvent("change", false, true);
      input.dispatchEvent(evt);
    });
  }

  async onSubmit(e) {
    e.preventDefault();

    this.submitting = true;

    const formValues = serialize(this.form, { hash: true, empty: true });

    try {
      const apt: any = await APIApartmentsService.updateApt(formValues);

      this.submitting = false;

      ToastService.success('Apartment has been saved');
      this.success.emit(apt);

    } catch(err) {
      ToastService.error(err.message);

      this.submitting = false;
    }
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

  selectSubway(e, subway) {
    e.currentTarget.classList.toggle('selected');

    if (e.currentTarget.classList.contains('selected')) {
      const input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', 'subways[]');
      input.value = subway.id;

      this.subwayInputs.appendChild(input);
    }
    else {
      const input: any = this.subwayInputs.querySelector('input[value="' + subway.id + '"]');
      if (input) {
        input.remove();
      }
    }
  }

  selectAmenity(e, amenity) {
    e.currentTarget.classList.toggle('selected');

    if (e.currentTarget.classList.contains('selected')) {
      const input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', 'amenities[]');
      input.value = amenity.id;

      this.amenityInputs.appendChild(input);
    }
    else {
      const input: any = this.amenityInputs.querySelector('input[value="' + amenity.id + '"]');
      if (input) {
        input.remove();
      }
    }
  }

  addBlockedDate() {
    const startDate = this.blockDateStartInput.getAttribute('value');
    const endDate = this.blockDateEndInput.getAttribute('value');

    if (!startDate || !endDate) {
      this.blockedDateErrors = ['Please select a start/end date'];
      return;
    }

    if (new Date(endDate) <= new Date(startDate)) {
      this.blockedDateErrors = ['End date must be after the start date'];
      return;
    }

    this.blockedDates = [...this.blockedDates, { start: startDate, end: endDate }];

    this.blockedDateErrors = [];
    this.blockDateStartInput.setAttribute('value', '');
    this.blockDateEndInput.setAttribute('value', '');
  }

  removeBlockedDate(index) {
    const blockedDates = [...this.blockedDates];

    blockedDates.splice(index, 1);

    this.blockedDates = blockedDates;
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
            <h3>1. Address</h3>

            <div class="fieldset-inputs address">
              <div class="input">
                <label htmlFor="listing-webid">Web ID</label>
                <input type="text" id="listing-webid" class="apt212-input block" value={this.item ? this.item.id : ''} disabled />
                <input type="hidden" name="id" value={this.item ? this.item.id : ''} />
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
                  name="lat"
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
                  name="lng"
                  value={ this.item ? this.item.lng : '' }
                  class="apt212-input block"
                  ref={el => this.longitudeInput = el as HTMLInputElement }
                  onChange={() => this.updateNeighborhoods()}
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <h3>2. Description</h3>

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
            <h3>3. Features</h3>

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
            <h3>4. Subways</h3>

            <div class="fieldset-inputs subways">
              {
                this.subways.map(s => {
                  return (
                    <button
                      type="button"
                      class={{ 'button-reset': true, subway: true, selected: (this.item && !!this.item.subways.filter(v => v.id === s.id).length) }}
                      aria-label={`Subway station ${s.name}`}
                      onClick={e => this.selectSubway(e, s)}
                    >
                      <img src={s.icon} alt={s.name} />
                    </button>
                  )
                })
              }
            </div>
            <div class="subways-inputs" ref={el => this.subwayInputs = el as HTMLElement }>
              {
                this.item && this.item.subways.map(s =>
                  <input type="hidden" name="subways[]" value={s.id} />
                )
              }
            </div>
          </fieldset>

          <fieldset>
            <h3>5. Amenities</h3>

            <div class="fieldset-inputs amenities">
              {
                this.amenities.map(a => {
                  return (
                    <button
                      type="button"
                      class={{ 'button-reset': true, amenity: true, selected: (this.item && !!this.item.amenities.filter(v => v.id === a.id).length) }}
                      aria-label={`${a.name}`}
                      onClick={e => this.selectAmenity(e, a)}
                    >
                      <img src={a.icon} alt={a.name} /> {a.name}
                    </button>
                  )
                })
              }
            </div>
            <div class="amenities-inputs" ref={el => this.amenityInputs = el as HTMLElement }>
              {
                this.item && this.item.amenities.map(a =>
                  <input type="hidden" name="amenities[]" value={a.id} />
                )
              }
            </div>
          </fieldset>

          <fieldset>
            <h3>6. Availability</h3>

            <div class="fieldset-inputs availability">
              <div class="input">
                <label htmlFor="next-available-date">Next Available Date</label>
                <input-date
                  name="available_date"
                  label="Next Available Date"
                  help-text="Select the next day the listing is available"
                  value={this.item ? this.item.available_date : ''}
                />
              </div>

              <div class="block-dates">
                <div>
                  <strong>Blocked Dates</strong>
                  <div class="help-text">Dates listed here will be unable to be booked</div>
                </div>

                {
                  this.blockedDates.length ?
                    this.blockedDates.map((d, index) =>
                      <div class="block-date">
                        { formatDate(d.start, 'm/d/y') } - { formatDate(d.end, 'm/d/y')}

                        <button type="button" class="button-reset" onClick={() => this.removeBlockedDate(index)}>
                          <ion-icon name="close" />
                        </button>

                        <input type="hidden" name="block_dates[start][]" value={d.start} />
                        <input type="hidden" name="block_dates[end][]" value={d.end} />
                      </div>
                    )
                  : <div class="placeholder">No dates are currently blocked</div>
                }
                <input type="hidden" name="block_dates_update" value={1} />
              </div>

              <div class="block-date-input hidden">
                <div class="input start">
                  <label htmlFor="block-date-input-start-placeholder">Start</label>
                  <input-date
                    id="block-date-input-start-placeholder"
                    value=""
                    label="Start of blocked dates"
                    ref={el => this.blockDateStartInput = el as HTMLElement }
                  />
                </div>

                <div class="input end">
                  <label htmlFor="block-date-input-end-placeholder">End</label>
                  <input-date
                    id="block-date-input-end-placeholder"
                    value=""
                    label="End of blocked dates"
                    ref={el => this.blockDateEndInput = el as HTMLElement }
                  />
                </div>

                <div>
                  {
                    this.blockedDateErrors.length ?
                      <div class="errors">
                        {
                          this.blockedDateErrors.map(e => <div>{e}</div>)
                        }
                      </div>
                    : null
                  }
                  <button type="button" class="button-dark" onClick={() => this.addBlockedDate() }>Add to blocked dates</button>
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <h3>7. Pricing</h3>
            <input-pricing
              name="rates"
              rate={this.item ? this.item.rates.find(r => r.month === 'default') : null }
              onRateChanged={e => this.monthRatesInput.updateDefault(e.detail.key, e.detail.value)}
            />
          </fieldset>

          <fieldset>
            <h3>8. Month Specific Rates</h3>
            <input-month-rates
              name="rates"
              rates={this.item ? this.item.rates : []}
              ref={el => this.monthRatesInput = el as HTMLInputMonthRatesElement}
            />
          </fieldset>

          <fieldset>
            <h3>9. Utilities/Move out fee</h3>
            <input-utilities item={this.item ? this.item : null } />
          </fieldset>

          <fieldset>
            <h3>10. Payment Time Line</h3>

            <input-payment-timeline item={this.item ? this.item : null} />
          </fieldset>

          <fieldset>
            <h3>11. Images</h3>
            <input-image
              name="images"
              value={this.item ? this.item.images : [] }
              has-description
            />
          </fieldset>

          <fieldset>
            <h3>12. Floorplan</h3>
            <input-image
              name="floor_plans"
              limit={3}
              value={this.item ? this.item.floor_plans : []}
            />
          </fieldset>

          <fieldset>
            <h3>13. Video</h3>

            <div class="fieldset-inputs video">
              <div class="input">
                <label htmlFor="listing-video" class="sr-only">Video</label>
                <input
                  id="listing-video"
                  name="video_url"
                  class="apt212-input block"
                  placeholder="https://www.youtube.com/watch?v=xxxxxxxxxxxx"
                  value={this.item ? this.item.video_url : ''}
                />
                <div class="help-text">Enter a Youtube video URL</div>
              </div>
            </div>
          </fieldset>

          <input type="submit" class="button-dark" value="Save" disabled={this.submitting} />
        </form>
      </div>
    ]
  }
}
