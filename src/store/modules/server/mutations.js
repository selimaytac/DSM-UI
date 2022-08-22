const mutations = {
    SET_SERVER_LIST(state, payload) {
        state.ServerList = payload;
    },
    SET_SERVER_DETAILS(state, payload) {
        state.ServerDetails = payload;
    },
    SET_SERVER_HEADER(state, payload) {
        state.ServerHeader = payload;
    },
    SET_SERVER_SITES(state, payload) {
        state.ServerSites = payload;
    },
};
export default mutations;