import { $axios } from "@/plugins/axios";
import { authHeader } from "../helper";
const controllerName = "/getSentryByMonthRange/";
export const monthlySentryService = {
    getSentries,
};
async function getSentries() {
    const result = await $axios.get(
        controllerName + "?monthRange" + 1,
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