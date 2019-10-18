import { createStore, applyMiddleware } from "redux";
import { EnvironmentConfigService } from '../services/environment/environment-config.service';
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";
import logger from "redux-logger";

const configureStore = (preloadedState: any) => {
  if (EnvironmentConfigService.getInstance().get('APP_ENVIRONMENT') === 'production') {
    return createStore(rootReducer, preloadedState, applyMiddleware(thunk));
  }
  else {
    return createStore(rootReducer, preloadedState, applyMiddleware(thunk, logger));
  }
};

export { configureStore }
