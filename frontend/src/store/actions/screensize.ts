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


export function updateHeaderHeight(height) {
  return async dispatch => {
    dispatch ({
      type: Actions.UPDATE_HEADER_HEIGHT,
      payload: height
    })
  }
}

export interface UpdateHeaderHeight {
  type: Actions.UPDATE_HEADER_HEIGHT;
  payload: number;
}
