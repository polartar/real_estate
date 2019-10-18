import { Component, h, Prop, State, Element} from '@stencil/core';
// import { Store, Action } from '@stencil/redux';
// import { setLocationFilters } from '../../../../../store/actions/search-filters';

@Component({
  tag: 'move-in-date-filter',
  styleUrl: 'move-in-date-filter.scss'
})
export class LocationFilter {
  // @Prop({ context: "store" }) store: Store;
  @Element() el: HTMLElement;

  componentWillLoad() {
    // this.store.mapStateToProps(this, state => {
    //   return {
    //     neighborhoods: state.neighborhoods.neighborhoods,
    //     value: state.searchFilters.filters.location
    //   }
    // });

    // this.store.mapDispatchToProps(this, {
    //   setLocationFilters: setLocationFilters
    // });
  }

  closePopover() {
    const popover = document.querySelector('ion-popover');

    if (popover) {
      popover.dismiss();
    }
  }

  render() {
    return (
      <div class="move-in-date-filter">
        <div class="toolbar">
          <ion-button fill="clear" class="close" onClick={() => this.closePopover()}>
            <ion-icon name="close" slot="icon-only" />
          </ion-button>
        </div>

        <div>
          Here
        </div>
      </div>
    )
  }
}
