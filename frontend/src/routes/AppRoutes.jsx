import { Routes } from "react-router-dom";
import AuthRoutes from "./modules/AuthRoutes";
import UserRoutes from "./modules/UserRoutes";;
import HomePage from "../pages/home/HomePage";
import { Route } from "react-router-dom";
import wallet from "./modules/wallet";
import ROUTES from "./RoutePaths";

const AppRoutes = () => (
  <Routes>
    <Route path={ROUTES.HOME} element={<HomePage />} />
    {AuthRoutes}
    {UserRoutes}
    {wallet}
    <Route path="*" element={"not found"} />
  </Routes>
);

export default AppRoutes;


