import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '../../services/api/baseQuery';
import {SEEKER_API, HTTP_METHOD} from '@/utils/constants/api';
import {setDashboard} from '@/features/authSlice';

export const homeApi = createApi({
  reducerPath: 'homeApi',
  baseQuery: axiosBaseQuery,
  tagTypes: ['homeApi'],
  keepUnusedDataFor: 300, // 5 minutes
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: builder => ({
    getDashboard: builder.query<any, any>({
      query: () => ({
        url: SEEKER_API.DASHBOARD.DASHBOARD,
        method: HTTP_METHOD.GET,
      }),
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
    }),

    // Notifications API

    getNotifications: builder.query<any, any>({
      query: () => ({
        url: SEEKER_API.DASHBOARD.NOTIFICATIONS,
        method: HTTP_METHOD.GET,
      }),
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
    }),

    getRequestsDetails: builder.query<any, any>({
      query: query => ({
        url: SEEKER_API.DASHBOARD.REQUEST_DETAILS,
        method: HTTP_METHOD.GET,
        params: query,
      }),
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
      invalidatesTags: ['homeApi'],
    }),

    // Accept Offer
    acceptOffer: builder.mutation<any, any>({
      query: credentials => ({
        url: SEEKER_API.DASHBOARD.ACCEPT_OFFER,
        method: HTTP_METHOD.POST,
        data: credentials,
      }),
      invalidatesTags: ['homeApi'],
    }),

    getJobs: builder.query<any, any>({
      query: query => ({
        url: SEEKER_API.DASHBOARD.JOBS,
        method: HTTP_METHOD.GET,
        params: query,
      }),
    }),

    getJobDetails: builder.query<any, any>({
      query: query => ({
        url: SEEKER_API.DASHBOARD.JOBS_DETAILS,
        method: HTTP_METHOD.GET,
        params: query,
      }),
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
  useRequestChangeMutation
} = homeApi;
