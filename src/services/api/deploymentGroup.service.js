import { $axios } from "@/plugins/axios";
import { authHeader } from "../helper";
const controllerName = "/AzureDevOps/";
export const deploymentGroupService = {
    getGroups,
};
async function getGroups() {
    const result = await $axios.get(
        controllerName + "deployment-groups",
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


