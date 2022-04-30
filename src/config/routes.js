import Login from "../pages/Auth/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";

export const ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/"
}

export const publicRoutes = [
  {
    path: ROUTES.LOGIN,
    component: Login,
  },
]

export const privateRoutes = [
  {
    path: ROUTES.DASHBOARD,
    component: Dashboard
  }
]