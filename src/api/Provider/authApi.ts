import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '../../services/api/baseQuery';
import {PROVIDER_API, HTTP_METHOD} from '@/utils/constants/api';
import {
  setAuthToken,
  setDropDownCategories,
  setDropDownSubCategories,
  setUserInfo,
} from '@/features/authSlice';

export const providerAuthApi = createApi({
  reducerPath: 'providerAuthApi',
  baseQuery: axiosBaseQuery,
  tagTypes: ['Auth'],
  endpoints: builder => ({
    login: builder.mutation<any, any>({
      query: credentials => ({
        url: PROVIDER_API.AUTH.LOGIN,
        method: HTTP_METHOD.POST,
        data: credentials,
      }),
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;

          dispatch(setAuthToken(data?.data?.auth_token));
          dispatch(setUserInfo(data?.data?.company));
        } catch (error) {}
      },
      invalidatesTags: ['Auth'],
    }),

    signUp: builder.mutation<any, any>({
      query: credentials => ({
        url: PROVIDER_API.AUTH.REGISTER,
        method: HTTP_METHOD.POST,
        data: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    proVerifyOTP: builder.mutation<any, any>({
      query: credentials => ({
        url: PROVIDER_API.AUTH.VERIFY_OTP,
        method: HTTP_METHOD.POST,
        data: credentials,
      }),
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;

          console.log('data', data);

          dispatch(setAuthToken(data?.data?.auth_token));
          dispatch(setUserInfo(data?.data?.company));
        } catch (error) {}
      },
      invalidatesTags: ['Auth'],
    }),

    proResendOTP: builder.mutation<any, any>({
      query: credentials => ({
        url: PROVIDER_API.AUTH.RESEND_OTP,
        method: HTTP_METHOD.POST,
        data: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    resetPassword: builder.mutation<any, any>({
      query: credentials => ({
        url: PROVIDER_API.AUTH.RESET_PASSWORD,
        method: HTTP_METHOD.POST,
        data: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    forgotPassword: builder.mutation<any, any>({
      query: credentials => ({
        url: PROVIDER_API.AUTH.FORGOT_PASSWORD,
        method: HTTP_METHOD.POST,
        data: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    logout: builder.mutation<any, any>({
      query: credentials => ({
        url: PROVIDER_API.AUTH.LOGOUT,
        method: HTTP_METHOD.POST,
        data: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    category: builder.query<any, any>({
      query: () => ({
        url: PROVIDER_API.DROPDOWN.CATEGORIES,
        method: HTTP_METHOD.GET,
      }),
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;

          const newData =
            (data?.data?.categories &&
              data?.data?.categories?.length > 0 &&
              data?.data?.categories?.map((item: any) => {
                return {
                  ...item,
                  label: item?.title,
                  value: item?._id,
                };
              })) ||
            [];
          dispatch(setDropDownCategories(newData));
        } catch (error) {}
      },
    }),
    subCategory: builder.query<any, any>({
      query: query => ({
        url: PROVIDER_API.DROPDOWN.SUB_CATEGORIES,
        method: HTTP_METHOD.GET,
        params: query,
      }),
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;

          console.log('data', data?.data);

          const newData =
            (data?.data?.sub_categories &&
              data?.data?.sub_categories?.length > 0 &&
              data?.data?.sub_categories?.map((item: any) => {
                return {
                  ...item,
                  label: item?.title,
                  value: item?._id,
                };
              })) ||
            [];
          dispatch(setDropDownSubCategories(newData));
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useProVerifyOTPMutation,
  useProResendOTPMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
  useLogoutMutation,
  useCategoryQuery,
  useLazySubCategoryQuery,
} = providerAuthApi;
