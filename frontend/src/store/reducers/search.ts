import { Actions, ActionTypes } from "../actions/index";

interface searchState {
  displayFilter: boolean,
  filters: any,
  loading: boolean,
  searchRequestId: string,
  listings: any[],
  listingsCount: number,
  selectedListings: any[]
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
      buildingTypes: [],
      sortBy: 'availability',
    },
    loading: false,
    searchRequestId: '',
    listings: [],
    listingsCount: 0,
    selectedListings: []
  }
};

const searchReducer = (
  state: searchState = getInitialState(),
  action: ActionTypes
) => {
  switch (action.type) {
    case Actions.TOGGLE_SEARCH_FILTER_DISPLAY: {
      return {
        ...state,
        displayFilter: action.payload
      };
    }

    case Actions.SET_SEARCH_LOADING: {

      return {
        ...state,
        loading: action.payload.loading,
        searchRequestId: action.payload.id
      }
    }

    case Actions.SET_SEARCH_LISTINGS: {
      // make sure this isn't results from a stale request
      if (state.searchRequestId !== action.payload.id) {
        // searchRequestId changed since this action was triggered
        // these are stale results

        return state;
      }

      // remove selected listings that are no longer in the results
      let newSelected = state.selectedListings.filter(v => !!action.payload.listings.find(l => l.id === v));

      return {
        ...state,
        listings: action.payload.listings,
        listingsCount: action.payload.listingsCount,
        loading: false,
        selectedListings: newSelected
      }
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

    case Actions.SET_SORTBY_FILTER: {
      let newState = {...state};
      newState.filters.sortBy = action.payload;

      return newState;
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

    case Actions.SET_SELECTED_LISTING: {
      let newState = {...state};

      if (action.payload.value) {
        newState.selectedListings = [...newState.selectedListings, action.payload.id];

        // make sure they're unique
        newState.selectedListings = [...new Set(newState.selectedListings)];
      }
      else {
        newState.selectedListings = newState.selectedListings.filter(v => v !== action.payload.id);
      }

      return newState;
    }
  }

  return state;
};

export default searchReducer;
