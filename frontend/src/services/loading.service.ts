class LoadingServiceInstance {
  loading = null;

  showLoading(options: any = {}) {
    this.loading = document.createElement('ion-loading');
    this.loading.message = options.hasOwnProperty('message') ? options.message : '';
    this.loading.duration = options.hasOwnProperty('duration') ? options.duration : 0;

    document.body.appendChild(this.loading);
    return this.loading.present();
  }

  async hideLoading() {
    if (this.loading) {
      await this.loading.dismiss();

      this.loading = null;
    }
  }
}

export const LoadingService = new LoadingServiceInstance();
