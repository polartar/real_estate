class RouterServiceInstance {
  forward(path) {
    const router: any = document.querySelector('ion-router');
    router.push(path);
  }
}

export const RouterService = new RouterServiceInstance();
