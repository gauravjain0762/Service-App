/* eslint-disable eqeqeq */
import React from 'react';
import {
  StatusBar,
  PixelRatio,
  Dimensions,
  Platform,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TextStyle,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export function getFontType(fontWeight: any) {
  if (fontWeight == 600) {
    return 'Inter-SemiBold';
  } else if (fontWeight == 400) {
    return 'Inter-Regular';
  } else if (fontWeight == 700) {
    return 'Inter-Bold';
  } else if (fontWeight == 800) {
    return 'Inter-Black';
  } else if (fontWeight == 500) {
    return 'Inter-Medium';
  } else if (fontWeight == 300) {
    return 'Inter-Light';
  } else {
    return 'Inter-Regular';
  }
}

const {height, width} = Dimensions.get('window');

export const SCREEN_HEIGHT = height;

export const SCREEN_WIDTH = width;

export function isIphoneX() {
  return Platform.OS === 'ios' && DeviceInfo.hasNotch();
}

export function getHeight(h: string | number) {
  const elemHeight = parseFloat(h.toString());
  return PixelRatio.roundToNearestPixel((height * elemHeight) / 100);
}

export function getWidth(w: string | number) {
  const elemWidth = parseFloat(w.toString());
  return PixelRatio.roundToNearestPixel((width * elemWidth) / 100);
}

export function getFontSize(font: number) {
  const deviceHeight = isIphoneX()
    ? height * 0.9
    : Platform.OS === 'android'
    ? height - (StatusBar.currentHeight || 0)
    : height;
  const deviceHeightPercent = (font * deviceHeight) / 100;
  return Math.round(deviceHeightPercent);
}

export const useForceUpdate = () => {
  const [, updateState] = React.useState<undefined>();
  return React.useCallback(() => updateState(undefined), []);
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric', // "short" for abbreviated months (e.g., JAN)
    })
    .toUpperCase(); // Convert to uppercase for consistency
};

export const onScroll = (
  e: NativeSyntheticEvent<NativeScrollEvent>,
  setShowFade: (showFade: boolean) => void,
) => {
  const {contentOffset, layoutMeasurement, contentSize} = e.nativeEvent;
  if (contentOffset.y + layoutMeasurement.height >= contentSize.height - 1) {
    setShowFade(false);
  } else {
    setShowFade(true);
  }
};

export const commonFontStyle = (
  fontWeight: any,
  fontSize: any,
  color: any,
): TextStyle => {
  return {
    fontFamily: getFontType(fontWeight),
    fontSize: getFontSize(fontSize),
    color: color,
  };
};
