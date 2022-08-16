import axios from "axios";
const settings = require("../settings.json");
const instance = axios.create({
  baseURL: settings.apiURL,
});

export default {
  install: function (Vue) {
    Object.defineProperty(Vue.prototype, "$axios", { value: instance });
  },
}

export const $axios = instance;