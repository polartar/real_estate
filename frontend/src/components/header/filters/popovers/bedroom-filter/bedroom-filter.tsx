import { Component, h, Prop, Element, Method } from '@stencil/core';
import { Store, Action } from '@stencil/redux';
import { searchFilterSelectors } from '../../../../../store/selectors/search';
import { setBedsFilter } from '../../../../../store/actions/search';
import { getBedsLabel } from '../../../../../helpers/filters';

@Component({
  tag: 'bedroom-filter',
  styleUrl: 'bedroom-filter.scss'
})
export class BedroomFilter {
  @Prop({ context: "store" }) store: Store;
  @Prop() inModal: boolean = false;
  @Element() el: HTMLElement;

  value: any[] = [];
  setBedsFilter: Action;

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        value: searchFilterSelectors.getBeds(state)
      }
    });

    this.store.mapDispatchToProps(this, {
      setBedsFilter: setBedsFilter
    });
  }

  componentDidLoad() {
    const buttons = this.el.querySelectorAll('.beds button');

    buttons.forEach(button => {
      let val = button.getAttribute('data-value');
      if (this.value.indexOf(val) > -1) {
        button.classList.remove('inactive');
      }
    });
  }

  @Method()
  async selectAll() {
    const buttons = this.el.querySelectorAll('.beds button');

    this.value = [];

    buttons.forEach(button => {
      let val = button.getAttribute('data-value');

      button.classList.remove('inactive');

      this.value.push(val);
    });

    this.setBedsFilter(this.value);
  }

  @Method()
  async clearAll() {
    const buttons = this.el.querySelectorAll('.beds button');

    this.value = [];

    buttons.forEach(button => {
       button.classList.add('inactive');
    });

    this.setBedsFilter(this.value);
  }

  setValue(e) {
    if (e.target.classList.contains('inactive')) {
      e.target.classList.remove('inactive');

      this.value.push(e.target.getAttribute('data-value'));
    }
    else {
      e.target.classList.add('inactive');
      this.value = this.value.filter(val => {
        return val !== e.target.getAttribute('data-value');
      });
    }

    this.setBedsFilter(this.value);
  }

  closePopover() {
    const popover = this.el.closest('apt212-popover');

    if (popover) {
      popover.dismiss();
    }
  }

  render() {
    return (
      <div class="bedroom-filter">
        <div class="title">Number of beds</div>

        <div class="beds">
          <table>
            <tr>
              <td><button aria-label="Room" class="inactive reset" data-value="room" onClick={(e) => this.setValue(e)}>{getBedsLabel('room')}</button></td>
              <td><button aria-label="Studio" class="inactive reset" data-value="studio" onClick={(e) => this.setValue(e)}>{getBedsLabel('studio')}</button></td>
              <td><button aria-label="1 bedroom" class="inactive reset"  data-value={1} onClick={(e) => this.setValue(e)}>{getBedsLabel(1)}</button></td>
              <td><button aria-label="2 bedrooms" class="inactive reset" data-value={2} onClick={(e) => this.setValue(e)}>{getBedsLabel(2)}</button></td>
            </tr>
            <tr>
              <td><button aria-label="3 bedrooms" class="inactive reset" data-value={3} onClick={(e) => this.setValue(e)}>{getBedsLabel(3)}</button></td>
              <td><button aria-label="4 bedrooms" class="inactive reset" data-value={4} onClick={(e) => this.setValue(e)}>{getBedsLabel(4)}</button></td>
              <td><button aria-label="5 bedrooms" class="inactive reset" data-value={5} onClick={(e) => this.setValue(e)}>{getBedsLabel(5)}</button></td>
            </tr>
          </table>
        </div>

        { this.inModal ?
        <ion-button aria-label="close" fill="clear" class="close reset" onClick={() => this.closePopover()}>
          <ion-icon src="/assets/images/icons/cancel.svg" slot="icon-only" />
        </ion-button>
        : null }
      </div>
    );
  }
}
