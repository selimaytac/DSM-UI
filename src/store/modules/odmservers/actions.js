import { odmserverService } from "@/services/api/odmserver.service";
const actions = {
  async setOdmServers(vuexContext, data) {
    const res = await odmserverService.getOdmServers(data);
    // vuexContext.commit("SET_SERVER_LIST", res);
    return res;
  },
}
export default actions;