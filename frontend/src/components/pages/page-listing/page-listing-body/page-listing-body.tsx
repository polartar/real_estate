import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'page-listing-body',
  styleUrl: 'page-listing-body.scss'
})
export class PageListingBody {
  @Prop() item!: Object;

  render() {
    return [
      <section class="section no-padding">
        <page-listing-image-slider item={this.item} />
      </section>,
      <section class="section">
        Body
      </section>
    ]
  }
}
