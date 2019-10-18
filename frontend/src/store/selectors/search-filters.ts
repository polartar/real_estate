
const searchFilterSelectors = {
  getMoveInDate: state => {
    return state.searchFilters.filters.moveInDate;
  },

  getPrice: state => {
    return state.searchFilters.filters.price;
  }
}

export default searchFilterSelectors;
