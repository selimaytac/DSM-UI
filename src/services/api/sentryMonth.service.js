import { $axios } from "@/plugins/axios";
import { authHeader } from "../helper";
const controllerName = "/getSentryByMonthRange";
export const monthlySentryService = {
    getSentries,
};
async function getSentries(date) {
    const result = await $axios.get(
        controllerName + "?monthRange=" + date,
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