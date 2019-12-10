import { combineReducers } from "redux";

import auth from "./auth";
import screenSize from "./screensize";
import search from "./search";
import taxonomy from "./taxonomy";
import wishlist from "./wishlist";

const rootReducer = (combineReducers as any)({
  auth,
  screenSize,
  search,
  taxonomy,
  wishlist
});

export default rootReducer;
