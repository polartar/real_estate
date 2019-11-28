import { Component, h, State, Prop, Element } from '@stencil/core';
import { Store, Action } from '@stencil/redux';
import { searchFilterSelectors } from '../../../../../store/selectors/search';
import { setPriceFilter } from '../../../../../store/actions/search';
import Debounce from 'debounce-decorator';

@Component({
  tag: 'price-filter',
  styleUrl: 'price-filter.scss'
})
export class PriceFilter {
  @Prop({ context: "store" }) store: Store;
  @Prop() inModal: boolean = false;
  @Element() el: HTMLElement;
  @State() value: any = {
    min: 1000,
    max: 15000
  };

  internalValue: any = {
    min: 1000,
    max: 15000
  };

  setPriceFilter: Action;

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      const val = searchFilterSelectors.getPrice(state);

      return {
        value: val ? val : this.internalValue
      }
    });

    this.store.mapDispatchToProps(this, {
      setPriceFilter: setPriceFilter
    });
  }

  componentDidLoad() {
    this.setPriceFilter(this.value);
  }

  @Debounce(200)
  updateMin(e) {
    this.value = {
      min: e.detail.value,
      max: Math.max(this.value.max, e.detail.value),
    };

    this.setPriceFilter(this.value);
  }

  @Debounce(200)
  updateMax(e) {
    this.value = {
      min: Math.min(this.value.min, e.detail.value),
      max: e.detail.value
    };

    this.setPriceFilter(this.value);
  }

  formatAmount(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  closePopover() {
    const popover = this.el.closest('apt212-popover');

    if (popover) {
      popover.dismiss();
    }
  }

  render() {
    return (
      <div class="price-filter">
        <div class="title">Price Range (Per Month)</div>
        <div class="value">
          ${this.formatAmount(this.value.min)} - ${this.formatAmount(this.value.max)}
        </div>

        <div class="input">
          <label>Minimum</label>
          <ion-range min={1000} max={20000} step={100} value={this.value.min} debounce={50} onIonChange={e => this.updateMin(e)}></ion-range>
        </div>

        <div class="input">
          <label>Maximum</label>
          <ion-range min={1000} max={20000} step={100} value={this.value.max} debounce={50} onIonChange={e => this.updateMax(e)}></ion-range>
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
