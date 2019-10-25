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
          <lazy-image src={this.item.image} alt={this.item.title} class="neighborhood-feature-image"/>
          <div class="hover-cover" />
          <div class="hover-cover-text">EXPLORE</div>

          <h4 class="neighborhood-title">{this.item.title}</h4>
        </div>
      </ion-router-link>
    ];
  }
}
