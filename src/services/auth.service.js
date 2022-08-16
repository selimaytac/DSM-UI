//import { responseHandler } from "./helper";

import { $axios } from "../plugins/axios";
export const authService = {
  login,
  logOut
};
async function login(payload) {
  const result = await $axios.post(
    "/user/authenticate",
    { ...payload },
    {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*'
    }
  );
  return result.data;
}
async function logOut() {
  //Cookiden token silinecek ve vuexten state false olacak.
}