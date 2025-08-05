import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {Colors} from '@/constants/Colors';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import CommonText from '@/components/common/CommonText';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import {IMAGES} from '@/assets/images';
import CustomTextInput from '@/components/common/CustomTextInput';
import ServiceCard from '@/components/common/ServiceCard';
import BottomModal from '@/components/common/BottomModal';
import {navigateTo} from '@/components/common/commonFunction';
import {SCREENS, SEEKER_SCREENS} from '@/navigation/screenNames';
import ServicesModal from '@/components/modals/ServicesModal';
import {useRoute} from '@react-navigation/native';
import ReviewModal from '@/components/common/ReviewModel';

const services = [
  {
    name: 'Home Service',
    image: IMAGES.home_service,
  },
  {
    name: 'Cleaning Sanitation',
    image: IMAGES.cleaning_sanitation,
  },
  {
    name: 'Repair Maintenance',
    image: IMAGES.repair_maintenance,
  },
  {
    name: 'Construction Renovation',
    image: IMAGES.construction_renovation,
  },
  {
    name: 'Car Services',
    image: IMAGES.car_services,
  },
  {
    name: 'Business Services',
    image: IMAGES.business_services,
  },
  {
    name: 'Pet Services',
    image: IMAGES.pet_services,
  },
  {
    name: 'Lifestyle Events',
    image: IMAGES.lifestyle_events,
  },
  {
    name: 'Buildings Services',
    image: IMAGES.buildings_services,
  },
];

const HomeScreen = () => {
  const {params} = useRoute();
  // const {openReviewModal} = params as {
  //   openReviewModal: boolean;
  // };

  // const [isReviewModalVisible, setIsReviewModalVisible] =
  //   useState<boolean>(false);

  // useEffect(() => {
  //   if (openReviewModal) {
  //     setIsReviewModalVisible(true);
  //   }
  // }, []);

  const [serviceName, setServiceName] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false);
  const [isSubmitReviewModalVisible, setIsSubmitReviewModalVisible] = useState(false)

  const openModal = () => {
    setIsSubmitReviewModalVisible(true);
  }

  const closeModal = () => {
    setIsSubmitReviewModalVisible(false);
  }

  return (
    <SafeareaProvider style={styles.safeArea}>
      <View style={styles.topSection}>
        <View style={styles.greetingContainer}>
          <CommonText text={'Hey, Thomas'} style={styles.topLabel} />
          <CommonText
            style={styles.topLabel1}
            text={'Whats service do you need?'}
          />
        </View>
        <Pressable
          onPress={() => navigateTo(SCREENS.Notifications)}
          style={styles.bellContainer}>
          <Image source={IMAGES.bell} style={styles.bellIcon} />
        </Pressable>
      </View>

      <View style={styles.searchContainer}>
        <CustomTextInput
        onPress={() => navigateTo(SEEKER_SCREENS.SearchScreen)}
          placeholder="Search by Services or Category"
          leftIcon={
            <Image source={IMAGES.search} style={styles.searchImages} />
          }
          // rightIcon={
          //   <Image
          //     source={IMAGES.sort}
          //     style={styles.searchImages}
          //     tintColor={Colors.seeker_primary}
          //   />
          // }
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bannerContainer}>
          <View style={styles.bannerTextContainer}>
            <ReviewModal
              visible={isSubmitReviewModalVisible}
              onClose={closeModal}
            />
            <CommonText
              text={'Cleaning & Sanitation'}
              style={styles.bannerTitle}
              onPress={openModal}
            />
            <CommonText
              text={'Basic Home Cleaning Kitchen/Bathroom Cleaning'}
              style={styles.bannerSubtitle}
            />
          </View>
          <Image source={IMAGES.cleaning_basket} style={styles.bannerImage} />
        </View>

        <FlatList
          numColumns={3}
          data={services}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{marginTop: hp(30), paddingBottom: '20%'}}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => {
            return (
              <ServiceCard
                text={item.name}
                source={item.image}
                handleCardPress={() => {
                  setIsModalVisible(true);
                  setServiceName(item?.name);
                }}
                containerStyle={{marginRight: wp(10), marginBottom: hp(30)}}
              />
            );
          }}
        />
      </ScrollView>
      <BottomModal
        close
        style={{paddingTop: hp(40)}}
        visible={isModalVisible}
        onPressCancel={() => {
          setIsModalVisible(false);
        }}
        onClose={() => {
          setIsModalVisible(false);
        }}>
        <ServicesModal
          serviceName={serviceName}
          setIsModalVisible={setIsModalVisible}
        />
      </BottomModal>
    </SafeareaProvider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    paddingHorizontal: wp(24),
    backgroundColor: Colors.white,
  },
  topSection: {
    marginTop: hp(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greetingContainer: {
    gap: hp(4),
  },
  topLabel: {
    ...commonFontStyle(600, 1.8, Colors.seeker_primary),
  },
  topLabel1: {
    ...commonFontStyle(400, 1.6, Colors.black),
  },
  bellContainer: {
    width: wp(37),
    height: hp(37),
    borderRadius: hp(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors._F6F6F6,
  },
  bellIcon: {
    height: hp(20),
    width: wp(20),
  },
  searchContainer: {
    marginVertical: hp(23),
  },
  searchImages: {
    width: wp(30),
    height: hp(30),
  },
  bannerContainer: {
    height: hp(135),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: hp(20),
    paddingVertical: hp(22),
    paddingHorizontal: wp(25),
    justifyContent: 'space-between',
    backgroundColor: Colors.seeker_primary,
  },
  bannerTextContainer: {
    gap: hp(9),
    width: '60%',
  },
  bannerTitle: {
    ...commonFontStyle(700, 2.5, Colors.white),
  },
  bannerSubtitle: {
    ...commonFontStyle(400, 1.5, Colors.white),
  },
  bannerImage: {
    width: wp(130),
    height: hp(130),
  },
});
