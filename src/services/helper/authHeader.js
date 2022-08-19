import store from "../../store";
export const authHeader = () => {
  const token = store.getters["auth/getToken"];

  if (token) {
    return 'Bearer ' + token;
  } else {
    return "";
  }
};