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
