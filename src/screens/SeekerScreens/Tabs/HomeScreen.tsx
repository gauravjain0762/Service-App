import React, {useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
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
import RequestCard from '@/components/common/RequestCard';
import {navigateTo} from '@/components/common/commonFunction';
import {SCREENS} from '@/navigation/screenNames';

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
  const [serviceName, setServiceName] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false);

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
        <View style={styles.bellContainer}>
          <Image source={IMAGES.bell} style={styles.bellIcon} />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <CustomTextInput
          placeholder="Search by Services or Category"
          leftIcon={
            <Image source={IMAGES.search} style={styles.searchImages} />
          }
          rightIcon={
            <Image
              source={IMAGES.sort}
              style={styles.searchImages}
              tintColor={Colors.seeker_primary}
            />
          }
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bannerContainer}>
          <View style={styles.bannerTextContainer}>
            <CommonText
              text={'Cleaning & Sanitation'}
              style={styles.bannerTitle}
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
        style={{paddingTop: hp(40)}}
        visible={isModalVisible}
        onPressCancel={() => {
          setIsModalVisible(false);
        }}
        onClose={() => {
          setIsModalVisible(false);
        }}>
        <View>
          <CommonText text={serviceName} />
          <FlatList
            numColumns={3}
            contentContainerStyle={{marginTop: hp(40)}}
            data={Array(6).fill('')}
            renderItem={({item, index}) => {
              return (
                <ServiceCard
                  source={item.image || IMAGES.handyman_service}
                  handleCardPress={() => {
                    console.log('object');
                    setIsModalVisible(false);
                    setTimeout(() => {
                      setIsSubmitModalVisible(true);
                    }, 500);
                  }}
                  text={item.name || 'Handyman Services'}
                  containerStyle={{marginRight: wp(10), marginBottom: hp(30)}}
                />
              );
            }}
          />
        </View>
      </BottomModal>
      <BottomModal
        style={{paddingTop: hp(40)}}
        visible={isSubmitModalVisible}
        onPressCancel={() => {
          setIsSubmitModalVisible(false);
        }}
        onClose={() => {
          setIsSubmitModalVisible(false);
        }}>
        <View style={styles.submitModalContainer}>
          <CommonText text={'Request Submitted'} style={styles.submitTitle} />

          <View style={styles.submitDashedCircle}>
            <View style={styles.submitInnerCircle}>
              <Image source={IMAGES.right} style={styles.rightIcon} />
            </View>
          </View>

          <CommonText
            style={styles.submitText}
            text={'Your request has been Submitted wait for the offers!'}
          />

          <View style={styles.referenceRow}>
            <CommonText
              text={'Reference Code:'}
              style={styles.referenceLabel}
            />
            <CommonText text={'#D-698321'} style={styles.referenceValue} />
          </View>

          <RequestCard
            handleCardPress={() => {
              setIsSubmitModalVisible(false);
              navigateTo(SCREENS.MyBookings);
            }}
            style={styles.requestCardMargin}
          />
        </View>
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
  submitModalContainer: {
    alignItems: 'center',
  },
  submitTitle: {
    ...commonFontStyle(700, 2.3, Colors.black),
  },
  submitDashedCircle: {
    width: wp(120),
    height: hp(120),
    borderWidth: hp(1),
    alignItems: 'center',
    borderStyle: 'dashed',
    borderRadius: hp(120),
    marginVertical: hp(24),
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderColor: Colors.seeker_primary,
  },
  submitInnerCircle: {
    width: wp(102),
    height: hp(102),
    alignItems: 'center',
    borderRadius: hp(120),
    justifyContent: 'center',
    backgroundColor: Colors.seeker_primary,
  },
  rightIcon: {
    height: '50%',
    width: '50%',
  },
  submitText: {
    textAlign: 'center',
    ...commonFontStyle(500, 2.2, Colors.black),
  },
  referenceRow: {
    marginTop: hp(11),
    flexDirection: 'row',
    alignItems: 'center',
  },
  referenceLabel: {
    ...commonFontStyle(400, 1.9, Colors._868686),
  },
  referenceValue: {
    ...commonFontStyle(400, 1.9, Colors.black),
  },
  requestCardMargin: {
    marginVertical: hp(25),
  },
});
