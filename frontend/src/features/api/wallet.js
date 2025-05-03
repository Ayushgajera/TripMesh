import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const walletApi = createApi({
  reducerPath: 'walletApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1/user', // Your backend API base URL
    credentials: 'include', // Ensures cookies are sent with the request
    prepareHeaders: (headers) => {
      // No need to manually add the token here since the cookie will handle it
      return headers;
    },
    credentials: 'include', // Ensure cookies are sent with the request
  }),
  endpoints: (builder) => ({
    depositToWallet: builder.mutation({
      query: (amount) => ({
        url: '/wallet/deposit',
        method: 'POST',
        body: { amount },
      }),
    }),
    verifyPayment: builder.mutation({
      query: (data) => ({
        url: '/payment/verifypayment',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useDepositToWalletMutation, useVerifyPaymentMutation } = walletApi;
