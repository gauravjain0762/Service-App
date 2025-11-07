import React, {useState} from 'react';
import {
  StyleSheet,
  ViewStyle,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';

import ShadowCard from './ShadowCard';
import CommonText from './CommonText';
import {IMAGES} from '@/assets/images';
import {Colors} from '@/constants/Colors';
import ImagePicker from 'react-native-image-crop-picker';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import CustomButton from './CustomButton';
import CustomImage from './CustomImage';
import {pick, types} from '@react-native-documents/picker';
import Video from 'react-native-video';
import BottomModal from './BottomModal';

type Props = {
  desc?: string;
  title?: string;
  style?: ViewStyle;
  isButton?: boolean;
  btnStyle?: ViewStyle;
  setSelectedMedia?: any;
  isDocument?: boolean;
  isAllDocument?: boolean;
  selectedMedia?: any;
};

const UploadBox = ({
  title,
  style,
  btnStyle,
  desc,
  isButton = true,
  setSelectedMedia,
  isAllDocument = false,
  isDocument = false,
  selectedMedia,
}: Props) => {
  const [files, setFiles] = useState<any[]>(selectedMedia || []);
  const [showOptions, setShowOptions] = useState(false);

  React.useEffect(() => {
    if (selectedMedia && selectedMedia.length > 0) {
      setFiles(selectedMedia);
    }
  }, [selectedMedia]);

  const handleCamera = () => {
    ImagePicker.openCamera({
      mediaType: 'any',
      cropping: false,
    })
      .then(image => {
        if (Platform.OS == 'android') {
          image.sourceURL = image.path;
        } else {
          if (image.sourceURL == null) {
            image.sourceURL = image.path;
          }
        }
        let temp = {...image, name: 'image_' + new Date().getTime() + '.png'};
        const newFile = {
          uri: image.sourceURL || image.path,
          type: image.mime,
          name: (image.sourceURL || image.path).split('/').pop(),
        };
        setFiles(prev => [...prev, image]);
        setSelectedMedia((prev: any) => [...prev, temp]);
        setShowOptions(false);
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          console.log('Error opening camera:', error);
        }
      });
  };

  const handleBrowseFiles = () => {
    ImagePicker.openPicker({
      multiple: false,
      mediaType: 'any',
    })
      .then(images => {
        const newFiles: any = Array.isArray(images) ? images : [images];
        setFiles(prev => [...prev, ...newFiles]);
        const data: any = {
          uri: newFiles[0]?.sourceURL,
          type: newFiles[0]?.mime,
          name: newFiles[0]?.sourceURL.split('/').pop(),
        };
        setSelectedMedia((prev: any) => [...prev, data]);
        setShowOptions(false);
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

  const openDocPicker = async () => {
    try {
      const [pickerResult] = await pick({
        presentationStyle: 'fullScreen',
        type: [types.pdf],
      });
      const newFile = {
        uri: pickerResult.uri,
        name: pickerResult.name,
        type: pickerResult.type,
      };
      setFiles(prev => [...prev, newFile]);
      setSelectedMedia((prev: any) => [...prev, newFile]);
      setShowOptions(false);
    } catch (e) {
      console.log('error--', e);
    }
  };

  const openAllPicker = async () => {
    try {
      const [pickerResult] = await pick({
        presentationStyle: 'fullScreen',
        type: [types.pdf, types.images, types.video],
      });
      const newFile = {
        uri: pickerResult.uri,
        name: pickerResult.name,
        type: pickerResult.type,
      };
      setShowOptions(false);
      setFiles(prev => [...prev, newFile]);
      setSelectedMedia((prev: any) => [...prev, newFile]);
    } catch (e) {
      console.log('error--', e);
    }
  };

  const handleUploadPress = () => {
    setShowOptions(true);
  };

  const renderFile = ({item, index}: {item: any; index?: number}) => {
    const isImage =
      item.mime?.includes('image') || item.type?.includes('image');
    const isVideo =
      item.mime?.includes('video') || item.type?.includes('video');
    const isPdf = item.mime?.includes('pdf') || item.type?.includes('pdf');
    return (
      <View style={styles.fileContainer}>
        {isPdf ? (
          <CustomImage size={hp(80)} source={IMAGES.pdfIcon} />
        ) : isImage ? (
          <CustomImage
            size={hp(80)}
            resizeMode="cover"
            uri={item.path ?? item?.uri}
          />
        ) : isVideo ? (
          <Video
            source={{uri: item.path ?? item?.uri}}
            style={{width: wp(80), height: hp(80), borderRadius: hp(2)}}
            muted={true}
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
    <>
      <ShadowCard style={[style]}>
        {title && <CommonText style={styles.title} text={title} />}

        <FlatList
          data={files}
          renderItem={renderFile}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          contentContainerStyle={{
            paddingVertical: hp(10),
            gap: hp(10),
            paddingHorizontal: hp(10),
            alignItems: 'center',
          }}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={
            <CustomImage
              resizeMode="contain"
              source={IMAGES.photoUpload}
              imageStyle={[styles.icon, {marginTop: 0, marginBottom: 0}]}
              onPress={handleUploadPress}
            />
          }
        />

        <CommonText
          style={styles.subText}
          text={desc || 'Upload videos, images, or PDFs here.'}
        />
      </ShadowCard>

      {/* Options Modal */}
      <BottomModal
        visible={showOptions}
        onClose={() => setShowOptions(false)}
        onPressCancel={() => setShowOptions(false)}>
        <View style={styles.optionsContainer}>
          <CommonText style={styles.modalTitle} text="Choose an option" />

          {/* Camera Option - Show for all except isDocument only mode */}
          {!isDocument && (
            <TouchableOpacity
              style={styles.optionButton}
              onPress={handleCamera}>
              <CustomImage
                source={IMAGES.camera || IMAGES.photoUpload}
                size={hp(24)}
                resizeMode="contain"
              />
              <CommonText style={styles.optionText} text="Take Photo/Video" />
            </TouchableOpacity>
          )}

          {/* Gallery/Media Picker - Show when not document mode or when isAllDocument */}
          {(!isDocument || isAllDocument) && (
            <TouchableOpacity
              style={styles.optionButton}
              onPress={handleBrowseFiles}>
              <CustomImage
                source={IMAGES.gallery || IMAGES.photoUpload}
                size={hp(24)}
                resizeMode="contain"
              />
              <CommonText
                style={styles.optionText}
                text="Choose from Gallery"
              />
            </TouchableOpacity>
          )}

          {/* Document Picker - Show for document or all document mode */}
          {(isDocument || isAllDocument) && (
            <TouchableOpacity
              style={styles.optionButton}
              onPress={isAllDocument ? openAllPicker : openDocPicker}>
              <CustomImage
                source={IMAGES.pdfIcon || IMAGES.photoUpload}
                size={hp(24)}
                resizeMode="contain"
              />
              <CommonText style={styles.optionText} text="Choose Document" />
            </TouchableOpacity>
          )}

          <CustomButton
            title="Cancel"
            onPress={() => setShowOptions(false)}
            btnStyle={styles.cancelButton}
            textStyle={styles.cancelText}
          />
        </View>
      </BottomModal>
    </>
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
    marginBottom: hp(10),
  },
  fileContainer: {
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
  pdfIcon: {
    height: hp(80),
    width: hp(80),
  },
  optionsContainer: {
    paddingHorizontal: wp(20),
    paddingBottom: hp(20),
    width: '100%',
  },
  modalTitle: {
    ...commonFontStyle(700, 2.5, Colors.black),
    marginBottom: hp(20),
    textAlign: 'center',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(16),
    paddingHorizontal: wp(20),
    borderRadius: hp(12),
    backgroundColor: Colors._F2F2F2 || '#f5f5f5',
    marginBottom: hp(12),
    gap: wp(15),
  },
  optionText: {
    ...commonFontStyle(500, 2, Colors.black),
    flex: 1,
  },
  cancelButton: {
    marginTop: hp(10),
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.red || '#ddd',
  },
  cancelText: {
    ...commonFontStyle(500, 1.8, Colors.red),
  },
});
