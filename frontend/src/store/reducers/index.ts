import { combineReducers } from "redux";

import authReducer from "./auth";
import screenSize from "./screensize";
import search from "./search";
import neighborhoods from "./neighborhoods";

const rootReducer = (combineReducers as any)({
  authReducer,
  screenSize,
  search,
  neighborhoods
});

export default rootReducer;
