import { Route } from "react-router-dom";
import Login from "../../pages/auth/Login";
import ROUTES from "../RoutePaths";

export default (
  <Route path={ROUTES.LOGIN} element={<Login />} />
);
