import React, {useState} from 'react';
import {StyleSheet, ViewStyle, View, FlatList} from 'react-native';

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
  isButton?: boolean;
  btnStyle?: ViewStyle;
  setSelectedMedia?: any;
};

const UploadBox = ({
  title,
  style,
  btnStyle,
  desc,
  isButton = true,
  setSelectedMedia,
}: Props) => {
  const [files, setFiles] = useState<any[]>([]);

  const handleBrowseFiles = () => {
    ImagePicker.openPicker({
      multiple: false, // ✅ allow multiple
      mediaType: 'photo',
    })
      .then(images => {
        // If single file, wrap in array
        const newFiles:any = Array.isArray(images) ? images : [images];
        setFiles(prev => [...prev, ...newFiles]); // ✅ append instead of overwrite
        
        const data:any = {
          uri: newFiles[0]?.sourceURL,
          type: newFiles[0]?.mime,
          name: newFiles[0]?.sourceURL.split('/').pop(),
        }
        setSelectedMedia((prev: any) => [...prev, data]); // ✅ append instead of overwrite
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          console.log('Error picking file:', error);
        }
      });
  };

  const deleteFile = (index: number | undefined = 0) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    setSelectedMedia(updatedFiles);
  };

  const renderFile = ({item, index}: {item: any; index?: number}) => {
    const isImage = item.mime?.includes('image');
    const isVideo = item.mime?.includes('video');
    return (
      <View style={styles.fileContainer}>
        {isImage ? (
          <CustomImage
            size={hp(80)}
            resizeMode="cover"
            uri={item.path}
            // imageStyle={styles.previewImg}
          />
        ) : isVideo ? (
          <CustomImage
            size={hp(12)}
            resizeMode="contain"
            source={IMAGES.photoUpload} // replace with your video icon
            imageStyle={styles.previewImg}
          />
        ) : (
          <CustomImage
            size={hp(12)}
            resizeMode="contain"
            source={IMAGES.photoUpload}
            imageStyle={styles.previewImg}
          />
        )}
        <CustomImage
          source={IMAGES.close2}
          size={hp(10)}
          resizeMode="contain"
          containerStyle={styles.closeBtn}
          onPress={() => deleteFile(index)}
        />
      </View>
    );
  };

  return (
    <ShadowCard style={[style]}>
      {title && <CommonText style={styles.title} text={title} />}

      {files.length > 0 ? (
        <FlatList
          data={files}
          renderItem={renderFile}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          contentContainerStyle={{
            paddingVertical: hp(10),
            gap: hp(10),
            paddingHorizontal: hp(10),
          }}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <CustomImage
          resizeMode="contain"
          source={IMAGES.photoUpload}
          imageStyle={[styles.icon]}
        />
      )}

      <CommonText
        style={styles.subText}
        text={desc || 'Upload videos, images, or PDFs here.'}
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
  fileContainer: {
    // marginRight: wp(8),
    borderRadius: hp(2),
    overflow: 'hidden',
    paddingVertical: hp(10),
  },
  previewImg: {
    width: wp(20),
    height: hp(12),
    borderRadius: hp(2),
  },
  subText: {
    marginBottom: hp(20),
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
  closeBtn: {
    position: 'absolute',
    top: 3,
    right: 1,
    height: hp(25),
    width: hp(25),
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    shadowColor: Colors.black,
    shadowOffset: {
      width: -0.5,
      height: -0.5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
});
