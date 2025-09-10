import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '../../services/api/baseQuery';
import {PROVIDER_API, HTTP_METHOD} from '@/utils/constants/api';
import {setDashboard, setPackages} from '@/features/authSlice';

export const providerHomeApi = createApi({
  reducerPath: 'providerHomeApi',
  baseQuery: axiosBaseQuery,
  tagTypes: [
    'providerHomeApi',
    'getProviderDashboard',
    'getProviderSubCategories',
    'getProviderNotifications',
    'getProviderRequests',
    'getProviderPackages',
    'getProviderRequestsDetails',
    'getProviderJobs',
    'getProviderJobDetails',
  ],
  // keepUnusedDataFor: 300, // 5 minutes
  // refetchOnFocus: true,
  // refetchOnReconnect: true,
  endpoints: builder => ({
    getDashboard: builder.query<any, any>({
      query: () => ({
        url: PROVIDER_API.DASHBOARD.DASHBOARD,
        method: HTTP_METHOD.GET,
      }),
      providesTags: ['getProviderDashboard'],
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;

          dispatch(setDashboard(data?.data));
        } catch (error) {}
      },
    }),
    getSubCategories: builder.query<any, any>({
      query: query => ({
        url: PROVIDER_API.DASHBOARD.SUB_CATEGORIES,
        method: HTTP_METHOD.GET,
        params: query,
      }),
      providesTags: ['getProviderSubCategories'],
    }),

    // Notifications API
    getNotifications: builder.query<any, any>({
      query: () => ({
        url: PROVIDER_API.DASHBOARD.NOTIFICATIONS,
        method: HTTP_METHOD.GET,
      }),
      providesTags: ['getProviderNotifications'],
    }),

    clearNotifications: builder.mutation<any, any>({
      query: () => ({
        url: PROVIDER_API.DASHBOARD.CLEAR_ALL_NOTIFICATIONS,
        method: HTTP_METHOD.POST,
      }),
      invalidatesTags: ['providerHomeApi'],
    }),

    // Requests API
    getRequests: builder.query<any, any>({
      query: query => ({
        url: PROVIDER_API.DASHBOARD.REQUESTS,
        method: HTTP_METHOD.GET,
        params: query,
      }),
      providesTags: ['getProviderRequests'],
    }),

    getRequestsDetails: builder.query<any, any>({
      query: query => ({
        url: PROVIDER_API.DASHBOARD.REQUEST_DETAILS,
        method: HTTP_METHOD.GET,
        params: query,
      }),
      providesTags: ['getProviderRequestsDetails'],
    }),

    sendOffer: builder.mutation<any, any>({
      query: credentials => ({
        url: PROVIDER_API.DASHBOARD.SEND_OFFER,
        method: HTTP_METHOD.POST,
        data: credentials,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      invalidatesTags: ['getProviderRequests', 'getProviderRequestsDetails'],
    }),
    modifyOffer: builder.mutation<any, any>({
      query: credentials => ({
        url: PROVIDER_API.DASHBOARD.MODIFY_OFFER,
        method: HTTP_METHOD.POST,
        data: credentials,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      invalidatesTags: ['getProviderRequests', 'getProviderRequestsDetails'],
    }),
    // Update Job Status
    updateJobStatus: builder.mutation<any, any>({
      query: credentials => ({
        url: PROVIDER_API.DASHBOARD.UPDATE_JOB_STATUS,
        method: HTTP_METHOD.POST,
        data: credentials,
      }),
      invalidatesTags: [
        'providerHomeApi',
        'getProviderDashboard',
        'getProviderJobs',
        'getProviderJobDetails',
      ],
    }),

    getJobs: builder.query<any, any>({
      query: query => ({
        url: PROVIDER_API.DASHBOARD.JOBS,
        method: HTTP_METHOD.GET,
        params: query,
      }),
      providesTags: ['getProviderJobs'],
    }),

    getJobDetails: builder.query<any, any>({
      query: query => ({
        url: PROVIDER_API.DASHBOARD.JOBS_DETAILS,
        method: HTTP_METHOD.GET,
        params: query,
      }),
      providesTags: ['getProviderJobDetails'],
    }),
    getPackages: builder.query<any, any>({
      query: () => ({
        url: PROVIDER_API.DASHBOARD.PACKAGES,
        method: HTTP_METHOD.GET,
      }),
      providesTags: ['getProviderPackages'],
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          dispatch(setPackages(data?.data?.packages));
        } catch (error) {}
      },
    }),
    buyPackage: builder.mutation<any, any>({
      query: credentials => ({
        url: PROVIDER_API.DASHBOARD.BUY_PACKAGE,
        method: HTTP_METHOD.POST,
        params: credentials,
      }),
      invalidatesTags: [],
    }),
    // Stripe
    stripePayment: builder.mutation<any, any>({
      query: credentials => ({
        url: PROVIDER_API.DASHBOARD.STRIPE_PAYMENT,
        method: HTTP_METHOD.POST,
        data: credentials,
        skipLoader: false,
      }),
      invalidatesTags: [],
    }),
  }),
});

export const {
  useGetDashboardQuery,
  useGetSubCategoriesQuery,
  useLazyGetSubCategoriesQuery,
  useGetRequestsQuery,
  useGetRequestsDetailsQuery,
  useSendOfferMutation,
  // useCreateRequestMutation,
  // useAcceptOfferMutation,
  useGetJobDetailsQuery,
  useGetJobsQuery,
  useBuyPackageMutation,
  useGetPackagesQuery,
  useUpdateJobStatusMutation,
  useModifyOfferMutation,
  useStripePaymentMutation
} = providerHomeApi;
