import { $axios } from "@/plugins/axios";
import { authHeader } from "../helper";
const controllerName = "/report/";
export const monthlyKpiService = {
    getMonthlyKpi,
};
async function getMonthlyKpi() {
    const result = await $axios.get(
        controllerName +"kpistatus/",
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

