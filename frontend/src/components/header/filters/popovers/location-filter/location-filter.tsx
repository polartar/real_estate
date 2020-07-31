import { Component, h, Prop, State, Element} from '@stencil/core';
import { Store, Action } from '@stencil/redux';
import { setLocationFilters } from '../../../../../store/actions/search';
import { searchFilterSelectors } from '../../../../../store/selectors/search';
import neighborhoodSelectors from '../../../../../store/selectors/neighborhoods';
import Debounce from 'debounce-decorator';

@Component({
  tag: 'location-filter',
  styleUrl: 'location-filter.scss'
})
export class LocationFilter {
  @Prop({ context: "store" }) store: Store;
  @Prop() inModal: boolean = false;
  @State() neighborhoods: any[] = [];
  @State() regions: any[] = [];
  @Element() el: HTMLElement;
  setLocationFilters: Action;
  value: Number[];

  // whether to check the region control for status after
  // changing a neighborhood checkbox
  enableRegionCheck: boolean = true;

  enableNeighborhoodCheck: boolean = true;

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        regions: neighborhoodSelectors.getRegions(state),
        neighborhoods: neighborhoodSelectors.getNeighborhoods(state),
        value: searchFilterSelectors.getLocations(state)
      }
    });

    this.store.mapDispatchToProps(this, {
      setLocationFilters: setLocationFilters
    });
  }

  closePopover() {
    const popover = this.el.closest('apt212-popover');

    if (popover) {
      popover.dismiss();
    }
  }

  regionChange(e) {
    const container = e.target.closest('.region-container');
    const checkboxes = container.querySelectorAll('apt212-checkbox.neighborhood');

    if (!this.enableNeighborhoodCheck) {
      return;
    }

    this.enableRegionCheck = false;

    let promises = [];

    checkboxes.forEach(checkbox => {
      if (!!e.detail.checked) {
        promises.push(checkbox.check());
      }
      else {
        promises.push(checkbox.uncheck());
      }
    });

    Promise.all(promises).then(() => {
      this.enableRegionCheck = true;
    });
  }

  @Debounce(100)
  async neighborhoodChanged(e) {
    const container = e.target.closest('.region-container');
    const regionCB = container.querySelector('apt212-checkbox.region');

    if (this.enableRegionCheck) {
      this.enableNeighborhoodCheck = false;

      if (!!e.detail.checked) {
        // if all other ones in this region are checked
        // then check the region box
        const checkboxes = container.querySelectorAll('apt212-checkbox.neighborhood');

        let promises = [];

        checkboxes.forEach(async checkbox => {
          promises.push(checkbox.isChecked());
        });

        let result = await Promise.all(promises);

        if (!result.includes(false)) {
          await regionCB.check();
        }
      }
      else {
        // unchecked, so we uncheck the region
        await regionCB.uncheck();
      }

      this.enableNeighborhoodCheck = true;
    }

    this.saveState();
  }

  onSubmit(e) {
    e.preventDefault();
  }

  toggleAll(on) {
    const checkboxes: any = this.el.querySelectorAll('apt212-checkbox.region');

    checkboxes.forEach(checkbox => {
      if (on) {
        checkbox.check();
      }
      else {
        checkbox.uncheck();
      }
    });
  }

  async saveState() {
    const checkboxes: any = this.el.querySelectorAll('apt212-checkbox.neighborhood');

    const promises = [];

    checkboxes.forEach(cb => {
      promises.push(new Promise(async resolve => {
        const isChecked = await cb.isChecked();

        resolve({
          id: cb.getAttribute('value'),
          checked: isChecked
        });
      }));
    });

    Promise.all(promises).then(result => {
      const value = result.filter(v => v.checked).map(v => parseInt(v.id));

      this.setLocationFilters(value);

      this.value = value;
    });
  }

  render() {
    return (
      <div class="location-filter">
        <div class="toolbar">
          <button aria-label="Select All" class="button-dark select-all outline" onClick={() => this.toggleAll(true)}>Select All</button>
          <button aria-label="Clear All" class="button-light clear-all outline" onClick={() => this.toggleAll(false)}>Clear All</button>

          <div class="spacer" />

          { this.inModal ?
          <ion-button aria-label="close" fill="clear" class="close reset" onClick={() => this.closePopover()}>
            <ion-icon src="/assets/images/icons/cancel.svg" slot="icon-only" />
          </ion-button>
          : null }
        </div>

        <div>
          <form onSubmit={e => this.onSubmit(e)} novalidate>

            <div class="checkboxes-container">
            {this.regions.map((region, regionIndex) => {

              /**
               *  WARNING - HACKY SHIT AHEAD
               *  NOTHING I CAN DO ABOUT IT THOUGH
               *  CLIENTS MAKE THE DECISIONS THAT ARE THE MOST COMPLICATED
               *  ON A VERY REGULAR BASIS, EVEN WHEN IT CLEARLY GOES AGAINST THEIR
               *  BEST INTEREST.
               * 
               *  MAKE STUPID DECISIONS, GET STUPID CODE.
               */

              // don't render the 4th region
              // we're rendering it in the loop for the 3rd region
              // to group them up
              // blech!
              if (regionIndex === 3) {
                return null;
              }

              let regionCheckboxProps: any = {
                name: region.name,
                class: 'region',
                onCheckBoxChange: e => this.regionChange(e),
                checked: "checked",
              };

              this.neighborhoods.forEach(neighborhood => {
                if (neighborhood.region_id === region.id && this.value.indexOf(neighborhood.id) === -1) {
                  regionCheckboxProps.checked = false;
                  regionCheckboxProps['data-checked'] = false;
                }
              });


              // if we're rendering region #3,
              // also render region #4 in the same column
              // ugh, this is fucking ugly shit
              let nextRegionCheckboxProps: any;
              if (regionIndex === 2) {
                nextRegionCheckboxProps = {
                  name: this.regions[regionIndex + 1].name,
                  class: 'region',
                  onCheckBoxChange: e => this.regionChange(e),
                  checked: "checked",
                }

                this.neighborhoods.forEach(neighborhood => {
                  if (neighborhood.region_id === this.regions[regionIndex + 1].id && this.value.indexOf(neighborhood.id) === -1) {
                    nextRegionCheckboxProps.checked = false;
                    nextRegionCheckboxProps['data-checked'] = false;
                  }
                });
              }

              return(
                <div class="region-column">
                  <div class="region-container">
                    <apt212-checkbox {...regionCheckboxProps}>
                      {region.name}
                    </apt212-checkbox>

                    <div class="neighborhoods-container">
                      {this.neighborhoods.map(neighborhood => {
                        if (neighborhood.region_id !== region.id) {
                          return null;
                        }

                        let checkboxProps: any = {
                          name: neighborhood.name,
                          value: neighborhood.id,
                          class: 'neighborhood',
                          onCheckBoxChange: e => this.neighborhoodChanged(e),
                        };

                        if (this.value.indexOf(neighborhood.id) > -1) {
                          checkboxProps.checked = 'checked';
                        }

                        return (
                          <apt212-checkbox {...checkboxProps}>
                            {neighborhood.name}
                          </apt212-checkbox>
                        )
                      })}
                    </div>
                  </div>

                  {
                    // and then we just re-do the column for the next
                    // region if we're rendering index 2
                    // fucking hell
                    // I'm never putting this in a resume that's for sure
                    regionIndex === 2 ? 
                      <div class="region-container">
                        <apt212-checkbox {...nextRegionCheckboxProps}>
                          {this.regions[regionIndex + 1].name}
                        </apt212-checkbox>

                        <div class="neighborhoods-container">
                          {this.neighborhoods.map(neighborhood => {
                            if (neighborhood.region_id !== this.regions[regionIndex + 1].id) {
                              return null;
                            }

                            let checkboxProps: any = {
                              name: neighborhood.name,
                              value: neighborhood.id,
                              class: 'neighborhood',
                              onCheckBoxChange: e => this.neighborhoodChanged(e),
                            };

                            if (this.value.indexOf(neighborhood.id) > -1) {
                              checkboxProps.checked = 'checked';
                            }

                            return (
                              <apt212-checkbox {...checkboxProps}>
                                {neighborhood.name}
                              </apt212-checkbox>
                            )
                          })}
                        </div>
                      </div>
                    : null
                  }
                </div>
              )}
            )}
            </div>
          </form>
        </div>
      </div>
    )
  }
}
