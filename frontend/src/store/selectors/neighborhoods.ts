
const neighborhoodSelectors = {
  getNeighborhoods: state => {
    return [ ...state.neighborhoods.neighborhoods ];
  },

  getRegions: state => {
    return [ ...state.neighborhoods.regions ];
  },

  getRegionById: (id, regions) => {
    return regions.find(r => r.id === id);
  },

  getNeighborhoodById: (id, neighborhoods) => {
    return neighborhoods.find(n => n.id === id);
  },

  getNeighborhoodsByRegionId: (region_id, neighborhoods) => {
    return neighborhoods.filter(n => n.region_id === region_id);
  }
}

export default neighborhoodSelectors;
