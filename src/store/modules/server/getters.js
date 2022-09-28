const getters = {
  getServerList(state) {
    return state.ServerList;
  },  
  getServerDetails(state) {
    return state.ServerDetails;
  },
  getServerHeaders(state) {
    return state.ServerHeaders;
  },
  getServerSites(state) {
    return state.ServerSites;
  },
  getServerCheckDate(state) {
    return state.ServerCheckDate;
  }
};
export default getters;