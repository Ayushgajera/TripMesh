import { Route } from "react-router-dom";
import Profile from "../../pages/user/UserProfilepage";
import ROUTES from "../RoutePaths";


export default (
  <Route path={ROUTES.PROFILE} element={
    <Profile />
  } />
);
