const mutations = {
    SET_INVENTORY_LIST(state, payload) {
        state.InventoryList = payload;
    },
    SET_INVENTORY_BINDINGS(state, payload) {
        state.SiteBindings = payload;
    },
};
export default mutations;