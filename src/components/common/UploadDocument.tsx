import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { pick, types } from '@react-native-documents/picker';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import {Colors} from '@/constants/Colors';
import {IMAGES} from '@/assets/images';
import CommonText from './CommonText';

type Props = {
  value: any;
  onSelect?: (text: any) => void;
  title?: any;
};

const UploadDocument = ({value, onSelect = () => {}, title}: Props) => {
  const openDocPicker = async () => {
    try {
      const [pickerResult] = await pick({
        presentationStyle: 'fullScreen',
        type: [
          types.doc,
          types.pdf,
          types.images,
          types.zip,
          types.docx,
          types.ppt,
          types.pptx,
          types.xls,
          types.xlsx,
          types.plainText,
        ],
      });

      console.log('pickerResult', pickerResult);
      const newFile = {
        uri: pickerResult.uri,
        name: pickerResult.name,
        type: pickerResult.type,
      };
      onSelect(newFile);
    } catch (e) {
      console.log('error--', e);
    }
  };

  return (
    <TouchableOpacity
      style={styles.innerUploadView}
      onPress={() => openDocPicker()}>
      {value ? (
        // value?.type.includes('image') ? (
        //   <Image
        //     style={styles.uploadMultiImagePic}
        //     source={{uri: value?.uri || ''}}
        //   />
        // ) : (
          <Image style={styles.pdfIcon} source={IMAGES.pdfIcon} />
        // )
      ) : (
        <>
          <View style={styles.boxContainer}>
            <Image
              style={styles.uploadImage}
              source={value ? {uri: value.path} : IMAGES.upload}
            />
          </View>
          <CommonText style={styles.uploadText} text={title} />
        </>
      )} 
    </TouchableOpacity>
  );
};

export default UploadDocument;

const styles = StyleSheet.create({
  innerUploadView: {
    gap: wp(21),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp(15),
    backgroundColor: Colors._F9F9F9,
    height: hp(147),
    width: wp(170),
  },
  boxContainer: {
    height: hp(50),
    width: hp(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors._BEBEBE,
  },
  uploadImage: {
    height: 32,
    width: 32,
    borderRadius: 5,
    resizeMode: 'contain',
  },
  uploadMultiImagePic: {
    height: hp(147),
    width: wp(170),
    marginBottom: hp(2),
    borderRadius: 15,
    resizeMode: 'contain',
    borderColor: Colors._D3D3D3,
    borderWidth: 1,
  },
  uploadText: {
    ...commonFontStyle(500, 1.8, Colors._525252),
  },

  pdfIcon: {
    height: hp(50),
    width: hp(50),
  },
});
