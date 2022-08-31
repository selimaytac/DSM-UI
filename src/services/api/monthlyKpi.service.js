import { $axios } from "@/plugins/axios";
import { authHeader } from "../helper";
const controllerName = "/report/";
export const monthlyKpiService = {
    getMonthlyKpi,
    getMonthlyKpiWithTerm
};
async function getMonthlyKpi(data) {
    const result = await $axios.get(
        controllerName +"kpistatus/" + data,
        {
            headers:
            {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
                'Authorization': authHeader()
            }
        }
    );
    return result.data;
}
async function getMonthlyKpiWithTerm(data,page) {
    const result = await $axios.get(
        controllerName +"kpistatus/" + data + "/" + page,
        {
            headers:
            {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
                'Authorization': authHeader()
            }
        }
    );
    return result.data;
}

