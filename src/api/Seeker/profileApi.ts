import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '../../services/api/baseQuery';
import {SEEKER_API, HTTP_METHOD} from '@/utils/constants/api';
import {setUserInfo} from '@/features/authSlice';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: axiosBaseQuery,
  tagTypes: ['profileApi','getProfile'],
  keepUnusedDataFor: 300, // 5 minutes
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: builder => ({
    getProfile: builder.query<any, any>({
      query: () => ({
        url: SEEKER_API.PROFILE.PROFILE,
        method: HTTP_METHOD.GET,
      }),
      providesTags: ['getProfile'],
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;

          dispatch(setUserInfo(data?.data?.user));
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
      invalidatesTags: ['profileApi','getProfile'],
    }),
  }),
});

export const {useGetProfileQuery, useUpdateProfileMutation} = profileApi;
