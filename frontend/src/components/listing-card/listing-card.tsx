import { Component, h, Prop, State } from '@stencil/core';
import { Store } from "@stencil/redux";

@Component({
  tag: 'listing-card',
  styleUrl: 'listing-card.scss'
})
export class ListingCard {
  @Prop({ context: "store" }) store: Store;
  @State() size: string = 'phone-only';

  componentDidLoad() {
    this.store.mapStateToProps(this, state => {

      const {
        screenSize: { size },
      } = state;

      return {
        size
      };
    });
  }

  render() {

    return [
      <div class="listing-card">
        <img src="/assets/images/placeholder/apt1.jpeg" />
      </div>
    ];
  }
}
