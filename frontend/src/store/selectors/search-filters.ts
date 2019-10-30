
const searchFilterSelectors = {
  getMoveInDate: state => {
    return state.searchFilters.filters.moveInDate;
  },

  getPrice: state => {
    return state.searchFilters.filters.price;
  },

  getBeds: state => {
    return [...state.searchFilters.filters.beds];
  },

  getBathrooms: state => {
    return [...state.searchFilters.filters.bathrooms];
  },

  getBuildingTypes: state => {
    return [...state.searchFilters.filters.buildingTypes];
  },

  getLocations: state => {
    return [...state.searchFilters.filters.location];
  }
}

export default searchFilterSelectors;
