import { $axios } from "@/plugins/axios";
import { authHeader } from "../helper";
const controllerName = "/site/";
export const siteService = {
    getSites,
    getSite,
    getSiteHeader,
    getSiteBindings,
    getSitePackages,
    getSiteEndpoints,
    getExportList,
    getExportSearchList,
};
async function getSites(data) {
    const result = await $axios.get(
        controllerName + data,
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
async function getSite(data) {
    const result = await $axios.get(
        controllerName + "details/" + data,
        {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            Bearer: authHeader()
        }
    );
    return result.data;
}
async function getSiteHeader(data) {
    const result = await $axios.get(
        controllerName + "header/" + data,
        {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            Bearer: authHeader()
        }
    );
    return result.data;
}
async function getSiteBindings(data) {
    const result = await $axios.get(
        controllerName + "bindings/" + data,
        {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            Bearer: authHeader()
        }
    );
    return result.data;
}
async function getSitePackages(data) {
    const result = await $axios.get(
        controllerName + "packages/" + data,
        {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            Bearer: authHeader()
        }
    );
    return result.data;
}
async function getSiteEndpoints(data) {
    const result = await $axios.get(
        controllerName + "endpoints/" + data,
        {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            Bearer: authHeader()
        }
    );
    return result.data;
}
async function getExportList(data) {
    const result = await $axios.get(
        controllerName + "export/" + data,
        {
            "Content-Type": "application/octet-stream",
            'Access-Control-Allow-Origin': '*',
            Bearer: authHeader()
        }
    ).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response]));
        var fileLink = document.createElement('a');

        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'dsm_export.xlsx');
        document.body.appendChild(fileLink);

        fileLink.click();
    })
}
async function getExportSearchList(data) {
    const result = await $axios.get(
        controllerName + "export/" + data,
        {
            "Content-Type": "application/octet-stream",
            'Access-Control-Allow-Origin': '*',
            Bearer: authHeader()
        }
    ).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response]));
        var fileLink = document.createElement('a');

        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'dsm_export.xlsx');
        document.body.appendChild(fileLink);

        fileLink.click();
    })
}
