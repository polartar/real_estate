import { Actions } from "./index";
import { APINeighborhoodsService } from '../../services/api/neighborhoods';

export function getNeighborhoodsTaxonomy() {
  return async dispatch => {

    dispatch({
      type: Actions.SET_NEIGHBORHOODS_LOADING
    });

    let result;
    try {
      result = await APINeighborhoodsService.getNeighborhoodTaxonomy();

      dispatch({
        type: Actions.SET_NEIGHBORHOODS_TAXONOMY,
        payload: result
      });

    } catch (e) {
      console.log('Failed to fetch neighborhood taxonomy', e);
    }
  };
};

export interface SetNeighborhoodsTaxonomy {
  type: Actions.SET_NEIGHBORHOODS_TAXONOMY;
  payload: any;
};

export interface SetNeighborhoodsLoading {
  type: Actions.SET_NEIGHBORHOODS_LOADING
};
