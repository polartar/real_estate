import { ActionTypes, Actions } from "../actions/index";

interface taxonomyState {
  neighborhoods: any[];
  regions: any[];
  buildingTypes: any[];
  bedroomTypes: any[];
  subways: any[];
  loaded: boolean;
}

const getInitialState = () => {
  return {
    regions: [],
    neighborhoods: [],
    buildingTypes: [],
    bedroomTypes: [],
    subways: [],
    amenities: [],
    loaded: false
  };
};

const taxonomyReducer = (
  state: taxonomyState = getInitialState(),
  action: ActionTypes
) => {
  switch (action.type) {
    case Actions.SET_TAXONOMY_LOADING: {
      return {
        ...state,
        loaded: false
      };
    }

    case Actions.SET_TAXONOMY: {
      return {
        ...state,
        regions: action.payload.regions,
        neighborhoods: action.payload.neighborhoods,
        buildingTypes: action.payload.building_types,
        bedroomTypes: action.payload.bedroom_types,
        subways: action.payload.subways,
        amenities: action.payload.amenities,
        loaded: true
      };
    }
  }

  return state;
};


export default taxonomyReducer;
