import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import {IMAGES} from '@/assets/images';
import CommonText from './CommonText';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import {Colors} from '@/constants/Colors';
import ShadowCard from './ShadowCard';

const images = [IMAGES.dummy2, IMAGES.dummy2, IMAGES.dummy2, IMAGES.dummy2];

const AttachmentCard = () => {
  return (
    <ShadowCard style={{width: '100%', alignItems: 'center'}}>
      <CommonText
        text="Additional Attachment"
        style={{
          textAlign: 'left',
          marginBottom: hp(17),
          alignSelf: 'flex-start',
          paddingHorizontal: wp(12),
          ...commonFontStyle(600, 1.7, Colors._202020),
        }}
      />
      <View style={styles.imageRow}>
        <Image source={images[0]} style={styles.imageBox} />

        <View style={styles.secondImageWrapper}>
          <Image
            source={images[1]}
            style={[styles.imageBox, styles.blurredImage]}
            blurRadius={images.length > 2 ? 5 : 0}
          />
          {images.length > 2 && (
            <View style={styles.overlay}>
              <CommonText
                text={`+${images.length - 2}`}
                style={styles.overlayText}
              />
            </View>
          )}
        </View>
      </View>
    </ShadowCard>
  );
};

export default AttachmentCard;

const styles = StyleSheet.create({
  imageRow: {
    gap: wp(12),
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageBox: {
    width: '48%',
    height: hp(150),
    borderRadius: hp(10),
  },
  secondImageWrapper: {
    position: 'relative',
    width: '48%',
    height: hp(150),
  },
  blurredImage: {
    width: '100%',
    height: '100%',
    borderRadius: hp(10),
  },
  overlay: {
    borderRadius: hp(10),
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayText: {
    ...commonFontStyle(700, 2.5, Colors.white),
  },
});
