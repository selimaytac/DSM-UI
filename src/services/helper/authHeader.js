import store from "../../store";
export const authHeader = () => {
  const token = store.getters["auth/getToken"];

  if (token) {
    return token;
  } else {
    return "";
  }
};