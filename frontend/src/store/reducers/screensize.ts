import { Actions, ActionTypes } from "../actions/index";

interface screensizeState {
  size: string
}

const getInitialState = () => {
  return {
    size: 'phone-only',
    isMobile: true,
    isDesktop: false
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
      let isMobile = true;
      let isDesktop = false;

      if (action.payload >= 768) {
        size = 'tablet-portrait-up';
      }

      if (action.payload >= 900) {
        size = 'tablet-landscape-up';
      }

      if (action.payload >= 1200) {
        size = 'desktop-up';
        isMobile = false;
        isDesktop = true;
      }

      if (action.payload >= 1800) {
        size = 'big-desktop-up';
        isMobile = false;
        isDesktop = true;
      }

      return {
        ...state,
        size,
        isMobile,
        isDesktop
      };
    }
  }

  return state;
};

export default screensizeReducer;
