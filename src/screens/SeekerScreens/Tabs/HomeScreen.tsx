import React, {useEffect, useState} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
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
import {useAppDispatch, useAppSelector} from '@/Hooks/hooks';
import {useGetProfileQuery} from '@/api/Seeker/profileApi';
import {
  useGetDashboardQuery,
  useLazyGetSubCategoriesQuery,
} from '@/api/Seeker/homeApi';
import HomeSkeleton from '@/components/skeleton/HomeSkeleton';
import CategoryList from '@/components/Seeker/CategoryList';
import CustomImage from '@/components/common/CustomImage';
import {setGuestUserModal, setUserLocation} from '@/features/authSlice';
import {requestLocationPermission} from '@/Hooks/locationHandler';
import {rowReverseRTL, textRTL} from '@/utils/arabicStyles';

const HomeScreen = () => {
  const {params} = useRoute<any>();
  const {userInfo, dashboard, guestUser, language} = useAppSelector(
    state => state.auth,
  );
  const dispatch = useAppDispatch();
  const [selectedCatId, setSelectedCatId] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const styles = React.useMemo(() => getGlobalStyles(language), [language]);
  const {refetch: profileRefetch} = useGetProfileQuery({}); // profile api

  const {isLoading, refetch} = useGetDashboardQuery({}); // dashboard api

  const [
    subCatTrigger,
    {data: subCategories, isLoading: isSubCatLoading, isFetching},
  ] = useLazyGetSubCategoriesQuery();

  const openReviewModal = params?.openReviewModal;

  const [isReviewModalVisible, setIsReviewModalVisible] =
    useState<boolean>(false);

  useEffect(() => {
    if (selectedCatId !== '') {
      subCatTrigger({
        categories: selectedCatId,
      });
      setSelectedCatId('');
    }
  }, [selectedCatId, subCatTrigger]);

  useEffect(() => {
    getCurrentLocation();
  }, []);
  console.log(selectedCatId, 'selectedCatId');

  const getCurrentLocation = async () => {
    await requestLocationPermission(
      true,
      position => {
        let dataTemp = {
          latitude: position?.latitude,
          longitude: position?.longitude,
          latitudeDelta: position?.latitudeDelta,
          longitudeDelta: position?.longitudeDelta,
        };
        dispatch(setUserLocation(dataTemp));
      },
      (error: any) => {
        console.log('requestLocationPermission => error => ', error);
      },
    );
  };

  useEffect(() => {
    if (openReviewModal) {
      setIsReviewModalVisible(true);
    }
  }, [openReviewModal]);

  const closeModal = () => {
    setIsReviewModalVisible(false);
  };
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refetch();
    profileRefetch();
    setRefreshing(false);
  }, [refetch]);
  return (
    <SafeareaProvider style={styles.safeArea}>
      <View style={styles.topSection}>
        <View style={styles.greetingContainer}>
          <CommonText
            text={'Hey, ' + `${guestUser ? 'Guest User' : userInfo?.name}`}
            style={styles.topLabel}
          />
          <CommonText
            style={styles.topLabel1}
            text={'Whats service do you need?'}
          />
        </View>

        <CustomImage
          source={IMAGES.bell}
          size={hp(20)}
          containerStyle={styles.bellContainer}
          onPress={() => {
            guestUser
              ? dispatch(setGuestUserModal(true))
              : navigateTo(SCREENS.Notifications);
          }}
        />
      </View>
      {isLoading ? (
        <HomeSkeleton isBanner />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[Colors.seeker_primary]}
              tintColor={Colors.seeker_primary}
            />
          }
          showsVerticalScrollIndicator={false}>
          <View style={styles.searchContainer}>
            <CustomTextInput
              onPress={() => navigateTo(SEEKER_SCREENS.SearchScreen)}
              placeholder="Search by Services or Category"
              leftIcon={<CustomImage source={IMAGES.search} size={wp(30)} />}
              editable={false}
            />
          </View>
          {dashboard && dashboard?.banners?.length > 0 && (
            <MiniCarousel data={dashboard?.banners ?? []} />
          )}
          <CategoryList
            data={dashboard?.categories ?? []}
            onPress={item => {
              {
                guestUser
                  ? dispatch(setGuestUserModal(true))
                  : setIsModalVisible(true);
                // setServiceName(item?.title);
                setSelectedCatId(item?._id);
                setSelectedCategory(item);
              }
            }}
          />
        </ScrollView>
      )}
      <ServicesModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        selectedCategory={selectedCategory}
        subCategories={subCategories?.data?.sub_categories ?? []}
        isSubCatLoading={isSubCatLoading || isFetching}
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

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
    safeArea: {
      paddingHorizontal: wp(15),
      backgroundColor: Colors.white,
    },
    topSection: {
      marginTop: hp(10),
      ...rowReverseRTL(_language),
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: hp(10),
    },
    greetingContainer: {
      gap: hp(4),
    },
    topLabel: {
      ...commonFontStyle(600, 1.8, Colors.seeker_primary),
      ...textRTL(_language),
    },
    topLabel1: {
      ...commonFontStyle(400, 1.6, Colors.black),
      ...textRTL(_language),
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
  });
};
