import { $axios } from "@/plugins/axios";
import { authHeader } from "../helper";
const controllerName = "/report/";
export const monthlyKpiService = {
    getMonthlyKpi,
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

