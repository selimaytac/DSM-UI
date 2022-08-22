const mutations = {
    SET_SITE_LIST(state, payload) {
        state.SiteList = payload;
    },
    SET_SITE_DETAILS(state, payload) {
        state.SiteDetails = payload;
    },
    SET_SITE_HEADER(state, payload) {
        state.SiteHeader = payload;
    },
    SET_SITE_BINDINGS(state, payload) {
        state.SiteBindings = payload;
    },
    SET_SITE_PACKAGES(state, payload) {
        state.SitePackages = payload;
    },
    SET_SITE_ENDPOINTS(state, payload) {
        state.SiteEndpoints = payload;
    },
};
export default mutations;