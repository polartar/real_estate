import { Actions, ActionTypes } from "../actions/index";

interface screensizeState {
  width: number,
  height: number,
  size: string,
  isMobile: boolean,
  isDesktop: boolean,
}

const getInitialState = () => {
  return {
    width: 375,
    height: 812,
    size: 'phone-only',
    isMobile: true,
    isDesktop: false,
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

      if (action.payload.width >= 768) {
        size = 'tablet-portrait-up';
      }

      if (action.payload.width >= 900) {
        size = 'tablet-landscape-up';
      }

      if (action.payload.width >= 1200) {
        size = 'desktop-up';
        isMobile = false;
        isDesktop = true;
      }

      if (action.payload.width >= 1800) {
        size = 'big-desktop-up';
        isMobile = false;
        isDesktop = true;
      }

      return {
        ...state,
        width: action.payload.width,
        height: action.payload.height,
        size,
        isMobile,
        isDesktop
      };
    }
  }

  return state;
};

export default screensizeReducer;
