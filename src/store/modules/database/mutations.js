const mutations = {
    SET_DATABASE_LIST(state, payload) {
        state.DatabaseList = payload;
    },
    SET_DATABASE_DETAILS(state, payload) {
        state.DatabaseDetails = payload;
    },
};
export default mutations;