import { $axios } from "@/plugins/axios";
import { authHeader } from "../../helper";
const controllerName = "/CustomerTracking/";
export const appdbInventoryService = {
    getAppDbInventories,
    getAppDbInventory,
    createAppDbInventory,
    updateAppDbInventory,
    deleteAppDbInventory
};
async function getAppDbInventories() {
    const result = await $axios.get(
        controllerName + "AppDb/",
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
async function getAppDbInventory(data) {
    const result = await $axios.get(
        controllerName + "AppDb/" + data,
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
async function createAppDbInventory(data) {
    const result = await $axios.post(
        controllerName + "AppDb/",data,
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
async function updateAppDbInventory(data) {
    const result = await $axios.post(
        controllerName + "AppDb/update",data,
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
async function deleteAppDbInventory(data) {
    const result = await $axios.get(
        controllerName + "AppDb/delete/" + data,
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