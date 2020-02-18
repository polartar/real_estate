class ToastServiceInstance {
  success(message) {
    this.createToast(message, { color: 'success' });
  }

  error(message, options?) {
    let defaultOpts = { color: 'error' };
    if (options) {
      defaultOpts = {...defaultOpts, ...options};
    }

    this.createToast(message, defaultOpts);
  }

  createToast(message, options: any = {}) {
    const toast: any = document.createElement('apt212-toast');
    toast.message = message;
    toast.duration = options.hasOwnProperty('duration') ? options.duration : 5000;
    toast.color = options.hasOwnProperty('color') ? options.color : 'neutral';

    document.body.appendChild(toast);
    return toast.present();
  }
}

export const ToastService = new ToastServiceInstance();
