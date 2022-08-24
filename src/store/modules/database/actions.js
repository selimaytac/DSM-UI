import { dbportalService } from "@/services/api/dbportal.service";
const actions = {
  async setDatabases(vuexContext, data) {
    const res = await dbportalService.getDatabases(data);
    // vuexContext.commit("SET_SERVER_LIST", res);
    return res;
  },
  async setDatabaseDetails(vuexContext, data) {
    const res = await dbportalService.getDatabaseDetails(data);
    vuexContext.commit("SET_DATABASE_DETAILS", data);
    return res;
  },
}
export default actions;