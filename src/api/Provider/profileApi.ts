import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '../../services/api/baseQuery';
import {SEEKER_API, HTTP_METHOD, PROVIDER_API} from '@/utils/constants/api';
import {setUserInfo} from '@/features/authSlice';

export const providerProfileApi = createApi({
  reducerPath: 'providerProfileApi',
  baseQuery: axiosBaseQuery,
  tagTypes: ['providerProfileApi','getProfile'],
  keepUnusedDataFor: 300, // 5 minutes
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: builder => ({
    getProfile: builder.query<any, any>({
      query: () => ({
        url: PROVIDER_API.PROFILE.PROFILE,
        method: HTTP_METHOD.GET,
      }),
      providesTags: ['getProfile'],
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          dispatch(setUserInfo(data?.data?.company));
        } catch (error) {}
      },
    }),

    updateProfile: builder.mutation<any, any>({
      query: credentials => ({
        url: SEEKER_API.PROFILE.UPDATE_PROFILE,
        method: HTTP_METHOD.POST,
        data: credentials,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      invalidatesTags: ['providerProfileApi','getProfile'],
    }),
  }),
});

export const {useGetProfileQuery, useUpdateProfileMutation} = providerProfileApi;
