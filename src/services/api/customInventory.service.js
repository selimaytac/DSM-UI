import { $axios } from "@/plugins/axios";
import { authHeader } from "../helper";
export const customInventory = {
    getFrameworkVersions,
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
