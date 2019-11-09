import { ActionTypes, Actions } from "../actions/index";

interface neighborhoodsState {
  neighborhoods: any[];
  regions: any[];
  loaded: boolean;
}

const getInitialState = () => {
  return {
    regions: [],
    neighborhoods: [],
    loaded: false
  };
};

const neighborhoodsReducer = (
  state: neighborhoodsState = getInitialState(),
  action: ActionTypes
) => {
  switch (action.type) {
    case Actions.SET_NEIGHBORHOODS_LOADING: {
      return {
        ...state,
        loaded: false
      };
    }

    case Actions.SET_NEIGHBORHOODS_TAXONOMY: {
      return {
        ...state,
        regions: action.payload.regions,
        neighborhoods: action.payload.neighborhoods,
        loaded: true
      };
    }
  }

  return state;
};


export default neighborhoodsReducer;
