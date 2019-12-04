import { Component, h, Prop, Element } from '@stencil/core';

@Component({
  tag: 'page-listing-image-modal',
  styleUrl: 'page-listing-image-modal.scss'
})
export class PageListingImageModal {
  @Element() el: HTMLElement;
  @Prop() src!: string;

  close() {
    const modal = this.el.closest('ion-modal');

    if (modal) {
      modal.dismiss();
    }
  }

  render() {
    return (
      <div class="page-listing-image-modal-component">
        <ion-button aria-label="close" fill="clear" class="close reset" onClick={() => this.close()}>
          <ion-icon src="/assets/images/icons/cancel.svg" slot="icon-only" />
        </ion-button>

        <img src={this.src} />
      </div>
    )
  }
}
