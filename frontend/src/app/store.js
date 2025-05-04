import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import rootReducer from '../app/rootReducer.js';
import { authApi } from '../features/api/authapi.js';
import { walletApi } from '../features/api/wallet.js';

// Setup persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // only persist user slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const appstore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }).concat(authApi.middleware, walletApi.middleware),
});

export const persistor = persistStore(appstore);
