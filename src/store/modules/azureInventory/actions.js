import { azureInventoryService } from "@/services/api/azureInventory.service";
const actions = {
  async setInventories(vuexContext, data) {
    const res = await azureInventoryService.getInventories(data);
    // vuexContext.commit("SET_SERVER_LIST", res);
    return res;
  },
  async setSiteBindings(vuexContext) {
    const res = await azureInventoryService.getSiteBindings();
    vuexContext.commit("SET_INVENTORY_BINDINGS", res.data);
    return res;
  },
}
export default actions;