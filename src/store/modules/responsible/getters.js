const getters = {
    getResponsibleList(state) {
      return state.ResponsibleList;
    },  
    getResponsibleServers(state) {
      return state.ResponsibleServers;
    },
    getResponsibleSites(state) {
        return state.ResponsibleSites;
      },
  };
  export default getters;