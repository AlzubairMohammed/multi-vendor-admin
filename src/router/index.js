import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: () => import("../views/LoginPage.vue"),
  },

  {
    path: "/categories_page",
    name: "CategoriesPage",
    component: () => import("../views/CategoriesPage.vue"),
  },
  {
    path: "/products_page",
    name: "ProductsPage",
    component: () => import("../views/ProductsPage.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
