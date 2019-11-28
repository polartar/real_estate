import { Component, h, Prop, Element, Method, State } from '@stencil/core';
import { Store, Action } from '@stencil/redux';
import { searchFilterSelectors } from '../../../../../store/selectors/search';
import taxonomySelectors from '../../../../../store/selectors/taxonomy';
import { setBedsFilter } from '../../../../../store/actions/search';

@Component({
  tag: 'bedroom-filter',
  styleUrl: 'bedroom-filter.scss'
})
export class BedroomFilter {
  @Prop({ context: "store" }) store: Store;
  @Prop() inModal: boolean = false;
  @State() bedroomTypes: any[] = [];
  @Element() el: HTMLElement;

  value: any[] = [];
  setBedsFilter: Action;

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        value: searchFilterSelectors.getBeds(state),
        bedroomTypes: taxonomySelectors.getBedroomTypes(state)
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
              {
                this.bedroomTypes.slice(0, 4).map(b => {
                  return <td><button aria-label={b.name} class="inactive reset" data-value={b.id} onClick={(e) => this.setValue(e)}>{b.name}</button></td>
                })
              }
            </tr>
            <tr>
              {
                this.bedroomTypes.slice(-3).map(b => {
                  return <td><button aria-label={b.name} class="inactive reset" data-value={b.id} onClick={(e) => this.setValue(e)}>{b.name}</button></td>
                })
              }
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
