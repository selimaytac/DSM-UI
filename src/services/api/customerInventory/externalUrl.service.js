import { $axios } from "@/plugins/axios";
import { authHeader } from "../../helper";
const controllerName = "/CustomerTracking/";
export const externalUrlService = {
    getExternalUrls,
    getExternalUrl,
    createExternalUrl,
    updateExternalUrl,
    deleteExternalUrl,
    getExportList,
    getExportSearchList,
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
async function getExportList() {
    const result = await $axios.get(
        controllerName + "ExternalUrl/export/",
        {
            responseType: 'blob',
            headers:
            {
                "Content-Type": "application/octet-stream",
                'Access-Control-Allow-Origin': '*',
                'Authorization': authHeader()
            }
        }
    ).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement('a');

        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'dsm_export.xlsx');
        document.body.appendChild(fileLink);

        fileLink.click();
    })
}
async function getExportSearchList(data) {
    const result = await $axios.get(
        controllerName + "ExternalUrl/export/" + data,
        {
            responseType: 'blob',
            headers:
            {
                "Content-Type": "application/octet-stream",
                'Access-Control-Allow-Origin': '*',
                'Authorization': authHeader()
            }
        }
    ).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement('a');

        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'dsm_export.xlsx');
        document.body.appendChild(fileLink);

        fileLink.click();
    })
}
