
const authSelectors = {
  getIsLoading: state => {
    return !!state.auth.loading;
  },

  getLoginError: state => {
    return state.auth.error;
  },

  getUser: state => {
    return { ...state.auth.user };
  },

  getAccessToken: state => {
    return state.auth.access_token;
  },

  isLoggedIn: state => {
    const user = authSelectors.getUser(state);
    const access_token = authSelectors.getAccessToken(state);

    return user.hasOwnProperty('id') && !!access_token.length;
  }
}

export default authSelectors;
