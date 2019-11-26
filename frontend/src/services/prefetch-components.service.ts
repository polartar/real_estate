class PrefetchComponentServiceInstance {
  getConfig() {
    return [
      // popovers first
      {
        tag: 'apt212-popover',
        props: {
          component: 'app-menu'
        }
      },
      {
        tag: 'app-menu',
      },

      // pages second
      {
        tag: 'page-home',
        props: {
          prefetching: true
        }
      },

      {
        tag: 'page-search',
        props: {
          prefetching: true,
        }
      },
      {
        tag: 'search-map'
      },

      // other components last
      {
        tag: 'apt212-checkbox'
      },
      {
        tag: 'search-filters'
      }
    ];
  }
}

export const PrefetchComponentService = new PrefetchComponentServiceInstance();
