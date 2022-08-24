const getters = {
    geResponsibleList(state) {
      return state.CompanyList;
    },  
    getResponsibleServers(state) {
      return state.ResponsibleServers;
    },
    getResponsibleSites(state) {
        return state.ResponsibleSites;
      },
  };
  export default getters;