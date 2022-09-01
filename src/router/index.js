import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "../store";


Vue.use(VueRouter);
const router = new VueRouter({
  mode: "history",
  routes,
});
router.beforeEach((to, from, next) => {
  if(!Object.prototype.hasOwnProperty.call(to.meta, "requiresAuth" ) && to.name !== "signin") {
    to.meta.requiresAuth = true;
  }
  next();
})
router.beforeEach((to, from, next) => {
  const loggedIn = store.getters["auth/getIsLoggedIn"];
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!loggedIn) {
      next({
        path: "/",
        params: { nextUrl: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    checkPageWhenSignIn();
  }

  function checkPageWhenSignIn() {
    if (to.name === "signin") {
      if (loggedIn) {
        next({
          path: "/home",
          params: { nextUrl: to.fullPath },
        });
      } else {
        next();
      }
    } else {
      next();
    }
  }
});
export default router;