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
      price: undefined,
      beds: [],
      bathrooms: [],
      buildingTypes: []
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
      const newState = { ...state };

      newState.filters.location = action.payload;
      return newState;
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

    case Actions.SET_PRICE_FILTER: {
      return {
        ...state,
        filters: {
          ...state.filters,
          price: action.payload
        }
      }
    }

    case Actions.SET_BEDS_FILTER: {
      return {
        ...state,
        filters: {
          ...state.filters,
          beds: action.payload
        }
      }
    }

    case Actions.SET_BATHROOM_FILTER: {
      return {
        ...state,
        filters: {
          ...state.filters,
          bathrooms: action.payload
        }
      }
    }

    case Actions.SET_BUILDING_TYPE_FILTER: {
      return {
        ...state,
        filters: {
          ...state.filters,
          buildingTypes: action.payload
        }
      }
    }

    case Actions.CLEAR_SEARCH_FILTER: {
      const clearedFilterState = { ...state };
      const initialState = getInitialState();

      switch (action.payload.type) {
        case 'all': {
          clearedFilterState.filters = initialState.filters;
          break;
        }

        case 'beds': {
          clearedFilterState.filters.beds = initialState.filters.beds;
          break;
        }

        case 'bathrooms': {
          clearedFilterState.filters.bathrooms = initialState.filters.bathrooms;
          break;
        }

        case 'price': {
          clearedFilterState.filters.price = initialState.filters.price;
          break;
        }

        case 'moveInDate': {
          clearedFilterState.filters.moveInDate = initialState.filters.moveInDate;
          break;
        }

        case 'buildingTypes': {
          clearedFilterState.filters.buildingTypes = initialState.filters.buildingTypes;
          break;
        }

        case 'locationAll': {
          clearedFilterState.filters.location = clearedFilterState.filters.location.filter(id => !action.payload.value.includes(id));
          break;
        }

        case 'location': {
          clearedFilterState.filters.location = clearedFilterState.filters.location.filter(id => id !== action.payload.value);
          break;
        }
      }

      return clearedFilterState;
    }
  }

  return state;
};

export default searchFiltersReducer;
