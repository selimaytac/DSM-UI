import { $axios } from "@/plugins/axios";
import { authHeader } from "../helper";
const controllerName = "/getSentries/";
export const monthlySentryService = {
    getSentries,
};
async function getSentries(data) {
    const result = await $axios.get(
        controllerName + data,
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