import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';

import {Colors} from '@/constants/Colors';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import CommonText from '@/components/common/CommonText';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import {IMAGES} from '@/assets/images';
import CustomTextInput from '@/components/common/CustomTextInput';
import {navigateTo} from '@/components/common/commonFunction';
import {SCREENS, SEEKER_SCREENS} from '@/navigation/screenNames';
import ServicesModal from '@/components/modals/ServicesModal';
import {useRoute} from '@react-navigation/native';
import ReviewModal from '@/components/common/ReviewModel';
import MiniCarousel from '@/components/common/MiniCarousel';
import {useAppSelector} from '@/Hooks/hooks';
import {useGetProfileQuery} from '@/api/Seeker/profileApi';
import {
  useGetDashboardQuery,
  useLazyGetSubCategoriesQuery,
} from '@/api/Seeker/homeApi';
import HomeSkeleton from '@/components/skeleton/HomeSkeleton';
import CategoryList from '@/components/Seeker/CategoryList';
import CustomImage from '@/components/common/CustomImage';

const HomeScreen = () => {
  const {params} = useRoute<any>();
  const {userInfo, dashboard} = useAppSelector(state => state.auth);

  const [selectedSubCatId, setSelectedSubCatId] = useState<string>('');
  const {} = useGetProfileQuery({}); // profile api

  const {isLoading} = useGetDashboardQuery({}); // dashboard api

  const [subCatTrigger, {data: subCategories, isLoading: isSubCatLoading}] =
    useLazyGetSubCategoriesQuery();

  const openReviewModal = params?.openReviewModal;

  const [isReviewModalVisible, setIsReviewModalVisible] =
    useState<boolean>(false);

  useEffect(() => {
    if (selectedSubCatId !== '') {
      subCatTrigger({
        category_id: selectedSubCatId,
      });
      setSelectedSubCatId('');
    }
  }, [selectedSubCatId, subCatTrigger]);

  useEffect(() => {
    if (openReviewModal) {
      setIsReviewModalVisible(true);
    }
  }, [openReviewModal]);

  const [serviceName, setServiceName] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModal = () => {
    setIsReviewModalVisible(false);
  };

  return (
    <SafeareaProvider style={styles.safeArea}>
      <View style={styles.topSection}>
        <View style={styles.greetingContainer}>
          <CommonText text={'Hey, ' + userInfo?.name} style={styles.topLabel} />
          <CommonText
            style={styles.topLabel1}
            text={'Whats service do you need?'}
          />
        </View>

        <CustomImage
          source={IMAGES.bell}
          size={hp(20)}
          containerStyle={styles.bellContainer}
          onPress={() => navigateTo(SCREENS.Notifications)}
        />
      </View>

      <View style={styles.searchContainer}>
        <CustomTextInput
          onPress={() => navigateTo(SEEKER_SCREENS.SearchScreen)}
          placeholder="Search by Services or Category"
          leftIcon={
            <Image source={IMAGES.search} style={styles.searchImages} />
          }
        />
      </View>
      {isLoading ? (
        <HomeSkeleton isBanner />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <MiniCarousel data={dashboard?.banners ?? []} />
          <CategoryList
            data={dashboard?.categories ?? []}
            onPress={item => {
              setIsModalVisible(true);
              setServiceName(item?.title);
              setSelectedSubCatId(item?._id);
            }}
          />
        </ScrollView>
      )}

      <ServicesModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        serviceName={serviceName}
        subCategories={subCategories?.data?.sub_categories ?? []}
        isSubCatLoading={isSubCatLoading}
      />

      <ReviewModal
        visible={isReviewModalVisible}
        onClose={closeModal}
        onSubmit={closeModal}
      />
    </SafeareaProvider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    paddingHorizontal: wp(15),
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

  searchContainer: {
    marginVertical: hp(24),
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
