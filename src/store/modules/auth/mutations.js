const mutations = {
    credentials(state, payload) {
      state.token = payload.token;
      state.username = payload.username;
      state.fullName = payload.fullName;
      state.profilePhoto = payload.profilePhoto;
      state.isLoggedIn = true;
    },
    logOut(state) {
        state.isLoggedIn = false;
        state.token = "";
      },
  };
  export default mutations;