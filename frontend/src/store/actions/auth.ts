import { Actions } from "./index";
import { APIService } from '../../services/api/api.service';

export function login(email: string, password: string) {
  return async dispatch => {
    dispatch(loginBegin());

    try {
      let user = await APIService.login(email, password);

      dispatch(loginSuccess(user));

      dispatch(saveState());
    } catch (err) {
      dispatch(loginFail(err));
    }
  };
};

export function logout() {
  return async dispatch => {
    dispatch({
      type: Actions.LOGOUT
    });

    dispatch(saveState());
  };
};

export interface logoutAction {
  type: Actions.LOGOUT
};

export const loginBegin = () => async (dispatch, _getState) => {
  return dispatch({
    type: Actions.LOGIN_BEGIN
  });
};

export interface LoginBeginAction {
  type: Actions.LOGIN_BEGIN;
};

export const loginFail = error => async (dispatch, _getState) => {
  return dispatch({
    type: Actions.LOGIN_FAIL,
    payload: error
  });
};

export interface LoginFailAction {
  type: Actions.LOGIN_FAIL;
  payload: any;
};

export const loginSuccess = user => async (dispatch, _getState) => {
  return dispatch({
    type: Actions.LOGIN_SUCCESS,
    payload: user
  })
};

export interface loginSuccessAction {
  type: Actions.LOGIN_SUCCESS;
  payload: any;
};

export const saveState = () => async (dispatch, _getState) => {
  return dispatch({
    type: Actions.SAVE_STATE,
    payload: _getState()
  });
};

export interface saveStateAction {
  type: Actions.SAVE_STATE;
  payload: any;
}
