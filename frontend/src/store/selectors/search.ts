const searchSelectors = {
  getLoading: state => {
    return state.search.loading;
  },

  getListingsCount: state => {
    return state.search.listingsCount;
  },

  getListings: state => {
    return [
      ...state.search.listings
    ];
  },

  getSelectedListings: state => {
    return [
      ...state.search.selectedListings
    ];
  },

  getSearchListingHover: state => {
    return state.search.listingHover;
  },

  getMapMarkersLoading: state => {
    return state.search.mapMarkersLoading;
  },

  getMapMarkers: state => {
    return [
      ...state.search.mapMarkers
    ]
  }
};


const searchFilterSelectors = {
  getAllFilters: state => {
    return {
      beds: searchFilterSelectors.getBeds(state),
      bathrooms: searchFilterSelectors.getBathrooms(state),
      price: searchFilterSelectors.getPrice(state),
      moveInDate: searchFilterSelectors.getMoveInDate(state),
      buildingTypes: searchFilterSelectors.getBuildingTypes(state),
      location: searchFilterSelectors.getLocations(state),
      sortBy: searchFilterSelectors.getSortBy(state)
    };
  },

  getDisplayFilter: state => {
    return state.search.displayFilter;
  },

  getMoveInDate: state => {
    return state.search.filters.moveInDate;
  },

  getPrice: state => {
    return state.search.filters.price;
  },

  getBeds: state => {
    return [...state.search.filters.beds];
  },

  getBathrooms: state => {
    return [...state.search.filters.bathrooms];
  },

  getBuildingTypes: state => {
    return [...state.search.filters.buildingTypes];
  },

  getLocations: state => {
    return [...state.search.filters.location];
  },

  getSortBy: state => {
    return state.search.filters.sortBy
  }
}

export {
  searchFilterSelectors,
  searchSelectors
};
