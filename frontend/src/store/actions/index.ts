import {
  LoginBeginAction,
  LoginFailAction,
  loginSuccessAction,
  logoutAction,
  saveStateAction
} from "./auth";

import {
  UpdateScreenSize,
  UpdateHeaderHeight
} from "./screensize";


import {
  ToggleSearchFilters,
  SetLocationFilters,
  SetMoveInFilter,
  SetPriceFilter,
  SetBedsFilter,
  SetBathroomsFilter,
  SetBuildingTypesFilter,
  SetSortbyFilter,
  ClearSearchFilter,
  SetSearchListings,
  SetSearchLoading,
  GetNamedSearch,
  SetSelectedListing,
  SetSearchListingHover
} from "./search";

import {
  SetTaxonomy,
  SetTaxonomyLoading
} from './taxonomy';

export type ActionTypes =
  | LoginBeginAction
  | LoginFailAction
  | loginSuccessAction
  | logoutAction
  | saveStateAction
  | UpdateScreenSize
  | UpdateHeaderHeight
  | ToggleSearchFilters
  | SetLocationFilters
  | SetMoveInFilter
  | SetPriceFilter
  | SetBedsFilter
  | SetBathroomsFilter
  | SetBuildingTypesFilter
  | SetSortbyFilter
  | ClearSearchFilter
  | SetSearchListings
  | SetSearchLoading
  | GetNamedSearch
  | SetTaxonomy
  | SetTaxonomyLoading
  | SetSelectedListing
  | SetSearchListingHover
;

export enum Actions {
  LOGIN_BEGIN = "LOGIN_BEGIN",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAIL = "LOGIN_FAIL",
  LOGOUT = "LOGOUT",
  SAVE_STATE = "SAVE_STATE",
  UPDATE_SCREENSIZE = "UPDATE_SCREENSIZE",
  UPDATE_HEADER_HEIGHT = "UPDATE_HEADER_HEIGHT",
  TOGGLE_SEARCH_FILTER_DISPLAY = "TOGGLE_SEARCH_FILTER_DISPLAY",
  SET_LOCATION_FILTERS = "SET_LOCATION_FILTERS",
  SET_MOVE_IN_FILTER = "SET_MOVE_IN_FILTER",
  SET_PRICE_FILTER = "SET_PRICE_FILTER",
  SET_BEDS_FILTER = "SET_BEDS_FILTER",
  SET_BATHROOM_FILTER = "SET_BATHROOM_FILTER",
  SET_BUILDING_TYPE_FILTER = "SET_BUILDING_TYPE_FILTER",
  SET_SORTBY_FILTER = "SET_SORTBY_FILTER",
  CLEAR_SEARCH_FILTER = "CLEAR_SEARCH_FILTER",
  SET_SEARCH_LOADING = "SET_SEARCH_LOADING",
  SET_SEARCH_LISTINGS = "SEARCH_LISTINGS",
  GET_NAMED_SEARCH_RESULTS = "GET_NAMED_SEARCH_RESULTS",
  SET_TAXONOMY = "SET_TAXONOMY",
  SET_TAXONOMY_LOADING = "SET_TAXONOMY_LOADING",
  SET_SELECTED_LISTING = "SET_SELECTED_LISTING",
  SET_SEARCH_LISTING_HOVER = "SET_SEARCH_LISTING_HOVER"
}
