import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '../../services/api/baseQuery';
import {SERVICE_API, HTTP_METHOD} from '@/utils/constants/api';
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
        url: SERVICE_API.DASHBOARD.DASHBOARD,
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
        url: SERVICE_API.DASHBOARD.SUB_CATEGORIES,
        method: HTTP_METHOD.GET,
        params: query,
      }),
    }),
  }),
});

export const {useGetDashboardQuery, useGetSubCategoriesQuery} = homeApi;
