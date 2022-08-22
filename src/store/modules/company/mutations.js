const mutations = {
    SET_COMPANY_LIST(state, payload) {
        state.CompanyList = payload;
    },
    SET_COMPANY_HEADER(state, payload) {
        state.CompanyHeaders = payload;
    },
    SET_COMPANY_SERVERS(state, payload) {
        state.CompanyServers = payload;
    },
    SET_COMPANY_SITES(state, payload) {
        state.CompanySites = payload;
    },
};
export default mutations;