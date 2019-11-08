import { Component, h, Prop, Element, Method } from '@stencil/core';
import { Store, Action } from '@stencil/redux';
import { searchFilterSelectors } from '../../../../../store/selectors/search';
import { setBathroomsFilter } from '../../../../../store/actions/search';

@Component({
  tag: 'bathroom-filter',
  styleUrl: 'bathroom-filter.scss'
})
export class BathroomFilter {
  @Prop({ context: "store" }) store: Store;
  @Prop() inModal: boolean = false;
  @Element() el: HTMLElement;

  value: any[] = [];
  setBathroomsFilter: Action;

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        value: searchFilterSelectors.getBathrooms(state)
      }
    });

    this.store.mapDispatchToProps(this, {
      setBathroomsFilter: setBathroomsFilter
    });
  }

  componentDidLoad() {
    const buttons = this.el.querySelectorAll('.bathrooms button');

    buttons.forEach(button => {
      let val = button.getAttribute('data-value');
      if (this.value.indexOf(val) > -1) {
        button.classList.remove('inactive');
      }
    });
  }

  @Method()
  async selectAll() {
    const buttons = this.el.querySelectorAll('.bathrooms button');

    this.value = [];

    buttons.forEach(button => {
      let val = button.getAttribute('data-value');

      button.classList.remove('inactive');

      this.value.push(val);
    });

    this.setBathroomsFilter(this.value);
  }

  @Method()
  async clearAll() {
    const buttons = this.el.querySelectorAll('.bathrooms button');

    this.value = [];

    buttons.forEach(button => {
       button.classList.add('inactive');
    });

    this.setBathroomsFilter(this.value);
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

    this.setBathroomsFilter(this.value);
  }

  closePopover() {
    const popover = this.el.closest('apt212-popover');

    if (popover) {
      popover.dismiss();
    }
  }

  render() {
    return (
      <div class="bathroom-filter">
        <div class="title">Number of bathrooms</div>

        <div class="bathrooms">
          <table>
            <tr>
              <td><button aria-label="1 bathroom" class="inactive reset" data-value={1} onClick={(e) => this.setValue(e)}>1</button></td>
              <td><button aria-label="1.5 bathrooms" class="inactive reset" data-value={1.5} onClick={(e) => this.setValue(e)}>1.5</button></td>
              <td><button aria-label="2 bathrooms" class="inactive reset" data-value={2} onClick={(e) => this.setValue(e)}>2</button></td>
              <td><button aria-label="2.5 bathrooms" class="inactive reset" data-value={2.5} onClick={(e) => this.setValue(e)}>2.5</button></td>
            </tr>
            <tr>
              <td><button aria-label="3 bathrooms" class="inactive" data-value={3} onClick={(e) => this.setValue(e)}>3</button></td>
              <td><button aria-label="3.5 bathrooms" class="inactive" data-value={3.5} onClick={(e) => this.setValue(e)}>3.5</button></td>
              <td><button aria-label="4 bathrooms" class="inactive" data-value={4} onClick={(e) => this.setValue(e)}>4</button></td>
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
