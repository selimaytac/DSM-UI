import { $axios } from "@/plugins/axios";
import { authHeader } from "../helper";
const controllerName = "/AzureDevOps/";
export const azureInventoryService = {
    getInventories,
    getSiteBindings,

};
async function getInventories() {
    const result = await $axios.get(
        controllerName +"azure-portal-inventory",
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
async function getSiteBindings() {
    const result = await $axios.get(
        controllerName + "azure-portal-inventory/site-bindings",
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