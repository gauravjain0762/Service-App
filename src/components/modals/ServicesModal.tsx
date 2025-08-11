import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {IMAGES} from '@/assets/images';
import {hp, wp} from '@/utils/responsiveFn';
import CommonText from '../common/CommonText';
import ServiceCard from '../common/ServiceCard';
import {navigateTo} from '../common/commonFunction';
import {SCREENS} from '@/navigation/screenNames';

type Props = {
  serviceName: string;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ServicesModal = ({serviceName, setIsModalVisible}: Props) => {
  return (
    <View>
      <CommonText text={serviceName} />
      <FlatList
        numColumns={3}
        contentContainerStyle={{marginTop: hp(35)}}
        columnWrapperStyle={{
          columnGap: wp(13),
          justifyContent: 'space-between',
        }}
        data={Array(6).fill('')}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          <ServiceCard
            source={item.image || IMAGES.handyman_service}
            handleCardPress={() => {
              setIsModalVisible(false);
              navigateTo(SCREENS.MyBookings);
            }}
            text={item.name || 'Handyman Services'}
            containerStyle={styles.containerStyle}
          />
        )}
      />
    </View>
  );
};

export default ServicesModal;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    marginBottom: hp(13),
  },
});
