const getters = {
    getSiteList(state) {
      return state.SiteList;
    },  
    getSiteDetails(state) {
      return state.SiteDetails;
    },
    getSiteHeaders(state) {
      return state.SiteHeaders;
    },
    getSiteBindings(state) {
      return state.SiteBindings;
    },
    getSitePackages(state) {
        return state.SitePackages;
      },
      getSiteEndpoints(state) {
        return state.SiteEndpoints;
      },
  };
  export default getters;