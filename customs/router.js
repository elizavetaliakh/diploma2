import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/customs",
    name: "customs",
    component: () => import("./components/UsersList")
  },
  {
    path: "/customs/:id",
    name: "customs-details",
    component: () => import("./components/User")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddUser")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;