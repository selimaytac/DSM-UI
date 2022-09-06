import { elasticSearchService } from "@/services/api/elasticSearch.service";
const actions = {
  async setElastic(vuexContext, data) {
    const res = await elasticSearchService.getElastic(data);
    // vuexContext.commit("SET_SERVER_LIST", res);
    return res;
  },
}
export default actions;