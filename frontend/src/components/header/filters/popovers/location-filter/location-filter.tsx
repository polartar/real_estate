import { Component, h} from '@stencil/core';

@Component({
  tag: 'location-filter',
  styleUrl: 'location-filter.scss'
})
export class LocationFilter {

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

        <div style={{minWidth: '400px', minHeight: '250px'}}>
          <form onSubmit={e => this.onSubmit(e)} novalidate>
            <label onClick={e => this.toggleCheckbox(e)}>
              <ion-checkbox /> Downtown
            </label>
          </form>
        </div>
      </div>
    )
  }
}
