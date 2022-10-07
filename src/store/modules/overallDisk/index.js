import actions from "./actions";
import getters from "./getters";
import state from "./state";
import mutations from "./mutations";

export const overalldisk = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};