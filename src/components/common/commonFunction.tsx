import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigationRef} from '@/navigation/RootContainer';
import i18n from '@/i18n/i18n';
import {asyncKeys} from '@/Hooks/asyncStorage';

export const successToast = (message: string) => {
  Toast.show({type: 'success', text1: message});
};

export const errorToast = (message: string) => {
  Toast.show({type: 'error', text1: message});
};

export const emailCheck = (email: string) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(email) === false) {
    return false;
  } else {
    return true;
  }
};

export const nameCheck = (name: string) => {
  let reg = /^([a-zA-Z ]){2,30}$/;
  if (reg.test(name) === false) {
    return false;
  } else {
    return true;
  }
};

export const passwordCheck = (string: string) => {
  let reg = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,}$/;
  return reg.test(string);
};

export const mobileNumberCheck = (mobileNo: string) => {
  let reg = /^\d*$/;
  return reg.test(mobileNo);
};

export const formatToHMS = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const hDisplay = hrs > 0 ? `${hrs.toString().padStart(2, '0')}:` : '';
  const mDisplay = `${mins.toString().padStart(2, '0')}:`;
  const sDisplay = `${secs.toString().padStart(2, '0')}`;

  return `${hDisplay}${mDisplay}${sDisplay}`;
};

export const formatDay = (input: string) => {
  return input ? input.replace(/([a-zA-Z])(\d+)/, '$1 $2') : '';
};

// export const resetNavigation = (name: string, params?: any | undefined) => {
//   navigationRef.dispatch(
//     CommonActions.reset({
//       index: 1,
//       routes: [{name: name, params: params}],
//     }),
//   );
// };

export const resetNavigation = (
  parentRouteName: string | undefined | any,
  childRouteName?: string | undefined | any,
  params = {},
) => {
  navigationRef.current?.reset({
    index: 0,
    routes: [
      {
        name: parentRouteName,
        state: childRouteName
          ? {
              index: 0,
              routes: [{name: childRouteName, params}],
            }
          : undefined,
        params: !childRouteName ? params : undefined,
      },
    ],
  });
};

// export const resetNavigation = (name: string, params?: any | undefined) => {
//   navigationRef.dispatch(
//     CommonActions.reset({
//       index: 1,
//       routes: [{name: name, params: params}],
//     }),
//   );
// };
export const navigateTo = (name: string, params?: any | undefined) => {
  try {
    navigationRef.navigate(name, params);
  } catch (error) {
    console.log('error', error);
  }
};

export const goBack = () => {
  navigationRef.goBack();
};
export const getLanguageKey = () => {
  AsyncStorage.getItem(asyncKeys.language).then(res => {
    if (res) {
      i18n
        .changeLanguage(res)
        .then(() => {
          AsyncStorage.setItem(asyncKeys.language, 'en');
        })
        .catch((err: any) =>
          console.log('AsyncStorage => changeLanguage => error => ', err),
        );
    } else {
      AsyncStorage.setItem(asyncKeys.language, 'en');
    }
  });
};
export const getLocalizedText = (
  enText: string,
  arText: string,
  language: string | any,
) => {
  return language === 'ar' ? arText : enText;
};
export const formatePrice = (num: string | number | undefined): string => {
  const value = Number(num || 0);
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
export const formatPriceIN = (num: string | number | undefined): string => {
  const value = Number(num || 0);
  return new Intl.NumberFormat("en-IN").format(value);
};
