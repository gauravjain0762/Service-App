import {useAppSelector} from '@/Hooks/hooks';
import {rowReverseRTL} from '@/utils/arabicStyles';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import CommonText from './CommonText';

const PRIMARY_COLOR = 'rgb(0,98,255)';
const WHITE = '#ffffff';
const BORDER_COLOR = '#DBDBDB';
type Props = {
  value?: any;
  onChangeText?: any;
  style?: any;
  setVisible?: any;
  visible?: any;
};
const EditPicture = ({
  setVisible,
  visible,
  value,
  onChangeText,
  style,
}: Props) => {
  const {language} = useAppSelector(state => state.auth);
  const styles = React.useMemo(() => getGlobalStyles(language), [language]);
  // const [actionSheet, setActionSheet] = useState(false);
  const [image, setImage] = useState<any>(undefined);
  const {t} = useTranslation();
  const closeActionSheet = () => setVisible(false);

  const actionItems = [
    {
      id: 1,
      label: t('Open Camera'),
      onPress: () => {
        openPicker();
      },
    },
    {
      id: 2,
      label: t('Open Gallery'),
      onPress: () => {
        openGallery();
      },
    },
  ];

  const actionSheetItems = [
    ...actionItems,
    {
      id: '#cancel',
      label: t('Cancel'),
      onPress: () => closeActionSheet(),
    },
  ];

  const openPicker = () => {
    ImageCropPicker.openCamera({
      mediaType: 'photo',
    }).then(image => {
      if (Platform.OS == 'android') {
        image.sourceURL = image.path;
      } else {
        if (image.sourceURL == null) {
          image.sourceURL = image.path;
        }
      }
      let temp = {...image, name: 'image_' + new Date().getTime() + '.png'};
      setImage(temp);
      onChangeText(temp);

      closeActionSheet();
    });
  };
  const openGallery = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
    }).then(image => {
      if (Platform.OS == 'android') {
        image.sourceURL = image.path;
      } else {
        if (image.sourceURL == null) {
          image.sourceURL = image.path;
        }
      }
      let temp = {...image, name: image.path.split('/').pop()};
      setImage(temp);
      onChangeText(temp);
      closeActionSheet();
    });
  };

  return (
    <Modal
      animationOutTiming={1000}
      useNativeDriver={Platform.OS == 'ios' ? false : true}
      onBackdropPress={() => closeActionSheet()}
      isVisible={visible}
      style={{
        margin: 0,
        justifyContent: 'flex-end',
      }}>
      {/* <View style={[styles.container]}> */}
      {/* <TouchableOpacity
        onPress={() => setVisible(true)}
        style={[styles.input]}>
        <Image
          style={styles.imageUser}
          source={{
            uri: value ? value : image
              ? image?.sourceURL
                ? image?.sourceURL
                : image
              : 'https://legalplatform.co/uploads/blank.png',
          }}
        />
      </TouchableOpacity>
      <Text>
        To update profile picture click here it will open action sheet
      </Text> */}
      {/* <Modal
        animationOutTiming={1000}
        useNativeDriver={Platform.OS == 'ios' ? false : true}
        onBackdropPress={() => closeActionSheet()}
        isVisible={visible}
        style={{
          margin: 0,
          justifyContent: 'flex-end',
        }}> */}
      <View style={styles.modalContent}>
        {actionSheetItems.map((actionItem, index) => {
          return (
            <TouchableHighlight
              style={[
                styles.actionSheetView,
                index === 0 && {
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                },
                index === actionSheetItems.length - 2 && {
                  borderBottomLeftRadius: 12,
                  borderBottomRightRadius: 12,
                },
                index === actionSheetItems.length - 1 && {
                  borderBottomWidth: 0,
                  backgroundColor: WHITE,
                  marginTop: 8,
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                  borderBottomLeftRadius: 12,
                  borderBottomRightRadius: 12,
                },
              ]}
              underlayColor={'#f7f7f7'}
              key={index}
              onPress={actionItem.onPress}>
              <CommonText
                allowFontScaling={false}
                style={[
                  styles.actionSheetText,

                  index === actionSheetItems.length - 1 && {
                    color: '#fa1616',
                  },
                ]}
                text={actionItem.label}
              />
            </TouchableHighlight>
          );
        })}
      </View>
      {/* </Modal> */}
      {/* </View> */}
    </Modal>
  );
};

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
    modalContent: {
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
      marginLeft: 8,
      marginRight: 8,
      marginBottom: 20,
    },
    actionSheetText: {
      fontSize: 18,
      color: PRIMARY_COLOR,
    },
    actionSheetView: {
      backgroundColor: WHITE,
      display: 'flex',
      ...rowReverseRTL(_language),
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 16,
      paddingBottom: 16,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: BORDER_COLOR,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      // marginTop: 100,
    },
    imageUser: {
      width: 200,
      height: 200,
      borderRadius: 100,
    },
  });
};

export default EditPicture;
