/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import CommonText from './CommonText';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import {IMAGES} from '@/assets/images';
import Modal from 'react-native-modal';
import ActionSheet from './ActionSheet';
import ImageCropPicker from 'react-native-image-crop-picker';
import CustomImage from './CustomImage';
import {useAppSelector} from '@/Hooks/hooks';
import {rowReverseRTL} from '@/utils/arabicStyles';

const UploadImage = ({
  onSelect = () => {},
  style,
  value,
}: {
  onSelect?: (image: any) => void;
  style?: ViewStyle;
  value?: any;
}) => {
  const {language} = useAppSelector(state => state.auth);

  const styles = React.useMemo(() => getGlobalStyles(language), [language]);
  const [actionSheet, setActionSheet] = useState(false);
  const closeActionSheet = () => setActionSheet(false);

  const actionItems = [
    {
      id: 1,
      label: 'Open Camera',
      onPress: () => {
        openPicker();
      },
    },
    {
      id: 2,
      label: 'Open Gallery',
      onPress: () => {
        openGallery();
      },
    },
  ];

  const openPicker = () => {
    ImageCropPicker.openCamera({
      mediaType: 'photo',
    }).then(image => {
      closeActionSheet();

      const temp = {
        uri: image.sourceURL || image.path,
        name: image?.filename || image.path.split('/').pop(),
        type: 'image/jpeg',
      };
      onSelect(temp);
    });
  };
  const openGallery = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
    }).then(image => {
      closeActionSheet();

      const temp = {
        uri: image.sourceURL || image.path,
        name: image?.filename || image.path.split('/').pop(),
        type: 'image/jpeg',
      };

      onSelect(temp);
    });
  };

  return (
    <View style={[styles.container, style]}>
      {value ? (
        <TouchableOpacity
          onPress={() => setActionSheet(true)}
          style={styles.imageBox}>
          <CustomImage uri={value?.uri || ''} imageStyle={styles.imageStyle} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => setActionSheet(true)}
          style={styles.uploadBox}>
          <ImageBackground
            source={IMAGES.dashed_rec}
            style={styles.plusIconBox}>
            <Text style={styles.plusIconText}>+</Text>
          </ImageBackground>
          <CommonText
            text={'Upload Your Picture'}
            style={styles.uploadPictureText}
          />
        </TouchableOpacity>
      )}

      <Modal
        animationOutTiming={1000}
        useNativeDriver={Platform.OS === 'ios' ? false : true}
        onBackdropPress={() => closeActionSheet()}
        isVisible={actionSheet}
        style={{
          margin: 0,
          justifyContent: 'flex-end',
        }}>
        <ActionSheet actionItems={actionItems} onCancel={closeActionSheet} />
      </Modal>
    </View>
  );
};

export default UploadImage;

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
    container: {
      gap: hp(35),
    },
    imageBox: {
      height: hp(90),
      width: hp(90),
      backgroundColor: Colors._F9F9F9,
      borderRadius: hp(15),
    },
    uploadBox: {
      gap: wp(21),
      ...rowReverseRTL(_language),
      alignItems: 'center',
      borderRadius: hp(15),
      paddingVertical: hp(24),
      paddingHorizontal: wp(30),
      backgroundColor: Colors._F9F9F9,
    },
    plusIconBox: {
      width: wp(37),
      height: hp(37),
      alignItems: 'center',
      justifyContent: 'center',
    },
    plusIconText: {
      fontSize: 22,
      color: Colors._525252,
    },
    uploadPictureText: {
      ...commonFontStyle(500, 1.8, Colors._525252),
    },
    uploadRow: {
      gap: hp(23),
      ...rowReverseRTL(_language),
      alignItems: 'center',
    },
    certificateBox: {
      width: '47%',
      gap: hp(16),
      height: hp(145),
      padding: hp(23),
      borderRadius: hp(15),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors._F9F9F9,
    },
    iconBox: {
      width: wp(51),
      height: hp(51),
      alignItems: 'center',
      justifyContent: 'center',
    },
    uploadCertificateText: {
      ...commonFontStyle(500, 1.8, Colors._525252),
    },
    imageStyle: {
      height: hp(90),
      width: hp(90),
    },
  });
};
