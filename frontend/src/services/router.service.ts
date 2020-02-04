class RouterServiceInstance {
  forward(path, params?) {
    const router: any = document.querySelector('ion-router');
    router.push(path, params);
  }
}

export const RouterService = new RouterServiceInstance();
