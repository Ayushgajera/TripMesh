import { Routes } from "react-router-dom";
import AuthRoutes from "./modules/AuthRoutes";
import UserRoutes from "./modules/UserRoutes";;
import HomePage from "../pages/home/HomePage";
import { Route } from "react-router-dom";
import wallet from "./modules/wallet";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    {AuthRoutes}
    {UserRoutes}
    {wallet}
    <Route path="*" element={"not found"} />
  </Routes>
);

export default AppRoutes;
