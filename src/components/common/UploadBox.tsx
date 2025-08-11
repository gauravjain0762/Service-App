import React from 'react';
import {StyleSheet, ViewStyle, ImageStyle, StyleProp, View} from 'react-native';

import ShadowCard from './ShadowCard';
import CommonText from './CommonText';
import {IMAGES} from '@/assets/images';
import {Colors} from '@/constants/Colors';
import ImagePicker from 'react-native-image-crop-picker';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import CustomButton from './CustomButton';
import CustomImage from './CustomImage';

type Props = {
  desc?: string;
  title?: string;
  style?: ViewStyle;
  imageSource?: any;
  isButton?: boolean;
  btnStyle?: ViewStyle;
  onCameraCardPress?: () => void;
  imgStyle?: any | StyleProp<ImageStyle>;
};

const UploadBox = ({
  title,
  style,
  btnStyle,
  desc,
  imgStyle,
  imageSource,
  onCameraCardPress,
  isButton = true,
}: Props) => {
  const handleBrowseFiles = () => {
    ImagePicker.openPicker({
      multiple: false,
      mediaType: 'any',
    })
      .then(image => {
        console.log('Selected:', image);
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          console.log('Error picking file:', error);
        }
      });
  };

  return (
    <ShadowCard onCardPress={handleBrowseFiles} style={[style]}>
      {title && <CommonText style={styles.title} text={title} />}

      {imageSource ? (
        <View style={styles.imageContainer}>
          <CustomImage
            size={hp(24)}
            resizeMode="contain"
            source={imageSource}
          />
        </View>
      ) : (
        <CustomImage
          resizeMode="contain"
          source={imageSource || IMAGES.pdf}
          imageStyle={[styles.icon, imgStyle]}
        />
      )}

      <CommonText
        style={styles.subText}
        text={desc || 'Upload video files and images here.'}
      />

      {isButton && (
        <CustomButton
          onPress={handleBrowseFiles}
          btnStyle={[styles.browseBtn, btnStyle]}
          title="Browse Files"
          textStyle={styles.browseText}
        />
      )}
    </ShadowCard>
  );
};

export default UploadBox;

const styles = StyleSheet.create({
  title: {
    ...commonFontStyle(600, 2.2, Colors.black),
  },
  icon: {
    width: wp(48),
    height: hp(48),
    marginTop: hp(20),
  },
  imageContainer: {
    width: wp(48),
    height: hp(48),
    borderRadius: hp(13),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.provider_primary,
  },
  subText: {
    marginVertical: hp(20),
    ...commonFontStyle(400, 1.7, Colors._7D7D7D),
  },
  browseBtn: {
    width: '40%',
    borderRadius: hp(28),
    paddingVertical: hp(12),
    paddingHorizontal: wp(24),
    backgroundColor: Colors.seeker_primary,
  },
  browseText: {
    ...commonFontStyle(600, 1.7, Colors.white),
  },
});
