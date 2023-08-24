import { $axios } from "@/plugins/axios";
import { authHeader } from "../helper";
export const customInventory = {
    getFrameworkVersions,
    getNetworkSecurityInventory,
    getNetworkInventory
};
async function getFrameworkVersions() {
    const result = await $axios.get(
        "FrameworkVersionInventory",
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

async function getNetworkSecurityInventory() {
    const result = await $axios.get(
        "NetworkSecurityInventory",
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

async function getNetworkInventory() {
    const result = await $axios.get(
        "NetworkInventory",
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
