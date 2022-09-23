import { $axios } from "@/plugins/axios";
import { authHeader } from "../../helper";
const controllerName = "/CustomerTracking/";
export const externalUrlService = {
    getExternalUrls,
    getExternalUrl,
    createExternalUrl,
    updateExternalUrl,
    deleteExternalUrl
};
async function getExternalUrls() {
    const result = await $axios.get(
        controllerName + "ExternalUrl/",
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
async function getExternalUrl(data) {
    const result = await $axios.get(
        controllerName + "ExternalUrl/" + data,
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
async function createExternalUrl(data) {
    const result = await $axios.post(
        controllerName + "ExternalUrl/",data,
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
async function updateExternalUrl(data) {
    const result = await $axios.post(
        controllerName + "ExternalUrl/update/",data,
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
async function deleteExternalUrl(data) {
    const result = await $axios.get(
        controllerName + "ExternalUrl/delete/" + data,
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
