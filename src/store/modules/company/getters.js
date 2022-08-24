const getters = {
    getCompanyList(state) {
      return state.CompanyList;
    },  
    getCompanyHeader(state) {
      return state.CompanyHeaders;
    },
    getCompanyServers(state) {
      return state.CompanyServers;
    },
    getCompanySites(state) {
        return state.CompanySites;
      },
  };
  export default getters;