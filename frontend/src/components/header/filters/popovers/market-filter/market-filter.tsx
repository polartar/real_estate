import { Component, h, Prop, Element } from '@stencil/core';

@Component({
  tag: 'market-filter',
  styleUrl: 'market-filter.scss'
})
export class MarketTFilter {
  @Prop() inModal: boolean = false;
  @Element() el: HTMLElement;

  value: any[] = [];

  componentWillLoad() {

  }

  closePopover() {
    const popover = this.el.closest('apt212-popover');

    if (popover) {
      popover.dismiss();
    }
  }

  render() {
    return (
      <div class="market-filter">

        <div class="market-types">
          <label class="apt212-checkbox"><input type="checkbox" name="Battery Park City" value="1 "/><span class="checkbox"></span>Furnished Apartments</label>
          <label class="apt212-checkbox"><input type="checkbox" name="Battery Park City" value="1 "/><span class="checkbox"></span>Rentals</label>
          <label class="apt212-checkbox"><input type="checkbox" name="Battery Park City" value="1 "/><span class="checkbox"></span>Sales</label>
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
