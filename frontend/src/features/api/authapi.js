import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedIn } from '../authslice';
import { data } from 'react-router-dom';

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
            onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
                try {
                  const { data } = await queryFulfilled;
              
                  dispatch(
                    userLoggedIn({
                      User: data.user,
                      token: data.token,
                    })
                  );
              
                  console.log("✅ User logged in successfully:", data.user);
                } catch (error) {
                  console.error(" Login failed:", error);
                }
              }
              
        }),
        forgotPasswordUser: builder.mutation({
            query: (userData) => ({
                url: 'forgotPassword',
                method: 'POST',
                body: userData,
            }),
            onQueryStarted: async (arg, { queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    console.log("✅ Password reset link sent successfully:", data);
                } catch (error) {
                    console.error("Password reset failed:", error);
                }
            }
        }),
        resetPasswordUser: builder.mutation({
            query: ({password,id,token}) => ({
                url: `reset-password/${id}/${token}`,
                method: 'POST',
                body: {password},
            }),
            onQueryStarted: async (arg, { queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    console.log("✅ Password reset successfully:", data);
                } catch (error) {
                    console.error("Password reset failed:", error);
                }
            }
        }),
    }),
})

export const { useSignupUserMutation, useLoginUserMutation ,useForgotPasswordUserMutation,useResetPasswordUserMutation } = authApi