import { $axios } from "@/plugins/axios";
import { authHeader } from "../helper";
const controllerName = "/responsible/";
export const responsibleService = {
    getResponsibles,
    getResponsibleServers,
    getResponsibleSites,
    getExportList,
    getExportSearchList,
};
async function getResponsibles() {
    const result = await $axios.get(
        controllerName + 'responsibles',
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
async function getResponsibleServers(data) {
    const result = await $axios.get(
        controllerName + "servers/" + data,
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
async function getResponsibleSites(data) {
    const result = await $axios.get(
        controllerName + "sites/" + data,
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
        controllerName + "export/",
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
        controllerName + "export/" + data,
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

