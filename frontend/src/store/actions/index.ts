import {
  LoginBeginAction,
  LoginFailAction,
  loginSuccessAction,
  logoutAction,
  saveStateAction
} from "./auth";

import {
  UpdateScreenSize
} from "./screensize";


import {
  ToggleSearchFilters,
  SetLocationFilters,
  SetMoveInFilter,
  SetPriceFilter
} from "./search-filters";

export type ActionTypes =
  | LoginBeginAction
  | LoginFailAction
  | loginSuccessAction
  | logoutAction
  | saveStateAction
  | UpdateScreenSize
  | ToggleSearchFilters
  | SetLocationFilters
  | SetMoveInFilter
  | SetPriceFilter;

export enum Actions {
  LOGIN_BEGIN = "LOGIN_BEGIN",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAIL = "LOGIN_FAIL",
  LOGOUT = "LOGOUT",
  SAVE_STATE = "SAVE_STATE",
  UPDATE_SCREENSIZE = "UPDATE_SCREENSIZE",
  TOGGLE_SEARCH_FILTER_DISPLAY = "TOGGLE_SEARCH_FILTER_DISPLAY",
  SET_LOCATION_FILTERS = "SET_LOCATION_FILTERS",
  SET_MOVE_IN_FILTER = "SET_MOVE_IN_FILTER",
  SET_PRICE_FILTER = "SET_PRICE_FILTER",
}
