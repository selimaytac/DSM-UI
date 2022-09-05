import { $axios } from "@/plugins/axios";
import { authHeader } from "../helper";
const controllerName = "/report/";
export const scheduledjobsService = {
    getScheduledJobs,
    getJobsSearch,
    getExportList,
    getExportSearchList,
};
async function getScheduledJobs(data) {
    const result = await $axios.get(
        controllerName +"scheduledjobstatus/" + data,
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
async function getJobsSearch(data) {
    const result = await $axios.get(
        controllerName + "scheduledjobstatus/search/" + data,
        { headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*', 'Authorization': authHeader() } }
    );
    return result.data;
}

async function getExportList() {
    const result = await $axios.get(
        controllerName + "scheduledjobstatus/export/",
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
        controllerName + "scheduledjobstatus/export/" + data,
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

