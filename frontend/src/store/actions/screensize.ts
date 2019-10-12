import { Actions } from "./index";

export function updateScreenSize(size) {
  return async dispatch => {
    dispatch({
      type: Actions.UPDATE_SCREENSIZE,
      payload: size
    })
  };
};

export interface UpdateScreenSize {
  type: Actions.UPDATE_SCREENSIZE;
  payload: any;
};
