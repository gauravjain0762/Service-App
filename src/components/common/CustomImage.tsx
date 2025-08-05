import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import React from 'react';
import FastImage, {FastImageProps, ImageStyle} from 'react-native-fast-image';
import {getFontSize} from '../../utils/responsiveFn';

interface Props {
  onPress?: () => void;
  source?: any;
  size?: number;
  containerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  tintColor?: any | undefined;
  uri?: string;
  disabled?: boolean;
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'center';
  props?: FastImageProps;
  isBackGround?: boolean;
  bgColor?: string;
  viewRef?: any;
}

const CustomImage = ({
  onPress,
  source,
  size,
  containerStyle,
  imageStyle,
  tintColor = undefined,
  uri,
  disabled = false,
  resizeMode = 'contain',
  isBackGround = false,
  bgColor,
  viewRef,
  ...props
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.5 : 1}
      onPress={onPress}
      ref={viewRef}
      disabled={onPress ? disabled : true}
      style={{
        ...containerStyle,

        ...(isBackGround ? styles.btnContainer : {}),

        ...(bgColor ? {backgroundColor: bgColor} : {}),
      }}>
      <FastImage
        source={uri ? {uri: uri} : source}
        defaultSource={source ? source : undefined}
        style={[{width: size, height: size}, imageStyle]}
        resizeMode={resizeMode}
        tintColor={uri ? undefined : tintColor}
        {...props}
      />
    </TouchableOpacity>
  );
};

export default CustomImage;

const styles = StyleSheet.create({
  btnContainer: {
    height: getFontSize(2),
    width: getFontSize(2),
    borderRadius: 50,
    // backgroundColor: Colors._33854F,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
