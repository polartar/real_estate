import {
  LoginBeginAction,
  LoginFailAction,
  loginSuccessAction,
  logoutAction,
  saveStateAction
} from "./auth";

import {
  BookingReset,
  BookingSetCheckin,
  BookingSetCheckout,
  BookingSetGuests,
  BookingSetDetails
} from "./booking";

import {
  UpdateScreenSize
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
  SetSelectedListings,
  SetSearchListingHover,
  SetMapMarkers,
  SetMapMarkersLoading
} from "./search";

import {
  SetTaxonomy,
  SetTaxonomyLoading
} from "./taxonomy";

import {
  AddToWishlist,
  RemoveFromWishlist
} from "./wishlist";

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
  | SetSelectedListings
  | SetSearchListingHover
  | SetMapMarkers
  | SetMapMarkersLoading
  | AddToWishlist
  | RemoveFromWishlist
  | BookingReset
  | BookingSetCheckin
  | BookingSetCheckout
  | BookingSetGuests
  | BookingSetDetails
;

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
  SET_BEDS_FILTER = "SET_BEDS_FILTER",
  SET_BATHROOM_FILTER = "SET_BATHROOM_FILTER",
  SET_BUILDING_TYPE_FILTER = "SET_BUILDING_TYPE_FILTER",
  SET_SORTBY_FILTER = "SET_SORTBY_FILTER",
  CLEAR_SEARCH_FILTER = "CLEAR_SEARCH_FILTER",
  SET_SEARCH_LOADING = "SET_SEARCH_LOADING",
  SET_SEARCH_LISTINGS = "SET_SEARCH_LISTINGS",
  SET_MAP_MARKERS = "SET_MAP_MARKERS",
  SET_MAP_MARKERS_LOADING = "SET_MAP_MARKERS_LOADING",
  GET_NAMED_SEARCH_RESULTS = "GET_NAMED_SEARCH_RESULTS",
  SET_TAXONOMY = "SET_TAXONOMY",
  SET_TAXONOMY_LOADING = "SET_TAXONOMY_LOADING",
  SET_SELECTED_LISTING = "SET_SELECTED_LISTING",
  SET_SELECTED_LISTINGS = "SET_SELECTED_LISTINGS",
  SET_SEARCH_LISTING_HOVER = "SET_SEARCH_LISTING_HOVER",
  ADD_TO_WISHLIST = "ADD_TO_WISHLIST",
  REMOVE_FROM_WISHLIST = "REMOVE_FROM_WISHLIST",
  BOOKING_SET_CHECKIN_DATE = "BOOKING_SET_CHECKIN_DATE",
  BOOKING_SET_CHECKOUT_DATE = "BOOKING_SET_CHECKOUT_DATE",
  BOOKING_SET_GUESTS = "BOOKING_SET_GUESTS",
  BOOKING_RESET = "BOOKING_RESET",
  BOOKING_SET_DETAILS = "BOOKING_SET_DETAILS"
}
