import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '../../services/api/baseQuery';
import {PROVIDER_API, HTTP_METHOD} from '@/utils/constants/api';
import {setDashboard} from '@/features/authSlice';

export const providerHomeApi = createApi({
  reducerPath: 'providerHomeApi',
  baseQuery: axiosBaseQuery,
  tagTypes: ['providerHomeApi'],
  keepUnusedDataFor: 300, // 5 minutes
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: builder => ({
    getDashboard: builder.query<any, any>({
      query: () => ({
        url: PROVIDER_API.DASHBOARD.DASHBOARD,
        method: HTTP_METHOD.GET,
      }),
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
    }),

    // Notifications API

    getNotifications: builder.query<any, any>({
      query: () => ({
        url: PROVIDER_API.DASHBOARD.NOTIFICATIONS,
        method: HTTP_METHOD.GET,
      }),
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
      query: () => ({
        url: PROVIDER_API.DASHBOARD.REQUESTS,
        method: HTTP_METHOD.GET,
      }),
    }),

    getRequestsDetails: builder.query<any, any>({
      query: query => ({
        url: PROVIDER_API.DASHBOARD.REQUEST_DETAILS,
        method: HTTP_METHOD.GET,
        params: query,
      }),
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
      invalidatesTags: ['providerHomeApi'],
    }),
    // createRequest: builder.mutation<any, any>({
    //   query: credentials => ({
    //     url: PROVIDER_API.DASHBOARD.CREATE_REQUEST,
    //     method: HTTP_METHOD.POST,
    //     data: credentials,
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   }),
    //   invalidatesTags: ['providerHomeApi'],
    // }),

    // // Accept Offer
    // acceptOffer: builder.mutation<any, any>({
    //   query: credentials => ({
    //     url: PROVIDER_API.DASHBOARD.ACCEPT_OFFER,
    //     method: HTTP_METHOD.POST,
    //     data: credentials,
    //   }),
    //   invalidatesTags: ['providerHomeApi'],
    // }),
  }),
});

export const {
  useGetDashboardQuery,
  useGetSubCategoriesQuery,
  useLazyGetSubCategoriesQuery,
  useGetRequestsQuery,
  useGetRequestsDetailsQuery,
  useSendOfferMutation
  // useCreateRequestMutation,
  // useAcceptOfferMutation,
} = providerHomeApi;
