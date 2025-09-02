import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import {IMAGES} from '@/assets/images';
import CommonText from './CommonText';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import {Colors} from '@/constants/Colors';
import ShadowCard from './ShadowCard';
import CustomImage from './CustomImage';
import {SCREENS} from '@/navigation/screenNames';
import {navigateTo} from './commonFunction';
import ImageListModal from '../modals/ImageListModal';
import ImageViewer from '../modals/ImageViewer';

const images = [IMAGES.dummy2, IMAGES.dummy2, IMAGES.dummy2, IMAGES.dummy2];

const AttachmentCard = ({requestImages = [], title}: any) => {
  console.log(requestImages, 'requestImages');
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState({
    isOpen: false,
    image: null,
  });
  return (
    <>
      <ShadowCard style={{width: '100%', alignItems: 'center'}}>
        <CommonText
          text={title ? title : 'Additional Attachment'}
          style={{
            textAlign: 'left',
            marginBottom: hp(17),
            alignSelf: 'flex-start',
            paddingHorizontal: wp(12),
            ...commonFontStyle(600, 1.7, Colors._202020),
          }}
        />
        <View style={styles.imageRow}>
          <CustomImage
            onPress={() => {
              requestImages[0]?.type != 'image'
                ? navigateTo(SCREENS.WebViewScreen, {
                    url: requestImages[0]?.file,
                    title: requestImages[0]?.name,
                  })
                : setSelectedImage({
                    isOpen: true,
                    image: requestImages[0]?.file,
                  });
            }}
            source={
              requestImages[0]?.type != 'image'
                ? IMAGES.pdfIcon
                : {uri: requestImages && requestImages[0]?.file}
            }
            containerStyle={styles.imageBox}
            imageStyle={{width: '100%', height: '100%'}}
          />
          <View style={styles.secondImageWrapper}>
            {requestImages && requestImages[1] && (
              <CustomImage
                onPress={() => {
                  setIsModalVisible(true);
                }}
                source={
                  requestImages[1]?.type != 'image'
                    ? IMAGES.pdfIcon
                    : {uri: requestImages && requestImages[1]?.file}
                }
                containerStyle={[styles.imageBox, styles.blurredImage]}
                imageStyle={{width: '100%', height: '100%'}}
                blurRadius={requestImages && requestImages.length > 2 ? 5 : 0}
              />
            )}
            {requestImages && requestImages.length > 2 && (
              <View style={styles.overlay}>
                <CommonText
                  text={requestImages && `+${requestImages.length - 2}`}
                  style={styles.overlayText}
                />
              </View>
            )}
          </View>
        </View>
      </ShadowCard>
      {isModalVisible && (
        <ImageListModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          requestImages={requestImages}
        />
      )}
      {selectedImage?.isOpen && (
        <ImageViewer
          visible={selectedImage?.isOpen}
          onClose={() => {
            setSelectedImage({isOpen: false, image: null});
          }}
          imageUri={selectedImage?.image}
        />
      )}
    </>
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
    height: hp(100),
    borderRadius: hp(10),
    resizeMode: 'contain',
    overflow: 'hidden',
  },
  secondImageWrapper: {
    position: 'relative',
    width: '48%',
    height: hp(100),
    resizeMode: 'contain',
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
