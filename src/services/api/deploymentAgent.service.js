import { $axios } from "@/plugins/axios";
import { authHeader } from "../helper";
const controllerName = "/AzureDevOps/";
export const deploymentAgentService = {
    getAgents,
};
async function getAgents() {
    const result = await $axios.get(
        controllerName + "deployment-agents",
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


