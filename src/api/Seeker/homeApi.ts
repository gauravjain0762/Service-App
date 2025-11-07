import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '../../services/api/baseQuery';
import {SEEKER_API, HTTP_METHOD} from '@/utils/constants/api';
import {setAppData, setDashboard} from '@/features/authSlice';

export const homeApi = createApi({
  reducerPath: 'homeApi',
  baseQuery: axiosBaseQuery,
  tagTypes: [
    'homeApi',
    'GetDashboard',
    'getRequests',
    'getJobDetails',
    'getRequestsDetails',
    'getOffersDetails',
    'getJobs',
    'getUserLoyalty',
    'getSubCategories',
    'getNotifications',
    'GetAppData',
    'getCategories'
  ],
  keepUnusedDataFor: 300, // 5 minutes
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: builder => ({
    getDashboard: builder.query<any, any>({
      query: () => ({
        url: SEEKER_API.DASHBOARD.DASHBOARD,
        method: HTTP_METHOD.GET,
      }),
      providesTags: ['GetDashboard'],
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          console.log('data', data);

          dispatch(setDashboard(data?.data));
        } catch (error) {}
      },
    }),
    getSubCategories: builder.query<any, any>({
      query: query => ({
        url: SEEKER_API.DASHBOARD.SUB_CATEGORIES,
        method: HTTP_METHOD.GET,
        params: query,
      }),
      providesTags: ['getSubCategories'],
    }),
    getCategories: builder.query<any, any>({
      query: query => ({
        url: SEEKER_API.DASHBOARD.CATEGORIES,
        method: HTTP_METHOD.GET,
        params: query,
      }),
      providesTags: ['getCategories'],
    }),

    // Notifications API

    getNotifications: builder.query<any, any>({
      query: () => ({
        url: SEEKER_API.DASHBOARD.NOTIFICATIONS,
        method: HTTP_METHOD.GET,
      }),
      providesTags: ['getNotifications'],
    }),

    clearNotifications: builder.mutation<any, any>({
      query: () => ({
        url: SEEKER_API.DASHBOARD.CLEAR_ALL_NOTIFICATIONS,
        method: HTTP_METHOD.POST,
      }),
      invalidatesTags: ['homeApi'],
    }),

    // Requests API
    getRequests: builder.query<any, any>({
      query: () => ({
        url: SEEKER_API.DASHBOARD.REQUESTS,
        method: HTTP_METHOD.GET,
      }),
      providesTags: ['getRequests'],
    }),

    getRequestsDetails: builder.query<any, any>({
      query: query => ({
        url: SEEKER_API.DASHBOARD.REQUEST_DETAILS,
        method: HTTP_METHOD.GET,
        params: query,
      }),
      providesTags: ['getRequestsDetails'],
    }),
    getOffersDetails: builder.query<any, any>({
      query: query => ({
        url: SEEKER_API.DASHBOARD.OFFER_DETAILS,
        method: HTTP_METHOD.GET,
        params: query,
      }),
      providesTags: ['getOffersDetails'],
    }),

    createRequest: builder.mutation<any, any>({
      query: credentials => ({
        url: SEEKER_API.DASHBOARD.CREATE_REQUEST,
        method: HTTP_METHOD.POST,
        data: credentials,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Content-Type': 'multipart/form-data',
        },
      }),
      invalidatesTags: ['homeApi'],
    }),

    requestChange: builder.mutation<any, any>({
      query: credentials => ({
        url: SEEKER_API.DASHBOARD.REQUEST_CHANGE,
        method: HTTP_METHOD.POST,
        data: credentials,
      }),
      invalidatesTags: ['homeApi', 'getRequestsDetails'],
    }),

    // Accept Offer
    acceptOffer: builder.mutation<any, any>({
      query: credentials => ({
        url: SEEKER_API.DASHBOARD.ACCEPT_OFFER,
        method: HTTP_METHOD.POST,
        data: credentials,
      }),
      invalidatesTags: ['homeApi', 'getRequestsDetails'],
    }),

    getJobs: builder.query<any, any>({
      query: query => ({
        url: SEEKER_API.DASHBOARD.JOBS,
        method: HTTP_METHOD.GET,
        params: query,
      }),
      providesTags: ['getJobs'],
    }),
    getUserLoyalty: builder.query<any, any>({
      query: query => ({
        url: SEEKER_API.DASHBOARD.LOYALTY,
        method: HTTP_METHOD.GET,
        params: query,
      }),
      providesTags: ['getUserLoyalty'],
    }),

    getJobDetails: builder.query<any, any>({
      query: query => ({
        url: SEEKER_API.DASHBOARD.JOBS_DETAILS,
        method: HTTP_METHOD.GET,
        params: query,
      }),
      providesTags: ['getJobDetails'],
    }),
    // Stripe
    stripePayment: builder.mutation<any, any>({
      query: credentials => ({
        url: SEEKER_API.DASHBOARD.STRIPE_PAYMENT,
        method: HTTP_METHOD.POST,
        data: credentials,
        skipLoader: false,
      }),
      invalidatesTags: [],
    }),

    getAppData: builder.query<any, any>({
      query: () => ({
        url: SEEKER_API.DASHBOARD.GET_APP_DATA,
        method: HTTP_METHOD.GET,
        skipLoader: false,
      }),
      providesTags: ['GetAppData'],
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          console.log(data, 'datadatadatadatadata');
          if (data?.status) {
            dispatch(setAppData(data.data));
          }
        } catch (error) {
          console.log('verify OTP Error', error);
        }
      },
    }),
    createPaymentRequest: builder.mutation<any, any>({
      query: credentials => ({
        url: SEEKER_API.DASHBOARD.CREATE_PAYMENT_REQUEST,
        method: HTTP_METHOD.POST,
        data: credentials,
      }),
      invalidatesTags: ['homeApi'],
    }),
  }),
});

export const {
  useGetDashboardQuery,
  useGetSubCategoriesQuery,
  useLazyGetSubCategoriesQuery,
  useGetRequestsQuery,
  useGetRequestsDetailsQuery,
  useCreateRequestMutation,
  useAcceptOfferMutation,
  useGetJobDetailsQuery,
  useGetJobsQuery,
  useRequestChangeMutation,
  useGetUserLoyaltyQuery,
  useStripePaymentMutation,
  useGetOffersDetailsQuery,
  useGetNotificationsQuery,
  useGetAppDataQuery,
  useGetCategoriesQuery,
  useCreatePaymentRequestMutation
} = homeApi;
