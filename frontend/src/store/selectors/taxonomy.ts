
const taxonomySelectors = {
  getTaxonomyLoaded: state => {
    return !!state.taxonomy.loaded;
  },

  getNeighborhoods: state => {
    return [ ...state.taxonomy.neighborhoods ];
  },

  getNeighborhoodById: (id, neighborhoods) => {
    return neighborhoods.find(n => n.id === id);
  },

  getNeighborhoodsByRegionId: (region_id, neighborhoods) => {
    return neighborhoods.filter(n => n.region_id === region_id);
  },

  getRegions: state => {
    return [ ...state.taxonomy.regions ];
  },

  getRegionById: (id, regions) => {
    return regions.find(r => r.id === id);
  },

  getBuildingTypes: state => {
    return [...state.taxonomy.buildingTypes]
  },

  getBuildingTypeById: (id, buildingTypes) => {
    return buildingTypes.find(b => b.id === id);
  },

  getBedroomTypes: state => {
    return [...state.taxonomy.bedroomTypes]
  },

  getBedroomTypeById: (id, bedroomTypes) => {
    return bedroomTypes.find(b => b.id === id);
  }
}

export default taxonomySelectors;
