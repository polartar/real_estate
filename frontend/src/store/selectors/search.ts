const searchSelectors = {
  getLoading: state => {
    return !!state.loading;
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
      location: searchFilterSelectors.getLocations(state)
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
  }
}

export {
  searchFilterSelectors,
  searchSelectors
};
