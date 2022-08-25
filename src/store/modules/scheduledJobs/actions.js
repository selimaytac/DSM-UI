import { scheduledjobsService } from "@/services/api/scheduledjobs.service";
const actions = {
  async setScheduledJobs(vuexContext, data) {
    const res = await scheduledjobsService.getScheduledJobs(data);
    // vuexContext.commit("SET_SERVER_LIST", res);
    return res;
  },
}
export default actions;