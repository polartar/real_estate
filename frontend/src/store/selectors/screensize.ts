
const screensizeSelectors = {
  getIsMobile: state => {
    return !!state.screenSize.isMobile;
  },

  getHeight: state => {
    return state.screenSize.height;
  },

  getWidth: state => {
    return state.screenSize.width;
  }
}

export default screensizeSelectors;
