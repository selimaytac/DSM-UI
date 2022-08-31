import { monthlyKpiService } from "@/services/api/monthlyKpi.service";
const actions = {
  async setMonthlyKpi(vuexContext, data) {
    const res = await monthlyKpiService.getMonthlyKpi(data);

    return res;
  },
  async setMonthlyKpiWithTerm(vuexContext, ...data) {
    // const res = await monthlyKpiService.getMonthlyKpiWithTerm(data,page);
    console.log(data.param1);
    console.log(data.param2);

    // return res;
  }
}
export default actions;