class AlertServiceInstance {
  confirm(message: string, header?: string, subheader?: string) {
    return new Promise(resolve => {
      const alert = document.createElement('ion-alert');

      if (header) {
        alert.header = header;
      }

      if (subheader) {
        alert.subHeader = subheader;
      }

      alert.message = message;

      alert.buttons = [
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

      document.body.appendChild(alert);
      return alert.present();
    });
  }
}

export const AlertService = new AlertServiceInstance();
