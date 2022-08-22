import { serverService } from "@/services/api/server.service";
const actions = {
  async setServers(vuexContext, data) {
    const res = await serverService.getServers(data);
    // vuexContext.commit("SET_SERVER_LIST", res);
    return res;
  },
  setServer(vuexContext, data) {
    vuexContext.commit("SET_SERVER_DETAILS", data);
  },
  setServerHeader(vuexContext, data) {
    vuexContext.commit("SET_SERVER_HEADER", data);
  },
  setServerSites(vuexContext, data) {
    vuexContext.commit("SET_SERVER_SITES", data);
  },  
}
export default actions;