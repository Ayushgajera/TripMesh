import WalletDeposit from "@/components/wallet/WalletDeposit";
import { Route } from "react-router-dom";
import ROUTES from "../RoutePaths";


export default (
    <Route path={ROUTES.WALLET} element={<WalletDeposit />} />
);
