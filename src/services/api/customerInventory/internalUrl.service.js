import { $axios } from "@/plugins/axios";
import { authHeader } from "../../helper";
const controllerName = "/CustomerTracking/";
export const internalUrlService = {
    getInternalUrls,
    getInternalUrl,
    createInternalUrl,
    updateInternalUrl,
    deleteInternalUrl
};
async function getInternalUrls() {
    const result = await $axios.get(
        controllerName + "InternalUrl/",
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
async function getInternalUrl(data) {
    const result = await $axios.get(
        controllerName + "InternalUrl/" + data,
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
async function createInternalUrl(data) {
    const result = await $axios.post(
        controllerName + "InternalUrl/",data,
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
async function updateInternalUrl(data) {
    const result = await $axios.post(
        controllerName + "InternalUrl/update",data,
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
async function deleteInternalUrl(data) {
    const result = await $axios.get(
        controllerName + "InternalUrl/delete/" + data,
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