class ToastServiceInstance {
  success(message) {
    this.createToast(message, { color: 'secondary' });
  }

  error(message) {
    this.createToast(message, { color: 'danger' });
  }

  createToast(message, options: any = {}) {
    const toast = document.createElement('ion-toast');
    toast.message = message;
    toast.duration = options.hasOwnProperty('duration') ? options.duration : 2000;
    toast.color = options.hasOwnProperty('color') ? options.color : 'medium';
    toast.showCloseButton = options.hasOwnProperty('showCloseButton') ? options.showCloseButton : true;
    toast.mode = 'md';

    document.body.appendChild(toast);
    return toast.present();
  }
}

export const ToastService = new ToastServiceInstance();
