import { ActionTypes } from "../actions/index";

interface neighborhoodsState {

}

const getInitialState = () => {
  return {

  };
};

const neighborhoodsReducer = (
  state: neighborhoodsState = getInitialState(),
  action: ActionTypes
) => {
  switch (action.type) {
  //   case Actions.SET_NEIGHBORHOODS_LOADING: {
  //     return {
  //       ...state,
  //       loaded: false
  //     };
  //   }

  //   case Actions.SET_NEIGHBORHOODS_TAXONOMY: {
  //     return {
  //       ...state,
  //       regions: action.payload.regions,
  //       neighborhoods: action.payload.neighborhoods,
  //       loaded: true
  //     };
  //   }
  }

  return state;
};


export default neighborhoodsReducer;
