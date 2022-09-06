import Vue from "vue";
import Vuex from "vuex";
import { auth } from "./modules/auth";
import { server } from "./modules/server";
import { site } from "./modules/site";
import { company } from "./modules/company";
import { responsible } from "./modules/responsible";
import { databaseportal } from "./modules/database";
import { scheduledjobs } from "./modules/scheduledJobs";
import { odmservers } from "./modules/odmservers";
import { monthlykpi} from "./modules/monthlykpi";
import { elastic } from "./modules/elasticSearch";
import { azureprojects} from "./modules/azureProjects";

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
    scheduledjobs,
    odmservers,
    monthlykpi,
    elastic,
    azureprojects

  },
  plugins: [
    createPersistedState({
      paths: ["auth", "server", "site", "company", "responsible", "databaseportal", "scheduledjobs", "odmservers","monthlykpi","elastic","azureprojects"],
    }),
  ],
});
