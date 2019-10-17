import { Component, h, Prop, State, Element} from '@stencil/core';
import { Store } from '@stencil/redux';

@Component({
  tag: 'location-filter',
  styleUrl: 'location-filter.scss'
})
export class LocationFilter {
  @Prop({ context: "store" }) store: Store;
  @State() neighborhoods: any = {};
  @Element() el: HTMLElement;

  // whether to check the region control for status after
  // changing a neighborhood checkbox
  enableRegionCheck: boolean = true;

  enableNeighborhoodCheck: boolean = true;

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        neighborhoods: state.neighborhoods.neighborhoods
      }
    });
  }

  closePopover() {
    const popover = document.querySelector('ion-popover');

    if (popover) {
      popover.dismiss();
    }
  }

  toggleCheckbox(e) {
    let cb;

    if (e.target.tagName === 'LABEL') {
      cb = e.target.querySelector('ion-checkbox');

      if (cb.getAttribute('checked')) {
        cb.removeAttribute('checked');
      }
      else {
        cb.setAttribute('checked', 'checked');
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
        checkbox.setAttribute('checked', 'checked');
      }
      else {
        checkbox.removeAttribute('checked');
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
          if (!checkbox.getAttribute('checked')) {
            enable = false;
          }
        });

        if (enable) {
          regionCB.setAttribute('checked', 'checked');
        }
      }
      else {
        // unchecked, so we uncheck the region
        regionCB.removeAttribute('checked');
      }

      this.enableNeighborhoodCheck = true;
    }

    this.saveState();
  }

  onSubmit(e) {
    console.log('form submit', e);
    e.preventDefault();
  }

  toggleAll(on) {
    const checkboxes = this.el.querySelectorAll('ion-checkbox');

    checkboxes.forEach(checkbox => {
      if (on) {
        checkbox.setAttribute('checked', 'checked');
      }
      else {
        checkbox.removeAttribute('checked');
      }
    });
  }

  saveState() {
    this.el.querySelector('form').submit();
    // console.log('saving state');

    // const state = [];
    // const checkboxes = this.el.querySelectorAll('ion-checkboxes.neighborhood');

    // checkboxes.forEach(checkbox => {
    //   if (!!checkbox.getAttribute('checked')) {
    //     state.push(checkbox.getAttribute('value'));
    //   }
    // });
  }

  render() {
    return (
      <div class="location-filter">
        <div class="toolbar">
          <button class="button-dark" onClick={() => this.toggleAll(true)}>Select All</button>
          <button class="button-light" onClick={() => this.toggleAll(false)}>Clear All</button>

          <div class="spacer" />

          <ion-button fill="clear" class="close" onClick={() => this.closePopover()}>
            <ion-icon name="close" slot="icon-only" />
          </ion-button>
        </div>

        <div>
          <form onSubmit={e => this.onSubmit(e)} novalidate>

            <div class="checkboxes-container">
            {Object.keys(this.neighborhoods).map(region =>
              <div class="region-container">
                <label onClick={e => this.toggleCheckbox(e)}>
                  <ion-checkbox name={region} class="region" onIonChange={e => this.regionChange(e)}/> {region}
                </label>

                <div class="neighborhoods-container">
                  {this.neighborhoods[region].map(neighborhood =>
                    <label onClick={e => this.toggleCheckbox(e)}>
                      <ion-checkbox name={neighborhood.name} value={neighborhood.id} class="neighborhood" onIonChange={e => this.neighborhoodChange(e)}/> {neighborhood.name}
                    </label>
                  )}
                </div>
              </div>
            )}
            </div>
          </form>
        </div>
      </div>
    )
  }
}
