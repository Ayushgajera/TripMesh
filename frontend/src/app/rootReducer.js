import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/authslice.js';
import { authApi } from '../features/api/authapi.js';
import { walletApi } from '../features/api/wallet.js';
import userReducer from '../features/userslice.js';

const rootreducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    user: userReducer,

    [walletApi.reducerPath]: walletApi.reducer, 
})
export default rootreducer;