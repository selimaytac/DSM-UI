import axios from "axios";
import store from "@/store";
const settings = require("../settings.json");
const instance = axios.create({
  baseURL: settings.apiURL,
});

export default {
  install: function (Vue) {
    Object.defineProperty(Vue.prototype, "$axios", { value: instance });
  },
}
instance.interceptors.response.use(

  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 403){
      return Promise.reject(error.response.status);
    }
    if (error.response.status === 400){ 
      return Promise.reject({ errorCode: 400,  message: error.response.data.message });
    }
    if (error.response.status === 401) {
      console.log("401");
      store.dispatch("auth/setLogout")
      window.location.href = "/";
      return Promise.reject({ errorCode: 401, message: error.response.data.message });
    } 
    else{
      return Promise.reject(error);
    }
  }
);
export const $axios = instance;