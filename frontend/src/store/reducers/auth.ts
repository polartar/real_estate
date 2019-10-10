import { Actions, ActionTypes } from "../actions/index";
import { saveState } from '../../services/storage';

interface AuthState {
  user: any;
  access_token: string;
  loading: boolean;
  error: any;
}

const getInitialState = () => {
  return {
    user: {},
    access_token: '',
    loading: false,
    error: null
  };
};

const authReducer = (
  state: AuthState = getInitialState(),
  action: ActionTypes
) => {
  switch (action.type) {
    case Actions.LOGIN_BEGIN: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case Actions.LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        user: action.payload
      };
    }

    case Actions.LOGIN_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    }

    case Actions.SAVE_STATE: {
      saveState(action.payload);
    }
  }

  return state;
};

export default authReducer;
