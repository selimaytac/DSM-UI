import { authService } from "@/services/auth.service";
const actions = {
  async setLogin(vuexContext, data) {
    const res = await authService.login(data);
    console.log(res);
    vuexContext.commit("credentials", res);
    return res;
  },
  setLogout(vuexContext) {
    vuexContext.commit("logOut");
  },
  setStateDomain(vuexContext, data) {
    vuexContext.commit("setDomain", data);
  }
};
export default actions;