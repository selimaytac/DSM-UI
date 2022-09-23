import { externalUrlService } from "@/services/api/customerInventory/externalUrl.service";
const actions = {
  async setExternalUrls(vuexContext) {
    const res = await externalUrlService.getExternalUrls();
    return res;
  },
  async setExternalUrl(vuexContext, data) {
    const res = await externalUrlService.getExternalUrls(data);
    return res;
  },
  async setExternalUrls(vuexContext, data) {
    const res = await externalUrlService.getExternalUrls(data);
    return res;
  },
  async setExternalUrls(vuexContext, data) {
    const res = await externalUrlService.getExternalUrls(data);
    return res;
  },
}
export default actions;