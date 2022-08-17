//import { responseHandler } from "./helper";

import { $axios } from "../plugins/axios";
export const authService = {
  login,
};
async function login(payload) {
  const result = await $axios.post(
    "/Users/authenticate",
    { ...payload },
    {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*'
    }
  );
  return result.data;
}
