import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import {commonFontStyle, getFontSize, hp, wp} from '@/utils/responsiveFn';
import {Colors} from '@/constants/Colors';
import BackHeader from '@/components/common/BackHeader';
import RequestCard from '@/components/common/RequestCard';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import OfferCard from '@/components/common/OfferCard';
import {
  getLocalizedText,
  goBack,
  navigateTo,
  resetNavigation,
} from '@/components/common/commonFunction';
import {SEEKER_SCREENS} from '@/navigation/screenNames';
import {useRoute} from '@react-navigation/native';
import {useAppSelector} from '@/Hooks/hooks';
import {useGetRequestsDetailsQuery} from '@/api/Seeker/homeApi';
import CommonText from '@/components/common/CommonText';
import JobDetailsSkeleton from '@/components/skeleton/JobDetailsSkeleton';
import RequestEditServiceModal from '@/components/modals/RequestEditServiceModal';

const Offers = () => {
  const {params} = useRoute<any>();
  const isResetNav = params?.isResetNav;
  const request_id = params?.request_id;
  const [isEditRequest, setIsEditRequest] = useState(false);
  const [isModalId, setIsModalId] = useState<any>(null);

  const {language} = useAppSelector(state => state.auth);

  const {
    data: requestData,
    isLoading: requestLoading,
    refetch: refetchRequestList,
  } = useGetRequestsDetailsQuery<any>(
    {
      request_id: request_id,
    },
    {
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    },
  );
  const requestDetails = requestData?.data?.job;
  const requestDetailsOffers = requestData?.data?.offers;

  return (
    <SafeareaProvider style={styles.safeArea}>
      {requestLoading ? (
        <JobDetailsSkeleton />
      ) : (
        <>
          <View style={styles.topContainer}>
            <BackHeader
              text={'Request Offer'}
              onPressBack={() => {
                if (isResetNav) {
                  resetNavigation(
                    SEEKER_SCREENS.SeekerTabNavigation,
                    SEEKER_SCREENS.Home,
                  );
                } else {
                  goBack();
                }
              }}
            />

            <RequestCard
              style={styles.requestCard}
              text1={getLocalizedText(
                requestDetails?.category_id?.title,
                requestDetails?.category_id?.title_ar,
                language,
              )}
              imageSource={requestDetails?.category_id?.image}
              titleStyle={styles.titleStyle}
              text2={getLocalizedText(
                requestDetails?.sub_category_id?.title,
                requestDetails?.sub_category_id?.title_ar,
                language,
              )}
              subtitleStyle={styles.subtitleStyle}
            />
          </View>

          <View style={styles.offersContainer}>
            <FlatList
              data={requestDetailsOffers}
              renderItem={({item, index}: any) => {
                return (
                  <OfferCard
                    item={item}
                    index={index}
                    onPressOffer={() => {}}
                    onCardPress={() => {
                      navigateTo(SEEKER_SCREENS.OffersDetail, {
                        requestDetails: requestDetails,
                        offerDetail: item,
                        offerIndex: index + 1,
                      });
                    }}
                    onPressAcceptOffer={() => {
                      navigateTo(SEEKER_SCREENS.OfferSummary, {
                        offer_id: item?._id,
                        requestDetails: requestDetails,
                      });
                    }}
                    onPressEdit={() => {
                      setIsModalId(item);
                      setIsEditRequest(true);
                    }}
                  />
                );
              }}
              keyExtractor={(item: any) => item?._id?.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{flexGrow: 1, gap: getFontSize(1.3)}}
              ListEmptyComponent={
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <CommonText
                    text={'There are no Offers yet'}
                    style={[styles.titleStyle, {textAlign: 'center'}]}
                  />
                </View>
              }
            />
          </View>
          {isEditRequest && (
            <RequestEditServiceModal
              onClose={() => {
                setIsEditRequest(false);
              }}
              visible={isEditRequest}
              offer_id={isModalId?._id}
            />
          )}
        </>
      )}
    </SafeareaProvider>
  );
};

export default Offers;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  topContainer: {
    paddingHorizontal: wp(24),
  },
  requestCard: {
    marginVertical: hp(27),
    backgroundColor: Colors.white,
    elevation: 5,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  titleStyle: {
    ...commonFontStyle(600, 2.1, Colors.black),
  },
  subtitleStyle: {
    ...commonFontStyle(600, 1.9, Colors._898989),
  },
  offersContainer: {
    flex: 1,
    paddingVertical: hp(20),
    paddingHorizontal: wp(20),
    backgroundColor: Colors._f4f4f5,
  },
});
