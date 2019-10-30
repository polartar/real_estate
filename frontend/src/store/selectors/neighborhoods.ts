
const neighborhoodSelectors = {
  getNeighborhoods: state => {
    return state.neighborhoods.neighborhoods;
  },

  getNeighborhoodById: (id, neighborhoods) => {
    let neighborhood = null;
    Object.keys(neighborhoods).forEach(key => {
      const result = neighborhoods[key].find(n => n.id === id);

      if (result) {
        neighborhood = result;
      }
    });

    return neighborhood;
  }
}

export default neighborhoodSelectors;
