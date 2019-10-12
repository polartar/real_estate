import { Actions, ActionTypes } from "../actions/index";

interface searchFiltersState {
  displayFilter: boolean
}

const getInitialState = () => {
  return {
    displayFilter: false
  };
};

const searchFiltersReducer = (
  state: searchFiltersState = getInitialState(),
  action: ActionTypes
) => {
  switch (action.type) {
    case Actions.TOGGLE_SEARCH_FILTER_DISPLAY: {
      return {
        ...state,
        displayFilter: action.payload
      };
    }
  }

  return state;
};

export default searchFiltersReducer;
