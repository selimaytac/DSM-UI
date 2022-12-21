import { responsibleService } from "@/services/api/responsible.service";
const actions = {
  async setResponsibles(vuexContext) {
    const res = await responsibleService.getResponsibles();
    // vuexContext.commit("SET_SERVER_LIST", res);
    return res;
  },
  async setResponsibleServers(vuexContext, data) {
    const res = await responsibleService.getResponsibleServers(data);
    vuexContext.commit("SET_RESPONSIBLE_SERVERS", data);
    return res;
  },
  async setResponsibleSites(vuexContext, data) {
    const res = await responsibleService.getResponsibleSites(data);
    vuexContext.commit("SET_RESPONSIBLE_SITES", data);
    return res;
  }, 
}
export default actions;