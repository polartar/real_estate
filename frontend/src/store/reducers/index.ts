import { combineReducers } from "redux";

import authReducer from "./auth";
import screenSize from "./screensize";
import search from "./search";
import taxonomy from './taxonomy';

const rootReducer = (combineReducers as any)({
  authReducer,
  screenSize,
  search,
  taxonomy
});

export default rootReducer;
