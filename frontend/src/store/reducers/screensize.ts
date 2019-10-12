import { Actions, ActionTypes } from "../actions/index";

interface screensizeState {
  size: string
}

const getInitialState = () => {
  return {
    size: 'mobile'
  };
};

const screensizeReducer = (
  state: screensizeState = getInitialState(),
  action: ActionTypes
) => {
  switch (action.type) {
    case Actions.UPDATE_SCREENSIZE: {
      // try to keep these in sync with media queries
      let size = 'phone-only';

      if (action.payload >= 768) {
        size = 'tablet-portrait-up';
      }

      if (action.payload >= 900) {
        size = 'tablet-landscape-up';
      }

      if (action.payload >= 1200) {
        size = 'desktop-up';
      }

      if (action.payload >= 1800) {
        size = 'big-desktop-up';
      }

      return {
        ...state,
        size
      };
    }
  }

  return state;
};

export default screensizeReducer;
