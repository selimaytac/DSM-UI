import { internalUrlService } from "@/services/api/customerInventory/internalUrl.service";
const actions = {
  async setInternalUrls(vuexContext) {
    const res = await internalUrlService.getInternalUrls();
    return res;
  },
  async setInternalUrl(vuexContext, data) {
    const res = await internalUrlService.getInternalUrls(data);
    return res;
  },
  async setInternalUrls(vuexContext, data) {
    const res = await internalUrlService.getInternalUrls(data);
    return res;
  },
  async setInternalUrls(vuexContext, data) {
    const res = await internalUrlService.getInternalUrls(data);
    return res;
  },
}
export default actions;