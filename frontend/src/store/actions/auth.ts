import { Actions } from "./index";
import { APIService } from '../../services/api/api.service';
import { APIAuthService } from "../../services/api/auth";

export function login(email: string, password: string) {
  return async dispatch => {
    dispatch(loginBegin());

    try {
      let access_token = await APIAuthService.login(email, password);

      APIService.setAccessToken(access_token);

      let user = await APIAuthService.getUser();

      dispatch(loginSuccess(user, access_token));

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

    try {
      APIAuthService.logout();
    } catch (err) {

    }
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

export const loginSuccess = (user, access_token) => async (dispatch, _getState) => {
  return dispatch({
    type: Actions.LOGIN_SUCCESS,
    payload: { user, access_token }
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
