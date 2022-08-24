const mutations = {
    SET_RESPONSIBLE_LIST(state, payload) {
        state.ResponsibleList = payload;
    },
    SET_RESPONSIBLE_SERVERS(state, payload) {
        state.ResponsibleServers = payload;
    },
    SET_RESPONSIBLE_SITES(state, payload) {
        state.ResponsibleSites = payload;
    },
};
export default mutations;