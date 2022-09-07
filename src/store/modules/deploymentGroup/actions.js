import { deploymentGroupService } from "@/services/api/deploymentGroup.service";
const actions = {
  async setGroups(vuexContext, data) {
    const res = await deploymentGroupService.getGroups(data);
    return res;
  },
}
export default actions;