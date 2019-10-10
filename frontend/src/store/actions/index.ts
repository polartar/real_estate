import {
  LoginBeginAction,
  LoginFailAction,
  loginSuccessAction,
  saveStateAction
} from "./auth";

export type ActionTypes =
  | LoginBeginAction
  | LoginFailAction
  | loginSuccessAction
  | saveStateAction;

export enum Actions {
  LOGIN_BEGIN = "LOGIN_BEGIN",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAIL = "LOGIN_FAIL",
  SAVE_STATE = "SAVE_STATE"
}
