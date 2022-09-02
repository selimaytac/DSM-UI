import { $axios } from "@/plugins/axios";
import { authHeader } from "../helper";
const controllerName = "/dashboard/";
export const dashboardService = {
    getServerCount,
    getSiteCount,
    getResponsibilityCount,
    getDbCount,
    getUserCount,
    getCompanyCount,

};
async function getServerCount() {
    const result = await $axios.get(
        controllerName + 'serverCount' ,
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
async function getSiteCount() {
    const result = await $axios.get(
        controllerName + 'siteCount' ,
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
async function getResponsibilityCount() {
    const result = await $axios.get(
        controllerName + 'responsibilityCount' ,
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
async function getDbCount() {
    const result = await $axios.get(
        controllerName + 'dbCount' ,
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
async function getUserCount() {
    const result = await $axios.get(
        controllerName + 'userCount' ,
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
async function getCompanyCount() {
    const result = await $axios.get(
        controllerName + 'companyCount' ,
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


