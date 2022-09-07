import { deploymentAgentService } from "@/services/api/deploymentAgent.service";
const actions = {
  async setAgents(vuexContext, data) {
    const res = await deploymentAgentService.getAgents(data);
    return res;
  },
}
export default actions;