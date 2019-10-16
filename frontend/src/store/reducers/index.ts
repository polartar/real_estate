import { combineReducers } from "redux";

import authReducer from "./auth";
import screenSize from "./screensize";
import searchFilters from "./search-filters";
import neighborhoods from "./neighborhoods";

const rootReducer = (combineReducers as any)({
  authReducer,
  screenSize,
  searchFilters,
  neighborhoods
});

export default rootReducer;
