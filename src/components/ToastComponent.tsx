/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Animated, StyleSheet, View, SafeAreaView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, getFontSize, SCREEN_WIDTH} from '@/utils/responsiveFn';
import {IMAGES} from '@/assets/images';
import {GeneralStyle} from '@/constants/GeneralStyle';
import CommonText from './common/CommonText';

interface ToastProps {
  type: 'error' | 'success';
  text1: string;
  lineAnim?: any;
}

const ToastComponent = ({type, text1, lineAnim}: ToastProps) => {
  return (
    <SafeAreaView>
      <View style={styles.toastStyle}>
        {type === 'success' && (
          <LinearGradient
            start={{x: 0.0, y: 0.0}}
            end={{x: 0.9, y: 0.8}}
            colors={[Colors.containerBGColor, Colors.greenOpacity]}>
            <View style={styles.row}>
              <FastImage
                source={IMAGES.checked}
                defaultSource={IMAGES.checked}
                style={{height: getFontSize(2.5), width: getFontSize(2.5)}}
                resizeMode="contain"
                tintColor={Colors.green}
              />
              <CommonText style={styles.textStyleToast} text={text1} />
            </View>

            <Animated.View
              style={{
                height: 4,
                backgroundColor: Colors.green,
                width: lineAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'], // Animate from 0% to 100%
                }),
              }}
            />
          </LinearGradient>
        )}

        {type === 'error' && (
          <LinearGradient
            start={{x: 0.0, y: 0.0}}
            end={{x: 0.9, y: 0.8}}
            colors={[Colors.containerBGColor, Colors.orangeOpacity]}>
            <View style={styles.row}>
              <FastImage
                source={IMAGES.cancel}
                defaultSource={IMAGES.cancel}
                style={{height: getFontSize(2.5), width: getFontSize(2.5)}}
                resizeMode="contain"
                tintColor={Colors.red}
              />
              <CommonText style={styles.textStyleToast} text={text1} />
            </View>

            <Animated.View
              style={{
                height: 4,
                backgroundColor: Colors.red,
                width: lineAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'], // Animate from 0% to 100%
                }),
              }}
            />
          </LinearGradient>
        )}
      </View>
    </SafeAreaView>
  );
};
export default ToastComponent;

const styles = StyleSheet.create({
  toastStyle: {
    backgroundColor: Colors._25201a,

    width: SCREEN_WIDTH - 50,
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  row: {
    ...GeneralStyle.flexRow,
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: getFontSize(1.8),
  },
  textStyleToastSuccess: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    width: SCREEN_WIDTH,
  },
  textStyleToast: {
    ...commonFontStyle(500, 1.9, Colors.white),
    textAlign: 'left',
    paddingRight: getFontSize(1),
  },
});
