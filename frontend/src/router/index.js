import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/report",
    name: "NewReport",
    component: () => import("@/views/NewReport.vue"),
    meta: {
      layout: "auth"
    }
  },
  {
    path: "/my-reports",
    name: "MyReports",
    component: () => import("@/views/MyReports.vue"),
    meta: {
      layout: "auth"
    }
  },
  {
    path: "/check",
    name: "Check",
    component: () => import("@/views/Check.vue"),
    meta: {
      layout: "auth"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
