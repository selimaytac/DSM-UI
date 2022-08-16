import { authService } from "@/services/auth.service";
const actions = {
  async setLogin(vuexContext, data) {
    const res = await authService.login(data);
    vuexContext.commit("TOKEN", res.token);
    return res;
  },
  async setLogout(vuexContext) {
    const res = await authService.logOut();
    return res;
  },
};
export default actions;