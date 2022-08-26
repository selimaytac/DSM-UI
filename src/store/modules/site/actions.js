import { siteService } from "@/services/api/site.service";
const actions = {
  async setSites(vuexContext, data) {
    const res = await siteService.getSites(data);
    // vuexContext.commit("SET_SERVER_LIST", res);
    return res;
  },
  async setSiteSearch(vuexContext, data) {
    const res = await siteService.getSiteSearch(data);
    // vuexContext.commit("SET_SERVER_LIST", res);
    return res;
  },
  async setSiteDetails(vuexContext, data) {
    const res = await siteService.getSiteDetails(data);
    vuexContext.commit("SET_SITE_DETAILS", data);
    return res;
  },
  async setSiteHeader(vuexContext, data) {
    const res = await siteService.getSiteHeader(data);
    vuexContext.commit("SET_SITE_HEADER", data);
    return res;
  },
  async setSiteBindings(vuexContext, data) {
    const res = await siteService.getSiteBindings(data);
    vuexContext.commit("SET_SITE_BINDINGS", data);
    return res;
  },
  async setSitePackages(vuexContext, data) {
    const res = await siteService.getSitePackages(data);
    vuexContext.commit("SET_SITE_PACKAGES", data);
    return res;
  }, 
  async setSiteEndpoints(vuexContext, data) {
    const res = await siteService.getSiteEndpoints(data);
    vuexContext.commit("SET_SITE_ENDPOINTS", data);
    return res;
  },   
}
export default actions;