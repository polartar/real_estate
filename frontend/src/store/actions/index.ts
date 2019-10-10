import {
  LoginBeginAction,
  LoginFailAction,
  loginSuccessAction,
  logoutAction,
  saveStateAction
} from "./auth";

export type ActionTypes =
  | LoginBeginAction
  | LoginFailAction
  | loginSuccessAction
  | logoutAction
  | saveStateAction;

export enum Actions {
  LOGIN_BEGIN = "LOGIN_BEGIN",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAIL = "LOGIN_FAIL",
  LOGOUT = "LOGOUT",
  SAVE_STATE = "SAVE_STATE"
}
