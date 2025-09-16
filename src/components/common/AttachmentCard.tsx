import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

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
import Video from 'react-native-video';
import { useAppSelector } from '@/Hooks/hooks';
import { alignSelfRTL, rowReverseRTL } from '@/utils/arabicStyles';

const AttachmentCard = ({requestImages = [], title}: any) => {
  const {language} = useAppSelector(state => state.auth);
    const styles = React.useMemo(() => getGlobalStyles(language), [language]);
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
            marginBottom: hp(17),
            // alignSelf: 'flex-start',
            ...alignSelfRTL(language),
            paddingHorizontal: wp(12),
            ...commonFontStyle(600, 1.7, Colors._202020),
          }}
        />
        <View style={styles.imageRow}>
          {requestImages[0]?.type === 'video' ? (
            <TouchableOpacity
              style={styles.imageBox}
              onPress={() => {
                navigateTo(SCREENS.WebViewScreen, {
                  url: requestImages[0]?.file,
                  title: '',
                });
              }}>
              <Video
                source={{uri: requestImages[0]?.file}}
                style={{width: '100%', height: '100%'}}
                muted={true}
              />
            </TouchableOpacity>
          ) : (
            <CustomImage
              onPress={() => {
                navigateTo(SCREENS.WebViewScreen, {
                  url: requestImages[0]?.file,
                  title: '',
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
          )}

          <View style={styles.secondImageWrapper}>
            {requestImages &&
              requestImages[1] &&
              (requestImages[1]?.type === 'video' ? (
                <TouchableOpacity style={styles.imageBox}>
                  <Video
                    source={{uri: requestImages[0]?.file}}
                    style={{width: '100%', height: '100%'}}
                    muted={true}
                  />
                </TouchableOpacity>
              ) : (
                <CustomImage
                  onPress={() => {
                    navigateTo(SCREENS.WebViewScreen, {
                      url: requestImages[1]?.file,
                      title: '',
                    });
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
              ))}
            {requestImages && requestImages.length > 2 && (
              <TouchableOpacity
                onPress={() => {
                  setIsModalVisible(true);
                }}
                style={styles.overlay}>
                <CommonText
                  text={requestImages && `+${requestImages.length - 2}`}
                  style={styles.overlayText}
                />
              </TouchableOpacity>
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

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
  imageRow: {
    gap: wp(12),
    width: '95%',
    ...rowReverseRTL(_language),
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
})}