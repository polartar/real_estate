import { createStore, applyMiddleware } from "redux";
import { EnvironmentConfigService } from '../services/environment/environment-config.service';
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";
import logger from "redux-logger";

const configureStore = (preloadedState: any) => {
  if (EnvironmentConfigService.getInstance().get('APP_ENVIRONMENT') === 'production') {
    console.log('building prod');
    return createStore(rootReducer, preloadedState, applyMiddleware(thunk));
  }
  else {
    console.log('building dev');
    return createStore(rootReducer, preloadedState, applyMiddleware(thunk, logger));
  }
};

export { configureStore }
