import { Actions } from "./index";
import { APITaxonomyService } from '../../services/api/taxonomy';

export function getTaxonomy() {
  return async dispatch => {

    dispatch({
      type: Actions.SET_TAXONOMY_LOADING
    });

    let result;
    try {
      result = await APITaxonomyService.getTaxonomy();

      dispatch({
        type: Actions.SET_TAXONOMY,
        payload: result
      });

    } catch (e) {
      console.log('Failed to fetch taxonomy', e);
    }
  };
};

export interface SetTaxonomy {
  type: Actions.SET_TAXONOMY;
  payload: any;
};

export interface SetTaxonomyLoading {
  type: Actions.SET_TAXONOMY_LOADING
};
