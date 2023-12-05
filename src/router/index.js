import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: () => import("../views/LoginPage.vue"),
  },
  // {
  //   path: "/home",
  //   name: "home",
  //   component: HomeView,
  // },

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
  {
    path: "/news_page",
    name: "NewsPage",
    component: () => import("../views/NewsPage.vue"),
  },
  {
    path: "/users_page",
    name: "UsersPage",
    component: () => import("../views/UsersPage.vue"),
  },
  {
    path: "/roles_page",
    name: "RolesPage",
    component: () => import("../views/RolesPage.vue"),
  },
  {
    path: "/roles_page/:id",
    name: "RolesPermessionsPage",
    component: () => import("../views/RolesPermessionsPage.vue"),
  },
  {
    path: "/orders_page",
    name: "OrdersPage",
    component: () => import("../views/OrdersPage.vue"),
  },
  {
    path: "/orders_page/:id",
    name: "OrderDetailsPage",
    component: () => import("../views/OrderDetailsPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _, next) => {
  if (to?.path != "/login" && !localStorage["hala_token"]) next("/login");
  else if (
    to?.path == "/login" &&
    localStorage["hala_token"] &&
    localStorage["hala_user"]
  ) {
    if (
      JSON.parse(localStorage["hala_user"])?.roles?.includes(
        "warehouse_manager"
      )
    )
      next("/orders_page");
    else next("/categories_page");
  } else next();
});

export default router;
