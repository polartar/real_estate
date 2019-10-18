import { Actions, ActionTypes } from "../actions/index";

interface searchFiltersState {
  displayFilter: boolean,
  filters: any
}

const getInitialState = () => {
  return {
    displayFilter: false,
    filters: {
      location: [],
      moveInDate: undefined,
    }
  }
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

    case Actions.SET_LOCATION_FILTERS: {
      return {
        ...state,
        filters: {
          ...state.filters,
          location: action.payload
        }
      };
    }

    case Actions.SET_MOVE_IN_FILTER: {
      return {
        ...state,
        filters: {
          ...state.filters,
          moveInDate: action.payload
        }
      }
    }
  }

  return state;
};

export default searchFiltersReducer;
