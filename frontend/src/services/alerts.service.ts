class AlertServiceInstance {
  confirm(message: string, header?: string, subheader?: string) {
    return new Promise(async resolve => {
      const buttons = [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            resolve(false)
          }
        }, {
          text: 'Okay',
          handler: () => {
            resolve(true);
          }
        }
      ];

      const modal = Object.assign(document.createElement('ion-modal'), {
        component: 'apt212-alert',
        cssClass: 'apt212-alert',
        componentProps: {
          header,
          subheader,
          message,
          buttons
        }
      });

      document.body.appendChild(modal);

      modal.present();
    });
  }

  alert(message: string, header?: string, subheader?: string) {
    return new Promise(resolve => {

      const buttons = [
        {
          text: 'Okay',
          handler: () => {
            resolve(true);
          }
        }
      ];

      const modal = Object.assign(document.createElement('ion-modal'), {
        component: 'apt212-alert',
        cssClass: 'apt212-alert',
        componentProps: {
          header,
          subheader,
          message,
          buttons
        }
      });

      document.body.appendChild(modal);

      return modal.present();
    });
  }
}

export const AlertService = new AlertServiceInstance();
