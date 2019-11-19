import { ActionTypes, Actions } from "../actions/index";

interface taxonomyState {
  neighborhoods: any[];
  regions: any[];
  buildingTypes: any[];
  bedroomTypes: any[];
  loaded: boolean;
}

const getInitialState = () => {
  return {
    regions: [],
    neighborhoods: [],
    buildingTypes: [],
    bedroomTypes: [],
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
        loaded: true
      };
    }
  }

  return state;
};


export default taxonomyReducer;
