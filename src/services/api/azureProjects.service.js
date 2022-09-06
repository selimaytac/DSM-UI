import { $axios } from "@/plugins/axios";
import { authHeader } from "../helper";
const controllerName = "/AzureDevOps/";
export const azureProjectsService = {
    getProjects,
};
async function getProjects() {
    const result = await $axios.get(
        controllerName + "projects",
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


