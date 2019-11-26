import { Actions } from "./index";

export function updateScreenSize(width, height) {
  return async dispatch => {
    dispatch({
      type: Actions.UPDATE_SCREENSIZE,
      payload: { width, height }
    })
  };
};

export interface UpdateScreenSize {
  type: Actions.UPDATE_SCREENSIZE;
  payload: any;
};
