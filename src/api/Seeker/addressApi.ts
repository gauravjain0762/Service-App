import { axiosBaseQuery } from '@/services/api/baseQuery';
import { GOOGLE_MAP_API_KEY, HTTP_METHOD } from '@/utils/constants/api';
import {createApi} from '@reduxjs/toolkit/query/react';
// import {axiosBaseQuery} from '../services/api/baseQuery';
// import {API, GOOGLE_MAP_API_KEY, HTTP_METHOD} from '../utils/apiConstant';
// import {setAddressList} from '../features/authSlice';

export const addressApi = createApi({
  reducerPath: 'addressApi',
  baseQuery: axiosBaseQuery,
  tagTypes: ['GetAddress'],
  keepUnusedDataFor: 300, // 5 minutes
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: builder => ({
    // Get Google Address
    getGoogleAddress: builder.query<any, {latitude: number; longitude: number}>(
      {
        query: ({latitude, longitude}) => ({
          url: `https://maps.googleapis.com/maps/api/geocode/json?address=${latitude},${longitude}&key=${GOOGLE_MAP_API_KEY}`,
          method: HTTP_METHOD.GET,
        }),
        transformResponse: (response: any) => {
          if (response.status === 'OK') {
            return response;
          } else {
            throw new Error(
              'Location not found. Please select another location.',
            );
          }
        },
      },
    ),

    // get Place Details
    getPlaceDetails: builder.query<any, {placeId: string; language?: string}>({
      query: ({placeId, language = 'en'}) => ({
        url: `https://maps.googleapis.com/maps/api/place/details/json`,
        method: 'GET',
        params: {
          place_id: placeId,
          key: GOOGLE_MAP_API_KEY,
          language,
        },
      }),
      transformResponse: (response: any) => {
        if (response.status === 'OK') {
          return response.result;
        } else {
          throw new Error('Failed to fetch place details');
        }
      },
    }),

    // get Place Auto
    getAutoPlaceComplete: builder.query<any, { search: string; language?: string }>({
      query: ({ search, language = 'en' }) => ({
        url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json',
        method: 'GET',
        params: {
          input: search,
          key: GOOGLE_MAP_API_KEY,
          language,
        },
      }),
      transformResponse: (response: any) => {
        if (response.status === 'OK') {
          return response.predictions;
        } else {
          throw new Error('Failed to fetch autocomplete results');
        }
      },
    }),
  }),
});

// Export hooks
export const {
//   useGetAddressQuery,
//   useMakeAddressDefaultMutation,
//   useDeleteAddressMutation,
//   useUpdateAddressMutation,
//   useAddAddressMutation,
  useGetGoogleAddressQuery,
  useGetPlaceDetailsQuery,
  useGetAutoPlaceCompleteQuery
} = addressApi;
