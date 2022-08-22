import Vue from "vue";
import Vuex from "vuex";
import { auth} from "./modules/auth";
import { server } from "./modules/server";
import { site } from "./modules/site";
import {company} from "./modules/company";

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    server,
    site,
    company,
  },
  plugins: [
    createPersistedState({
      paths: ["auth","server","site","company"],
    }),
  ],
});
