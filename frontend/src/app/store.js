import { authApi } from '../features/api/authapi.js';
import { configureStore } from '@reduxjs/toolkit'
import rootreducer from "../app/rootReducer.js";
import { walletApi } from '../features/api/wallet.js';
export const appstore = configureStore({
  reducer:rootreducer,
  middleware:(getDefaultMiddleware) =>getDefaultMiddleware().concat(authApi.middleware, walletApi.middleware),
});