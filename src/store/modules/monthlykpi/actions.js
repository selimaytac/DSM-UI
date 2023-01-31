import { monthlyKpiService } from "@/services/api/monthlyKpi.service";
const actions = {
  async setMonthlyKpi() {
    const res = await monthlyKpiService.getMonthlyKpi();

    return res;
  },
}
export default actions;