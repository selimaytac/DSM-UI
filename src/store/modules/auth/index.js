import actions from "./actions";
import getters from "./getters";
import state from "./state";

export const auth = {
  namespaced: true,
  state,
  getters,
  actions,
};