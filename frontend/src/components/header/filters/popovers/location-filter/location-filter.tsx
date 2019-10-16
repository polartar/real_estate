import { Component, h, Prop, State} from '@stencil/core';
import { Store } from '@stencil/redux';

@Component({
  tag: 'location-filter',
  styleUrl: 'location-filter.scss'
})
export class LocationFilter {
  @Prop({ context: "store" }) store: Store;
  @State() neighborhoods: any = {};

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
    const label = e.target;

    const cb = label.querySelector('ion-checkbox');

    if (cb.getAttribute('checked')) {
      cb.removeAttribute('checked');
    }
    else {
      cb.setAttribute('checked', true);
    }
  }

  regionChange(e) {
    console.log(e);
    console.log(e.target.getAttribute('checked'));
  }

  neighborhoodChange(e) {

  }

  onSubmit(e) {
    console.log(e);
    e.preventDefault();
  }

  render() {
    return (
      <div class="location-filter">
        <div class="toolbar">
          <button class="button-dark">Select All</button>
          <button class="button-light">Clear All</button>

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
