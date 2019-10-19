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

  componentDidLoad() {
    // fix issue with checked-binding on ion-checkbox
    let checkboxes = this.el.querySelectorAll('ion-checkbox[data-checked="checked"]');

    checkboxes.forEach(checkbox => {
      if (checkbox.getAttribute('data-checked') && !checkbox.getAttribute('checked')) {
        // we need to explicitly re-set the checked prop
        checkbox.setAttribute('checked', 'checked');
      }
    });
  }

  closePopover() {
    const popover = document.querySelector('ion-popover');

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

  toggleCheckbox(e) {
    let cb;

    if (e.target.tagName === 'LABEL') {
      cb = e.target.querySelector('ion-checkbox');

      if (this.isChecked(cb)) {
        this.uncheck(cb);
      }
      else {
        this.check(cb);
      }
    }
  }

  regionChange(e) {
    const container = e.target.closest('.region-container');
    const checkboxes = container.querySelectorAll('ion-checkbox');

    if (!this.enableNeighborhoodCheck) {
      return;
    }

    this.enableRegionCheck = false;

    checkboxes.forEach(checkbox => {
      if (!!e.detail.checked) {
        this.check(checkbox);
      }
      else {
        this.uncheck(checkbox);
      }
    });

    this.enableRegionCheck = true;
  }

  neighborhoodChange(e) {
    const container = e.target.closest('.region-container');
    const regionCB = container.querySelector('ion-checkbox.region');

    if (this.enableRegionCheck) {
      this.enableNeighborhoodCheck = false;

      if (!!e.detail.checked) {
        // if all other ones in this region are checked
        // then check the region box
        const checkboxes = container.querySelectorAll('ion-checkbox.neighborhood');

        let enable = true;
        checkboxes.forEach(checkbox => {
          if (!this.isChecked(checkbox)) {
            enable = false;
          }
        });

        if (enable) {
          this.check(regionCB);
        }
      }
      else {
        // unchecked, so we uncheck the region
        this.uncheck(regionCB);
      }

      this.enableNeighborhoodCheck = true;
    }

    if (!!e.detail.checked) {
      this.value.push(parseInt(e.target.getAttribute('data-value')));
    }
    else {
      this.value = this.value.filter(val => {
        return val !== parseInt(e.target.getAttribute('data-value'));
      })
    }

    this.saveState();
  }

  onSubmit(e) {
    e.preventDefault();
  }

  toggleAll(on) {
    const checkboxes = this.el.querySelectorAll('ion-checkbox');

    checkboxes.forEach(checkbox => {
      if (on) {
        this.check(checkbox);
      }
      else {
        this.uncheck(checkbox);
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
          <button class="button-dark" onClick={() => this.toggleAll(true)}>Select All</button>
          <button class="button-light" onClick={() => this.toggleAll(false)}>Clear All</button>

          <div class="spacer" />

          { this.inModal ?
          <ion-button fill="clear" class="close" onClick={() => this.closePopover()}>
            <ion-icon name="close" slot="icon-only" />
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
                onIonChange: e => this.regionChange(e),
                checked: "checked",
                'data-checked': "checked"
              };

              this.neighborhoods[region].forEach(neighborhood => {
                if (this.value.indexOf(neighborhood.id) === -1) {
                  regionCheckboxProps.checked = false;
                  regionCheckboxProps['data-checked'] = false;
                }
              });

              return(
                <div class="region-container">
                  <label onClick={e => this.toggleCheckbox(e)}>
                    <ion-checkbox {...regionCheckboxProps} /> {region}
                  </label>

                  <div class="neighborhoods-container">
                    {this.neighborhoods[region].map(neighborhood => {
                      let checkboxProps: any = {
                        name: neighborhood.name,
                        'data-value': neighborhood.id,
                        class: 'neighborhood',
                        onIonChange: e => { this.neighborhoodChange(e) },
                      };

                      if (this.value.indexOf(neighborhood.id) > -1) {
                        checkboxProps.checked = 'checked';
                        checkboxProps['data-checked'] = "checked";
                      }

                      return (
                        <label onClick={e => this.toggleCheckbox(e)}>
                          <ion-checkbox {...checkboxProps} /> {neighborhood.name}
                        </label>
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
