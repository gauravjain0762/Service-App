import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { setAsyncFCMToken } from './asyncStorage';
import { setFcmToken } from '../features/authSlice';
import { errorToast } from './common/commonFunction';
import { PermissionsAndroid, Platform } from 'react-native';

async function onDisplayNotification(message: any) {
  await notifee.requestPermission();
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    sound: 'default',
    importance: AndroidImportance.HIGH,
  });
  notifee.displayNotification({
    title: message.notification.title,
    body: message.notification.body,
    data: message.data,
    android: {
      channelId,
      sound: 'default',
      pressAction: {
        id: 'default',
        launchActivity: 'default',
      },
    },
    ios: {
      sound: 'default',
    },
  });
}
export async function requestNotificationUserPermission(dispatch: any) {
  if (Platform.OS === 'android') {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    if (authStatus === 1) {
      if (Platform.OS === 'ios') {
        await messaging()
          .registerDeviceForRemoteMessages()
          .then(async () => {
            getFirebaseToken(dispatch);
          })
          .catch(() => {
            getFirebaseToken(dispatch);
          });
      } else {
        getFirebaseToken(dispatch);
      }
    } else {
      await messaging().requestPermission();
    }
  } else {
    await messaging().requestPermission();
    errorToast('Please allow to notifications permission');
  }
}
const getFirebaseToken = async (dispatch: any) => {
  await messaging()
    .getToken()
    .then(fcmToken => {
      if (fcmToken) {
        console.log('---fcmToken---', fcmToken);
        setAsyncFCMToken(fcmToken);
        dispatch(setFcmToken(fcmToken));
      } else {
        errorToast('[FCMService] User does not have a device token');
      }
    })
    .catch(error => {
      let err = `FCm token get error${error}`;
      errorToast(error);
      console.log(err);
    });
};

export const onMessage = () => {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived! ACTIVE APP', remoteMessage);
    onDisplayNotification(remoteMessage);
  });
  return unsubscribe;
};

// When app is background and click to notifiaction  redirect to screen
export const onBackgroundNotificationPress = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from BACKGROUND state:',
      remoteMessage,
    );
    if (remoteMessage) {
      navigateToOrderDetails(remoteMessage);
    }
  });
};

// When app is open and click to notifiaction redirect to screen
export const onNotificationPress = () => {
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('remote Message KILL state', remoteMessage);
        navigateToOrderDetails(remoteMessage);
      }
    });
};

// When app is open click to notification redirect to screen
export const openAppNotificationEvent = async () => {
  return notifee.onForegroundEvent(async ({ type, detail }) => {
    switch (type) {
      case EventType.DISMISSED:
        console.log('User dismissed notification', detail.notification);
        break;
      case EventType.PRESS:
        console.log('User pressed notification', detail.notification);
        break;
    }
  });
};

// navigation to scrren by notifiaction press
export const navigateToOrderDetails = (remoteMessage: any) => {
  if (remoteMessage?.data) {
  }
};
