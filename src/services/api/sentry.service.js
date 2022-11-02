import { $axios } from "@/plugins/axios";
import { authHeader } from "../helper";
const controllerName = "/getTodaySentry/";
export const todaySentryService = {
    getSentries,
};
async function getSentries() {
    const result = await $axios.get(
        controllerName,
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