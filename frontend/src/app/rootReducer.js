import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/authslice.js';
import { authApi } from '../features/api/authapi.js';
import { walletApi } from '../features/api/wallet.js';

const rootreducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [walletApi.reducerPath]: walletApi.reducer, 
})
export default rootreducer;