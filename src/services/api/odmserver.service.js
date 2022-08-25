import { $axios } from "@/plugins/axios";
import { authHeader } from "../helper";
const controllerName = "/report/";
export const odmserverService = {
    getOdmServers,
    getExportList,
    getExportSearchList,
};
async function getOdmServers(data) {
    const result = await $axios.get(
        controllerName +"odmstatusreport/" + data,
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

