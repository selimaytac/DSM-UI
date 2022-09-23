import { appdbInventoryService } from "@/services/api/customerInventory/appdbInventory.service";
const actions = {
  async setAppDbInventories(vuexContext) {
    const res = await appdbInventoryService.getAppDbInventories();
    return res;
  },
  async setAppDbInventory(vuexContext, data) {
    const res = await appdbInventoryService.getAppDbInventories(data);
    return res;
  },
  async setAppDbInventories(vuexContext, data) {
    const res = await appdbInventoryService.getAppDbInventories(data);
    return res;
  },
  async setAppDbInventories(vuexContext, data) {
    const res = await appdbInventoryService.getAppDbInventories(data);
    return res;
  },
}
export default actions;