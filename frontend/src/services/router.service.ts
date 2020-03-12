class RouterServiceInstance {
  forward(path, params?) {
    const router: any = document.querySelector('ion-router');
    router.push(path, params);
  }

  reload(path) {
    window.open(path, "_self");
  }
}

export const RouterService = new RouterServiceInstance();
