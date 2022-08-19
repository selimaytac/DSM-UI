import Vue from "vue";
import Vuex from "vuex";
import { auth} from "./modules/auth";
import { server } from "./modules/server";

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    server,
  },
  plugins: [
    createPersistedState({
      paths: ["auth","server"],
    }),
  ],
});
