import { Actions } from "./index";
import { APISearchService } from '../../services/api/search';
import { generateId } from '../../helpers/utils';

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

export function setSortbyFilter(sortby) {
  return async dispatch => {
    dispatch({
      type: Actions.SET_SORTBY_FILTER,
      payload: sortby
    })
  }
}

export interface SetSortbyFilter {
  type: Actions.SET_SORTBY_FILTER,
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
    const requestId = generateId(16);

    // set loading states
    dispatch({
      type: Actions.SET_SEARCH_LOADING,
      payload: {
        loading: true,
        id: requestId // id used to make sure we don't load stale results in race conditions
      }
    });

    let results = [];
    let resultsNum = 0;

    try {
      const result = await APISearchService.search(filters);
      results = result.results;
      resultsNum = result.total;
    } catch(e) {
      console.log(e);
    }

    dispatch({
      type: Actions.SET_SEARCH_LISTINGS,
      payload: {
        id: requestId, // if the id in state no longer matches this ID it means another request is in progress and this will be ignored
        listings: results,
        listingsCount: resultsNum
      }
    });
  }
}

export interface SetSearchListings {
  type: Actions.SET_SEARCH_LISTINGS,
  payload: any
}

export interface SetSearchLoading {
  type: Actions.SET_SEARCH_LOADING,
  payload: any
}

export function getNamedSearch(name) {
  // call some API that gets results for named search
  // like unique homes in new york = 'unique'
  // used for home page sliders
  // these results don't get placed in the store, used locally by component that calls it

  return async () => {
    // perform our search
    try {
      return await APISearchService.getNamedSearch(name);
    }
    catch (e) {
      return [];
    }
  }
}

export interface GetNamedSearch {
  type: Actions.GET_NAMED_SEARCH_RESULTS,
  payload: any
}
