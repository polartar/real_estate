import { Component, h, Prop, State, Element} from '@stencil/core';
import { Store, Action } from '@stencil/redux';
import { setLocationFilters } from '../../../../../store/actions/search-filters';

@Component({
  tag: 'location-filter',
  styleUrl: 'location-filter.scss'
})
export class LocationFilter {
  @Prop({ context: "store" }) store: Store;
  @Prop() inModal: boolean = false;
  @State() neighborhoods: any = {};
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
        neighborhoods: state.neighborhoods.neighborhoods,
        value: state.searchFilters.filters.location
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

  check(cb) {
    cb.setAttribute('checked', 'checked');
    cb.setAttribute('data-checked', 'checked');
  }

  uncheck(cb) {
    cb.removeAttribute('checked');
    cb.removeAttribute('data-checked');
  }

  isChecked(cb) {
    return !!cb.getAttribute('checked') || !!cb.getAttribute('data-checked');
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

  async neighborhoodChange(e) {
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

    if (e.detail.checked) {
      this.value.push(parseInt(e.detail.value));
    }
    else {
      this.value = this.value.filter(val => {
        return val !== parseInt(e.detail.value);
      })
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

  saveState() {
    this.setLocationFilters(this.value);
  }

  render() {
    return (
      <div class="location-filter">
        <div class="toolbar">
          <button aria-label="Select All" class="button-dark" onClick={() => this.toggleAll(true)}>Select All</button>
          <button aria-label="Clear All" class="button-light" onClick={() => this.toggleAll(false)}>Clear All</button>

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
            {Object.keys(this.neighborhoods).map(region => {
              let regionCheckboxProps: any = {
                name: region,
                class: 'region',
                onCheckBoxChange: e => this.regionChange(e),
                checked: "checked",
              };

              this.neighborhoods[region].forEach(neighborhood => {
                if (this.value.indexOf(neighborhood.id) === -1) {
                  regionCheckboxProps.checked = false;
                  regionCheckboxProps['data-checked'] = false;
                }
              });

              return(
                <div class="region-container">
                  <apt212-checkbox {...regionCheckboxProps}>
                    {region}
                  </apt212-checkbox>

                  <div class="neighborhoods-container">
                    {this.neighborhoods[region].map(neighborhood => {
                      let checkboxProps: any = {
                        name: neighborhood.name,
                        value: neighborhood.id,
                        class: 'neighborhood',
                        onCheckBoxChange: e => this.neighborhoodChange(e),
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
              )}
            )}
            </div>
          </form>
        </div>
      </div>
    )
  }
}
