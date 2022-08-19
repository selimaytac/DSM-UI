import { $axios } from "../plugins/axios";
import { authHeader } from "../helper";
const controllerName = "/company/";
export const companyService = {
    getCompanies,
    getCompanyHeader,
    getCompanyServers,
    getCompanySites,
    getRDPFile,
    getExportList,
    getExportSearchList,
};
async function getCompanies(data) {
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
async function getCompanyHeader(data) {
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
async function getCompanyServers(data) {
    const result = await $axios.get(
        controllerName + "servers/" + data,
        {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            Bearer: authHeader()
        }
    );
    return result.data;
}
async function getCompanySites(data) {
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

