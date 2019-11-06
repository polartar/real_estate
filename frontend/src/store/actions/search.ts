import { Actions } from "./index";

export function toggleSearchFilterDisplay(status) {
  return async dispatch => {
    dispatch({
      type: Actions.TOGGLE_SEARCH_FILTER_DISPLAY,
      payload: status
    })
  };
};

export interface ToggleSearchFilters {
  type: Actions.TOGGLE_SEARCH_FILTER_DISPLAY;
  payload: any;
};

export function setLocationFilters(filters) {
  return async dispatch => {
    dispatch({
      type: Actions.SET_LOCATION_FILTERS,
      payload: filters
    })
  };
};

export interface SetLocationFilters {
  type: Actions.SET_LOCATION_FILTERS;
  payload: any;
}

export function setMoveInFilter(value) {
  return async dispatch => {
    dispatch({
      type: Actions.SET_MOVE_IN_FILTER,
      payload: value
    })
  };
}

export interface SetMoveInFilter {
  type: Actions.SET_MOVE_IN_FILTER,
  payload: any;
}

export function setPriceFilter(value) {
  return async dispatch => {
    dispatch({
      type: Actions.SET_PRICE_FILTER,
      payload: value
    })
  };
}

export interface SetPriceFilter {
  type: Actions.SET_PRICE_FILTER,
  payload: any
}

export function setBedsFilter(value) {
  return async dispatch => {
    dispatch({
      type: Actions.SET_BEDS_FILTER,
      payload: value
    })
  };
}

export interface SetBedsFilter {
  type: Actions.SET_BEDS_FILTER,
  payload: any
}

export function setBathroomsFilter(value) {
  return async dispatch => {
    dispatch({
      type: Actions.SET_BATHROOM_FILTER,
      payload: value
    })
  };
}

export interface SetBathroomsFilter {
  type: Actions.SET_BATHROOM_FILTER,
  payload: any
}


export function setBuildingTypesFilter(value) {
  return async dispatch => {
    dispatch({
      type: Actions.SET_BUILDING_TYPE_FILTER,
      payload: value
    })
  };
}

export interface SetBuildingTypesFilter {
  type: Actions.SET_BUILDING_TYPE_FILTER,
  payload: any
}

export function clearSearchFilter(type, value) {
  return async dispatch => {
    dispatch({
      type: Actions.CLEAR_SEARCH_FILTER,
      payload: {
        type,
        value
      }
    })
  };
}

export interface ClearSearchFilter {
  type: Actions.CLEAR_SEARCH_FILTER,
  payload: any
}

export function getSearchListings(filters) {
  return async dispatch => {

    // set loading states
    dispatch({
      type: Actions.SET_SEARCH_LOADING,
      payload: true
    });

    // perform our search
    console.log('searching', filters);
    await new Promise(resolve => setTimeout(() => resolve, 3000));

    dispatch({
      type: Actions.SET_SEARCH_LISTINGS,
      payload: {
        count: 0,
        listings: []
      }
    });

    dispatch({
      type: Actions.SET_SEARCH_LOADING,
      payload: false
    });
  }
}

export interface SetSearchListings {
  type: Actions.SET_SEARCH_LISTINGS,
  payload: any
}

export interface SetSearchLoading {
  type: Actions.SET_SEARCH_LOADING,
  payload: boolean
}
