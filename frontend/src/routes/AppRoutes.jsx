import { Routes } from "react-router-dom";
import AuthRoutes from "./modules/AuthRoutes";
import UserRoutes from "./modules/UserRoutes";;
import HomePage from "../pages/home/HomePage";
import { Route } from "react-router-dom";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    {AuthRoutes}
    {UserRoutes}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
