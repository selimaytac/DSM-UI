import Vue from "vue";
import Vuex from "vuex";
import { auth} from "./modules/auth";
import { server } from "./modules/server";
import { site } from "./modules/site";
import {company} from "./modules/company";
import {responsible} from "./modules/responsible";
import { databaseportal } from "./modules/database";

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    server,
    site,
    company,
    responsible,
    databaseportal,
  },
  plugins: [
    createPersistedState({
      paths: ["auth","server","site","company","responsible","databaseportal"],
    }),
  ],
});
