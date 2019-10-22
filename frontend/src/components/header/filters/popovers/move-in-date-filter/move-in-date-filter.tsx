import { Component, h, Element, Prop} from '@stencil/core';
import datepicker from 'js-datepicker'
import { Store, Action } from '@stencil/redux';
import searchFilterSelectors from '../../../../../store/selectors/search-filters';
import { setMoveInFilter } from '../../../../../store/actions/search-filters';

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

  componentDidLoad() {
    const node = this.el.querySelector('.datepicker');
    this.picker = datepicker(node, {
      alwaysShow: true,
      startDay: 1,
      minDate: new Date(),
      dateSelected: this.value,
      disableYearOverlay: true,
      onSelect: (_instance, date) => {
        this.setMoveInFilter(date);
      },
      onMonthChange: () => {
        this.padNumbers();
        this.updateArrows();
      },
      onShow: () => {
        // need settimeout to allow the component to render before querying the dom nodes
        // doesn't appear to be any better event for it
        setTimeout(() => {
          this.padNumbers();
          this.updateArrows();
        }, 250);
      }
    });

    this.picker.calendarContainer.style.setProperty('font-size', '1.25rem');
  }

  padNumbers() {
    const squares: any = this.el.querySelectorAll('.qs-square .qs-num');

    squares.forEach(square => {
      if (square.innerText.length === 1) {
        square.innerText = '0' + square.innerText;
      }
    });
  }

  updateArrows() {
    const arrows = this.el.querySelectorAll('.qs-controls .qs-arrow');

    arrows.forEach(arrow => {
      // arrow.innerHTML = '&#10140;';
      // arrow.innerHTML = '<img src="/assets/images/icons/arrow.svg" />';
    });
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
        <div class="picker-wrapper">
          <div class="datepicker">

          </div>
        </div>
        <div class="disclaimer">
          Minimum Stay 30 Days
        </div>

        { this.inModal ?
        <ion-button fill="clear" class="close" onClick={() => this.closePopover()}>
          <ion-icon name="close" slot="icon-only" />
        </ion-button>
        : null }
      </div>
    )
  }
}
