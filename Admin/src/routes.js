import {
  ADMIN_ROUTE,
  PRODUCT_ROUTE,
  LOGIN_ROUTE,
  ROUTE_HOME,
} from "./utils/consts";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import ProductPage from "./pages/ProductPage";
import Shop from "./pages/Shop";

export const authRoutes = [
  {
    path: ROUTE_HOME,
    Component: Shop,
  },
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: PRODUCT_ROUTE + "/:id",
    Component: ProductPage,
  },
];

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
];
