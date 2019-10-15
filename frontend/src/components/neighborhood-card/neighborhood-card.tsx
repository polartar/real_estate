import { Component, h, Prop, State } from '@stencil/core';
import { Store } from "@stencil/redux";

@Component({
  tag: 'neighborhood-card',
  styleUrl: 'neighborhood-card.scss'
})
export class NeighborhoodCard {
  @Prop({ context: "store" }) store: Store;
  @State() size: string = 'phone-only';
  @Prop() item: any = {
    id: Math.round(Math.random() * 10000),
    title: 'Tribeca',
    image: '/assets/images/neighborhoods/tribeca.jpg'
  }

  componentDidLoad() {
    console.log('card loaded', this.item);
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
      <ion-router-link href={'/neighborhood/' + this.item.id}>
        <div class="neighborhood-card">
          <img src={this.item.image} class="neighborhood-feature-image"/>
          <h4 class="neighborhood-title">{this.item.title}</h4>
        </div>
      </ion-router-link>
    ];
  }
}
