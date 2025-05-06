import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../app/rootReducer.js';
import { authApi } from '../features/api/authapi.js';
import { walletApi } from '../features/api/wallet.js';

// Setup persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'auth'], // Add 'auth' to whitelist
  blacklist: ['authApi', 'walletApi'], // Exclude API slices from persistence
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const appstore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Ignore Redux persist actions
      },
    }).concat(authApi.middleware, walletApi.middleware),
});

export const persistor = persistStore(appstore);
