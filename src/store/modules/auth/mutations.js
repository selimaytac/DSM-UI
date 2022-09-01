const mutations = {
  credentials(state, payload) {
    state.token = payload.token;
    state.username = payload.username;
    state.fullName = payload.fullName;
    state.profilePhoto = payload.profilePhoto;
    state.department = payload.department;
    state.isLoggedIn = true;
  },
  logOut(state) {
    state.isLoggedIn = false;
    state.token = "";
  },
  setDomain(state, payload) {
    state.stateDomain = payload;
  },
};
export default mutations;