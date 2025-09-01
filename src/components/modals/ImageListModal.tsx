import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import CommonText from '../common/CommonText';
import ServiceCard from '../common/ServiceCard';
import {navigateTo} from '../common/commonFunction';
import {SCREENS} from '@/navigation/screenNames';
import {Colors} from '@/constants/Colors';
import HomeSkeleton from '../skeleton/HomeSkeleton';
import BottomModal from '../common/BottomModal';
import CustomImage from '../common/CustomImage';
import {IMAGES} from '@/assets/images';

type Props = {
  visible: boolean;
  onClose?: () => void;
  requestImages?: any;
};

const ImageListModal = ({
  onClose = () => {},
  visible,
  requestImages,
}: Props) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsModalVisible(visible);
  }, [visible]);

  const handleClose = () => {
    onClose();
    setIsModalVisible(false);
  };
  const isSubCatLoading = false;
  return (
    <BottomModal
      close
      style={{paddingTop: hp(30), maxHeight: '85%'}}
      visible={isModalVisible}
      onPressCancel={handleClose}
      onClose={handleClose}>
      {/* <CommonText text={selectedCategory?.title || ''} /> */}
      {isSubCatLoading ? (
        <HomeSkeleton list={6} />
      ) : (
        <FlatList
          numColumns={3}
          contentContainerStyle={{marginTop: hp(35)}}
          columnWrapperStyle={styles.columnWrapper}
          data={requestImages}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => {
            if (item.isEmpty) {
              return <View style={styles.emptySlot} />;
            }
            return (
              <CustomImage
                onPress={() => {
                  item?.type != 'image'
                    ? navigateTo(SCREENS.WebViewScreen, {
                        url: item?.file,
                        title: item?.name,
                      })
                    : {};
                }}
                source={
                  item?.type != 'image'
                    ? IMAGES.pdfIcon
                    : {uri: requestImages && item?.file}
                }
                containerStyle={styles.imageBox}
                imageStyle={{width: '100%', height: '100%'}}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <CommonText text={'No Service Found'} style={styles.emptyText} />
          }
        />
      )}
    </BottomModal>
  );
};

export default ImageListModal;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    marginBottom: hp(13),
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: hp(20),
    ...commonFontStyle(700, 2.5, Colors.black),
  },
  columnWrapper: {
    columnGap: wp(13),
    justifyContent: 'flex-start',
    paddingHorizontal: 0,
  },
  emptySlot: {
    flex: 1,
    marginBottom: hp(13),
  },
  imageBox: {
    width: '48%',
    height: hp(100),
    borderRadius: hp(10),
    resizeMode: 'contain',
    overflow: 'hidden',
  },
});
