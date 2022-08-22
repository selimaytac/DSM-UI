import { companyService } from "@/services/api/company.service";
const actions = {
  async setCompanies(vuexContext, data) {
    const res = await companyService.getCompanies(data);
    // vuexContext.commit("SET_SERVER_LIST", res);
    return res;
  },
  setCompanyHeader(vuexContext, data) {
    vuexContext.commit("SET_COMPANY_HEADER", data);
  },
  setCompanyServers(vuexContext, data) {
    vuexContext.commit("SET_COMPANY_SERVERS", data);
  },
  setCompanySites(vuexContext, data) {
    vuexContext.commit("SET_COMPANY_SITES", data);
  }, 
}
export default actions;