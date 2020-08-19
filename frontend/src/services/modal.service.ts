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

  bookingTOS() {
    const modal = Object.assign(document.createElement('ion-modal'), {
      component: 'apt212-modal-booking-frame',
      componentProps: {
        component: 'booking-tos',
      }
    });

    document.body.appendChild(modal);
    return modal.present();
  }
  
  siteMenu() {
    const modal = Object.assign(document.createElement('ion-modal'), {
      component: 'apt212-modal-booking-frame',
      componentProps: {
        component: 'app-menu-mobile',
      }
    });

    modal.classList.add('site-menu');

    document.body.appendChild(modal);
    return modal.present();
  }
}

export const ModalService = new ModalServiceInstance();
