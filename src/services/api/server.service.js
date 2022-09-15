import { $axios } from "@/plugins/axios";
import { authHeader } from "../helper";
const controllerName = "/server/";
export const serverService = {
    getServers,
    getServerSearch,
    getServerDetails,
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
async function getServerSearch(data) {
    const result = await $axios.get(
        controllerName + "search/" + data,
        { headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*', 'Authorization': authHeader() } }
    );
    return result.data;
}
async function getServerDetails(data) {
    const result = await $axios.get(
        controllerName + "details/" + data,
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
async function getServerHeader(data) {
    const result = await $axios.get(
        controllerName + "header/" + data,
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
async function getServerSites(data) {
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
async function getRDPFile(data) {
    const result = await $axios.post(
        controllerName + "connect" ,{
            ...data
        },
        {
            responseType: 'blob',
            headers:
            {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
                'Authorization': authHeader()
            }
        }
    ).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
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

