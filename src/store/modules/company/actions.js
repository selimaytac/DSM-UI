import { companyService } from "@/services/api/company.service";
const actions = {
  async setCompanies(vuexContext, data) {
    const res = await companyService.getCompanies(data);
    // vuexContext.commit("SET_SERVER_LIST", res);
    return res;
  },
  async setCompanyHeader(vuexContext, data) {
    const res = await companyService.getCompanyHeader(data);
    vuexContext.commit("SET_COMPANY_HEADER", data);
    return res;
  },
  async setCompanyServers(vuexContext, data) {
    const res = await companyService.getCompanyServers(data);
    vuexContext.commit("SET_COMPANY_SERVERS", data);
    return res;
  },
  async setCompanySites(vuexContext, data) {
    const res = await companyService.getCompanySites(data);
    vuexContext.commit("SET_COMPANY_SITES", data);
    return res;
  }, 
}
export default actions;