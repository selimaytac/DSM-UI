const getters = {
    getIsLoggedIn(state) {
      console.log(state);
      return state.isLoggedIn;
    },
    getToken(state) {
      return state.token;
    },
    getUsername(state) {
      return state.username;
    },
    getFullName(state) {
      return state.fullName;
    },
    getProfilePhoto(state) {
      return state.profilePhoto;
    },
  };
  export default getters;