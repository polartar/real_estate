import { Component, h, Element, Prop} from '@stencil/core';
import { Store, Action } from '@stencil/redux';
import { searchFilterSelectors } from '../../../../../store/selectors/search';
import { setMoveInFilter } from '../../../../../store/actions/search';

@Component({
  tag: 'move-in-date-filter',
  styleUrl: 'move-in-date-filter.scss'
})
export class LocationFilter {
  @Prop({ context: "store" }) store: Store;
  @Prop() inModal: boolean = false;
  @Element() el: HTMLElement;
  picker: any;
  value: any;
  setMoveInFilter: Action;

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        value: searchFilterSelectors.getMoveInDate(state)
      }
    });

    this.store.mapDispatchToProps(this, {
      setMoveInFilter: setMoveInFilter
    });
  }

  closePopover() {
    const popover = this.el.closest('apt212-popover');

    if (popover) {
      popover.dismiss();
    }
  }

  render() {
    return (
      <div class="move-in-date-filter">

        <div class="picker">
          <apt212-datepicker onSelected={e => this.setMoveInFilter(e.detail) }/>
        </div>

        <div class="disclaimer">
          Minimum Stay 30 Days
        </div>

        { this.inModal ?
        <ion-button aria-label="close" fill="clear" class="close reset" onClick={() => this.closePopover()}>
          <ion-icon src="/assets/images/icons/cancel.svg" slot="icon-only" />
        </ion-button>
        : null }
      </div>
    )
  }
}
