import { $axios } from "@/plugins/axios";
import { authHeader } from "../helper";
const controllerName = "/dashboard/";
export const elasticSearchService = {
    getElastics,
};
async function getElastics() {
    const result = await $axios.get(
        controllerName + "elastic-search-inventory",
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
