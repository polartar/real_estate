
const taxonomySelectors = {
  getTaxonomyLoaded: state => {
    return !!state.taxonomy.loaded;
  },

  getNeighborhoods: state => {
    return [ ...state.taxonomy.neighborhoods ];
  },

  getFeaturedNeighborhoods: state => {
    return [...state.taxonomy.neighborhoods.filter(n => !!n.is_featured)];
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
    return [...state.taxonomy.buildingTypes];
  },

  getBuildingTypeById: (id, buildingTypes) => {
    return buildingTypes.find(b => b.id === id);
  },

  getBedroomTypes: state => {
    return [...state.taxonomy.bedroomTypes];
  },

  getBedroomTypeById: (id, bedroomTypes) => {
    return bedroomTypes.find(b => b.id === id);
  },

  getSubways: state => {
    return [...state.taxonomy.subways];
  },

  getAmenities: state => {
    return [...state.taxonomy.amenities];
  }
}

export default taxonomySelectors;
