import { combineReducers } from "redux";

import authReducer from "./auth";

const rootReducer = (combineReducers as any)({
  authReducer
});

export default rootReducer;
