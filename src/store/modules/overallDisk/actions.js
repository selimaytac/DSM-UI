import { overallDiskService } from "@/services/api/overalldisk.service";
const actions = {
  async setOverallDisks(vuexContext, data) {
    const res = await overallDiskService.getOverallDisks(data);
    // vuexContext.commit("SET_SERVER_LIST", res);
    return res;
  },
  async setOverallDisksSearch(vuexContext, data) {
    const res = await overallDiskService.getOverallDisksSearch(data);
    // vuexContext.commit("SET_SERVER_LIST", res);
    return res;
  },
}
export default actions;