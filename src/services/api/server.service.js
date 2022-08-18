import { $axios } from "../plugins/axios";
import { authHeader } from "../helper";
const controllerName = "/server/";
export const serverService = {
    getServers,
    getServer,
    getServerHeader,
    getServerSites,
    getExportList,
    getRDPFile,
    getExportSearchList,
};
async function getServers(data) {
    const result = await $axios.get(
        controllerName + data,
        {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            Bearer: authHeader()
        }
    );
    return result.data;
}
async function getServer(data) {
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
async function getServerHeader(data) {
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
async function getServerSites(data) {
    const result = await $axios.get(
        controllerName + "sites/" + data,
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
async function getRDPFile(data) {
    const result = await $axios.post(
        controllerName + "content/" + data,
        {
            "Content-Type": "application/json-patch+json",
            'Access-Control-Allow-Origin': '*',
            Bearer: authHeader()
        }
    ).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response]));
        var fileLink = document.createElement('a');

        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'connection.rdp');
        document.body.appendChild(fileLink);

        fileLink.click();
    });
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

