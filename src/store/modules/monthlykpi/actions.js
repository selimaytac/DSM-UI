import { monthlyKpiService } from "@/services/api/monthlyKpi.service";
const actions = {
  async setMonthlyKpi(vuexContext, data) {
    const res = await monthlyKpiService.getMonthlyKpi(data);

    return res;
  },
}
export default actions;