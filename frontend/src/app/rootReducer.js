import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/authslice.js';
import { authApi } from '../features/api/authapi.js';

const rootreducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
})
export default rootreducer;