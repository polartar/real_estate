import { Component, h, Prop, Element } from '@stencil/core';

@Component({
  tag: 'apt212-modal-booking-frame',
  styleUrl: 'apt212-modal-booking-frame.scss'
})
export class Apt212ModalBookingFrame {
  @Element() el: HTMLElement;
  @Prop() test: string;
  @Prop() component!: string;
  @Prop() componentProps: any = {};

  closeModal() {
    const modal: any = this.el.closest('ion-modal');
    if (modal) {
      modal.dismiss();
    }
  }

  componentDidLoad() {
    const injectedComponent: any = Object.assign(document.createElement(this.component), this.componentProps);
    this.el.querySelector('.modal-content').appendChild(injectedComponent);
  }

  render() {

    return (
      <ion-content class="apt212-modal-booking-frame-component">
        <div class="modal-content" />

        <button aria-label="close" class="close button-reset" onClick={() => this.closeModal()}>
          <img src="/assets/images/icons/cancel.svg" />
        </button>
      </ion-content>
    )
  }
}
