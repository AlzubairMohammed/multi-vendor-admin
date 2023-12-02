import { createRouter, createWebHashHistory } from "vue-router";
import CategoriesPage from "../views/CategoriesPage.vue";
import ProductsPage from "../views/ProductsPage.vue";
import UsersPage from "../views/UsersPage.vue";
import OrdersPage from "../views/OrdersPage.vue";
import OrderDetailsPage from "../views/OrderDetailsPage.vue";
import NewsPage from "../views/NewsPage.vue";
import RolesPage from "../views/RolesPage.vue";
import RolesPermessionsPage from "../views/RolesPermessionsPage.vue";
const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  // {
  //   path: "/home",
  //   name: "home",
  //   component: HomeView,
  // },

  {
    path: "/categories_page",
    name: "CategoriesPage",
    component: CategoriesPage,
  },
  {
    path: "/products_page",
    name: "ProductsPage",
    component: ProductsPage,
  },
  {
    path: "/news_page",
    name: "NewsPage",
    component: NewsPage,
  },
  {
    path: "/users_page",
    name: "UsersPage",
    component: UsersPage,
  },
  {
    path: "/roles_page",
    name: "RolesPage",
    component: RolesPage,
  },
  {
    path: "/roles_page/:id",
    name: "RolesPermessionsPage",
    component: RolesPermessionsPage,
  },
  {
    path: "/orders_page",
    name: "OrdersPage",
    component: OrdersPage,
  },
  {
    path: "/orders_page/:id",
    name: "OrderDetailsPage",
    component: OrderDetailsPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
