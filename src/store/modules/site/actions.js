import { siteService } from "@/services/api/site.service";
const actions = {
  async setSites(vuexContext, data) {
    const res = await siteService.getSites(data);
    // vuexContext.commit("SET_SERVER_LIST", res);
    return res;
  },
  setSite(vuexContext, data) {
    vuexContext.commit("SET_SITE_DETAILS", data);
  },
  setSiteHeader(vuexContext, data) {
    vuexContext.commit("SET_SITE_HEADER", data);
  },
  setSiteBindings(vuexContext, data) {
    vuexContext.commit("SET_SITE_BINDINGS", data);
  },
  setSitePackages(vuexContext, data) {
    vuexContext.commit("SET_SITE_PACKAGES", data);
  }, 
  setSiteEndpoints(vuexContext, data) {
    vuexContext.commit("SET_SITE_ENDPOINTS", data);
  },   
}
export default actions;