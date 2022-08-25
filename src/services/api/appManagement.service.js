import { $axios } from "@/plugins/axios";
import { authHeader } from "../helper";
const controllerName = "/dashboard/";
export const appManagementService = {
    getApps,
};
async function getApps() {
    const result = await $axios.get(
        controllerName + "appmanagement",
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
