import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "MineSweeper",
    component: () =>
      import(/* webpackChunkName: "MineSweeper" */ "../views/MineSweeper.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
