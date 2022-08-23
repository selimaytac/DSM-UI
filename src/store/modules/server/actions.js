import { serverService } from "@/services/api/server.service";
const actions = {
  async setServers(vuexContext, data) {
    const res = await serverService.getServers(data);
    // vuexContext.commit("SET_SERVER_LIST", res);
    return res;
  },
  async setServerDetails(vuexContext, data) {
    const res = await serverService.getServerDetails(data);
    vuexContext.commit("SET_SERVER_DETAILS", data);
    return res;
  },
  async setServerHeader(vuexContext, data) {
    const res = await serverService.getServerHeader(data);
    vuexContext.commit("SET_SERVER_HEADER", data);
    return res;
  },
  async setServerSites(vuexContext, data) {
    const res = await serverService.getServerSites(data);
    vuexContext.commit("SET_SERVER_SITES", data);
    return res;
  },  
}
export default actions;