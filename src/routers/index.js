import Vue from "vue";
import Router from "vue-router";
import movieRouter from "./movie";
import cinemaRouter from "./cinema";
import mineRouter from "./mine";
import adminRouter from "./admin";
//import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    movieRouter,
    cinemaRouter,
    mineRouter,
    adminRouter,
    {
      path: "/*",
      redirect: "/movie"
    }
  ]
});
