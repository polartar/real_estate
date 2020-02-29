class ModalServiceInstance {
  contactUs(item?) {
    const modal = Object.assign(document.createElement('ion-modal'), {
      component: 'apt212-modal-booking-frame',
      cssClass: 'ask-question-modal',
      componentProps: {
        component: 'ask-question',
        componentProps: {
          item: item
        }
      }
    });

    document.body.appendChild(modal);
    return modal.present();
  }
}

export const ModalService = new ModalServiceInstance();
