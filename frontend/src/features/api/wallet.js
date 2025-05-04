import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const walletApi = createApi({
  reducerPath: 'walletApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1/user', 
    credentials: 'include',
    prepareHeaders: (headers) => {
      
      return headers;
    },
    credentials: 'include', 
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
