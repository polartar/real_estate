class RouterServiceInstance {
  forward(path, params?) {
    const router: any = document.querySelector('ion-router');
    router.push(path, params);
  }

  reload(path) {
    window.open(path, "_self");
  }

  /**
   * 
   * @param name - name of the route
   * @param params - query params { key: value }
   */
  getRoute(name, params?) {
    let path = '/';

    switch (name) {
      case 'search':
        path = '/search-apartments';
      break;
    }

    if (params && Object.keys(params).length) {
      const queryString = this.serializeQuery(params);

      path += `?${queryString}`;
    }

    return path;
  }

  serializeQuery = (params, prefix?) => {
    const query = Object.keys(params).map((key) => {
      const value  = params[key];
  
      if (params.constructor === Array) {
        key = `${prefix}[]`;
      }
      else if (params.constructor === Object) {
        key = (prefix ? `${prefix}[${key}]` : key);
      }
  
      if (typeof value === 'object') {
        return this.serializeQuery(value, key);
      }
      else {
        return `${key}=${encodeURIComponent(value)}`;
      }
    });
  
    return [].concat.apply([], query).join('&');
  }
}

export const RouterService = new RouterServiceInstance();
