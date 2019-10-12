import { combineReducers } from "redux";

import authReducer from "./auth";
import screenSize from "./screensize";
import searchFilters from "./search-filters";

const rootReducer = (combineReducers as any)({
  authReducer,
  screenSize,
  searchFilters,
});

export default rootReducer;
