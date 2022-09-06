import { azureProjectsService } from "@/services/api/azureProjects.service";
const actions = {
  async setProjects(vuexContext, data) {
    const res = await azureProjectsService.getProjects(data);
    return res;
  },
}
export default actions;