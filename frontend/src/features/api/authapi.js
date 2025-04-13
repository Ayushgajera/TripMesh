import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedIn } from '../authslice';

const user_api = 'http://localhost:5000/api/v1/user/'
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: user_api,
        credentials: 'include',
        prepareHeaders: (headers) => {
            return headers;

          }
    }),
    endpoints: (builder) => ({
        SignupUser: builder.mutation({
            query: (userData) => ({
                url: 'signup',
                method: 'POST',
                body: userData,
            }),
        }),
        loginUser: builder.mutation({
            query: (userData) => ({
                url: 'login',
                method: 'POST',
                body: userData,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(userLoggedIn({user:Date.data.user}));
                } catch (err) {
                    console.log(err)
                }
            }
        }),
    }),
})

export const { useSignupUserMutation, useLoginUserMutation } = authApi