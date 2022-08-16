import store from "../../store";
export const authHeader = () => {
  const user = store.getters["auth/getUserLogin"];

  if (user && user.token) {
    return user.token;
  } else {
    return "";
  }
};