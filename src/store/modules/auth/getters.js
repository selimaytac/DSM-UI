const getters = {
    getIsLoggedIn(state) {
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
    getDepartment(state) {
      return state.department;
    },
    getStateDomain(state) {
      return state.stateDomain;
    },
    getRole(state){
      return state.role;
    }
  };
  export default getters;