import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '../../services/api/baseQuery';
import {SEEKER_API, HTTP_METHOD} from '@/utils/constants/api';
import {setAuthToken, setGuestLogin, setUserInfo} from '@/features/authSlice';
import { setAsyncToken, setAsyncUserInfo } from '@/Hooks/asyncStorage';
import { resetNavigation } from '@/components/common/commonFunction';
import { SCREENS, SEEKER_SCREENS } from '@/navigation/screenNames';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery,
  tagTypes: ['Auth'],
  endpoints: builder => ({
    login: builder.mutation<any, any>({
      query: credentials => ({
        url: SEEKER_API.AUTH.LOGIN,
        method: HTTP_METHOD.POST,
        data: credentials,
      }),
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;

          dispatch(setAuthToken(data?.data?.auth_token));
          dispatch(setUserInfo(data?.data?.user));
          dispatch(setGuestLogin(false));
        } catch (error) {}
      },
      invalidatesTags: ['Auth'],
    }),

    signUp: builder.mutation<any, any>({
      query: credentials => ({
        url: SEEKER_API.AUTH.REGISTER,
        method: HTTP_METHOD.POST,
        data: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    guestLogin: builder.mutation<any, any>({
      query: credentials => ({
        url: SEEKER_API.AUTH.GUEST_LOGIN,
        method: HTTP_METHOD.POST,
        data: credentials,
      }),
      invalidatesTags: ['Auth'],
       async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          console.log(data, 'datadatadatadatadatadata');
          if (data?.data?.auth_token) {
            await setAsyncToken(data?.data?.auth_token);
            dispatch(setAuthToken(data.data?.auth_token));
            dispatch(setUserInfo(data.data?.user));
            await setAsyncUserInfo(data.data?.user);
            dispatch(setGuestLogin(true));
            resetNavigation(SCREENS.SeekerNavigator);
          }
        } catch (error) {
          console.log('Guest Login Error', error);
        }
      },
    }),

    verifyOTP: builder.mutation<any, any>({
      query: credentials => ({
        url: SEEKER_API.AUTH.VERIFY_OTP,
        method: HTTP_METHOD.POST,
        data: credentials,
      }),
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;

          console.log('data', data);

          dispatch(setAuthToken(data?.data?.auth_token));
          dispatch(setUserInfo(data?.data?.user));
        } catch (error) {}
      },
      invalidatesTags: ['Auth'],
    }),

    sendOTP: builder.mutation<any, any>({
      query: credentials => ({
        url: SEEKER_API.AUTH.SEND_OTP,
        method: HTTP_METHOD.POST,
        data: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    resendOTP: builder.mutation<any, any>({
      query: credentials => ({
        url: SEEKER_API.AUTH.RESEND_OTP,
        method: HTTP_METHOD.POST,
        data: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    resetPassword: builder.mutation<any, any>({
      query: credentials => ({
        url: SEEKER_API.AUTH.RESET_PASSWORD,
        method: HTTP_METHOD.POST,
        data: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    forgotPassword: builder.mutation<any, any>({
      query: credentials => ({
        url: SEEKER_API.AUTH.FORGOT_PASSWORD,
        method: HTTP_METHOD.POST,
        data: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    googleSignIn: builder.mutation<any, any>({
      query: credentials => ({
        url: SEEKER_API.AUTH.GOOGLE_SIGNIN,
        method: HTTP_METHOD.POST,
        data: credentials,
      }),
      invalidatesTags: ['Auth'],
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          dispatch(setAuthToken(data?.data?.auth_token));
          dispatch(setUserInfo(data?.data?.user));
          dispatch(setGuestLogin(false));
        } catch (error) {}
      },
    }),

    appleSignIn: builder.mutation<any, any>({
      query: credentials => ({
        url: SEEKER_API.AUTH.APPLE_SIGNIN,
        method: HTTP_METHOD.POST,
        data: credentials,
      }),
      invalidatesTags: ['Auth'],
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          dispatch(setAuthToken(data?.data?.auth_token));
          dispatch(setUserInfo(data?.data?.user));
          dispatch(setGuestLogin(false));
        } catch (error) {}
      },
    }),

    logout: builder.mutation<any, any>({
      query: credentials => ({
        url: SEEKER_API.AUTH.LOGOUT,
        method: HTTP_METHOD.POST,
        data: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useGuestLoginMutation,
  useVerifyOTPMutation,
  useSendOTPMutation,
  useResendOTPMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
  useGoogleSignInMutation,
  useAppleSignInMutation,
  useLogoutMutation,
} = authApi;
