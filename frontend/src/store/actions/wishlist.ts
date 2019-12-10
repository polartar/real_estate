import { Actions } from "./index";
import { saveState } from '../../services/storage';

export function addToWishlist(id) {
  return async (dispatch, getState) => {
    dispatch({
      type: Actions.ADD_TO_WISHLIST,
      payload: id
    });

    const state = getState();

    saveState(state);
  };
};

export interface AddToWishlist {
  type: Actions.ADD_TO_WISHLIST;
  payload: number;
};

export function removeFromWishlist(id) {
  return async (dispatch, getState) => {
    dispatch({
      type: Actions.REMOVE_FROM_WISHLIST,
      payload: id
    });

    const state = getState();

    saveState(state);
  }
}

export interface RemoveFromWishlist {
  type: Actions.REMOVE_FROM_WISHLIST,
  payload: number;
}
