import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
import {promptForEnableLocationIfNeeded} from 'react-native-android-location-enabler';
import Geolocation from '@react-native-community/geolocation';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {getAsyncToken} from './asyncStorage';
import {GOOGLE_MAP_API_KEY, HTTP_METHOD} from '../utils/constants/api';
import {makeAPIRequest} from '../utils/apiGlobal';
import {errorToast} from '@/components/common/commonFunction';

export const requestLocationPermission = async (
  GetForcefully = true,
  onSuccess: (location: any) => void,
  onFail: any, // Use React Navigation or appropriate navigation prop
) => {
  if (Platform.OS === 'ios') {
    requestIOSPermission(GetForcefully, onSuccess, onFail);
  } else if (Platform.OS === 'android') {
    await requestAndroidPermission(GetForcefully, onSuccess, onFail);
  } else {
    Alert.alert(
      'Unsupported Platform',
      'Location is not supported on this platform.',
      [
        {
          text: 'Back',
          onPress: () => onFail(),
        },
      ],
    );
  }
};

const requestIOSPermission = async (
  GetForcefully: boolean,
  onSuccess: (location: any) => void,
  onFail: any,
) => {
  try {
    const permissionWhenInUse = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
    const permissionAlways = PERMISSIONS.IOS.LOCATION_ALWAYS;

    let permissionStatus = await check(permissionAlways);
    if (permissionStatus !== RESULTS.GRANTED) {
      permissionStatus = await check(permissionWhenInUse);
    }

    if (permissionStatus === RESULTS.GRANTED) {
      getCurrentLocation(onSuccess);
      return;
    }
    if (GetForcefully) {
      const newStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      if (newStatus === RESULTS.GRANTED) {
        getCurrentLocation(onSuccess);
      } else if (
        newStatus === RESULTS.BLOCKED ||
        newStatus === RESULTS.DENIED
      ) {
        showPermissionDeniedAlert(onFail);
      } else {
        onFail('Permission status unknown');
      }
    } else {
      onSuccess('Permission denied');
    }
  } catch (error) {
    console.log('requestIOSPermission => error => ', error);
  }
};

const requestAndroidPermission = async (
  GetForcefully: boolean,
  onSuccess: (location: any) => void,
  onFail: any,
) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (GetForcefully) {
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await promptForEnableLocationIfNeeded()
          .then(() => getCurrentLocation(onSuccess))
          .catch(() => showEnableLocationAlert(onFail));
      } else {
        showPermissionDeniedAlert(onFail);
      }
    } else {
      await promptForEnableLocationIfNeeded().then(() => {
        getCurrentLocation(onSuccess);
      });
    }
  } catch (error) {
    console.log('requestAndroidPermission => error => ', error);
    showPermissionDeniedAlert(onFail);
  }
};

const getCurrentLocation = (onSuccess: (location: any) => void) => {
  Geolocation.getCurrentPosition(
    position => {
      const {latitude, longitude} = position.coords;
      const location = {
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      onSuccess(location);
    },
    error => {
      console.log('getCurrentPosition => error => ', error);
    },
    // {
    //   enableHighAccuracy: true, // Request high accuracy
    // },
  );
};

const showPermissionDeniedAlert = (onFail: any) => {
  Alert.alert(
    'Location Permission Required',
    'Please enable location permissions in your app settings to proceed.',
    [
      {text: 'cancel', onPress: () => onFail()},
      {
        text: 'Settings',
        onPress: () => (onFail(), Linking.openSettings()),
      },
    ],
  );
};

const showEnableLocationAlert = (onFail: any) => {
  Alert.alert(
    'Enable Location Services',
    'Location services are turned off. Please enable them to proceed.',
    [
      {text: 'cancel', onPress: () => onFail()},
      {
        text: 'Enable',
        onPress: () => promptForEnableLocationIfNeeded(),
      },
    ],
  );
};

export const locationEnabler = async (
  onSuccess?: (res: any) => void,
  onFail?: (err: any) => void,
) => {
  if (Platform.OS === 'android') {
    await promptForEnableLocationIfNeeded()
      .then((_res: any) => {
        if (onSuccess) {
          onSuccess(true);
        }
      })
      .catch(err => {
        if (onFail) {
          onFail(err);
        }
      });
  }
};

export const _openAppSetting = () => {
  Alert.alert(
    'Location Permission',
    'Please allow app to access your location',
    [
      {
        text: 'Setting',
        onPress: () => Linking.openSettings(),
      },
      {
        text: 'cancel',
        onPress: () => {},
        style: 'cancel',
      },
    ],
  );
};

export const getAddressFromLatLng = async (request: any) => {
  const {region, onSuccess, onFailure} = request;
  console.log(region, 'region');

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${region?.latitude},${region?.longitude}&key=${GOOGLE_MAP_API_KEY}`;

  try {
    const response = await fetch(url, {
      method: HTTP_METHOD.GET,
      headers: {},
    });

    const responseJson = await response.json();

    if (responseJson.status === 'OK') {
      onSuccess?.(responseJson); // call only if it's defined
    } else {
      errorToast('Location not found. Please select another location');
      onFailure?.(responseJson);
    }
  } catch (error) {
    console.log('getAddress => error => ', error);
    onFailure?.(error);
  }
};

export const getGoogleAutoAddress = (request: any) => async (dispatch: any) => {
  let headers = {
    Authorization: await getAsyncToken(),
  };
  return makeAPIRequest({
    method: HTTP_METHOD.GET,
    headers: headers,
    params: {
      input: request?.data?.search,
      key: GOOGLE_MAP_API_KEY,
      // components: 'country:in',
    },
    url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json',
  })
    .then(async (response: any) => {
      if (response.status === 200) {
        if (request.onSuccess) request.onSuccess(response?.data);
      }
    })
    .catch((error: any) => {
      if (request.onFailure) request.onFailure(error.response);
    });
};

export const getLatLngFromPlaceId = (request: any) => async (dispatch: any) => {
  return makeAPIRequest({
    method: HTTP_METHOD.GET,
    params: {
      place_id: request?.data?.placeId,
      key: GOOGLE_MAP_API_KEY,
    },
    url: 'https://maps.googleapis.com/maps/api/place/details/json',
  })
    .then(async (response: any) => {
      if (response.status === 200) {
        const result = response?.data?.result;
        if (request.onSuccess) request.onSuccess(result);
      }
    })
    .catch((error: any) => {
      if (request.onFailure) request.onFailure(error.response);
    });
};
