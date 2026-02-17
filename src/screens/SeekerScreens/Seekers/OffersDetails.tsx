import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import BackHeader from '@/components/common/BackHeader';
import RequestCard from '@/components/common/RequestCard';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, getFontSize, hp, wp} from '@/utils/responsiveFn';
import CommonText from '@/components/common/CommonText';
import Divider from '@/components/common/Divider';
import {IMAGES} from '@/assets/images';
import CustomButton from '@/components/common/CustomButton';
import {
  formatPriceIN,
  getLocalizedText,
  navigateTo,
} from '@/components/common/commonFunction';
import {useAppSelector} from '@/Hooks/hooks';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import AttachmentCard from '@/components/common/AttachmentCard';
import RequestEditServiceModal from '@/components/modals/RequestEditServiceModal';
import {SEEKER_SCREENS} from '@/navigation/screenNames';
import {rowReverseRTL, textRTL} from '@/utils/arabicStyles';
import StepTracker from '@/components/common/StepTracker';

const OffersDetails = () => {
  const {
    params: {requestDetails, offerDetail, isRequestDetails},
  } = useRoute<any>();
  const {language} = useAppSelector(state => state.auth);
  const styles = React.useMemo(() => getGlobalStyles(language), [language]);
  const [isEditRequest, setIsEditRequest] = useState(false);
  const start = moment(
    `${moment(offerDetail?.date).format('YYYY-MM-DD')} ${offerDetail?.time}`,
    'YYYY-MM-DD hh:mm A',
  );
  console.log(requestDetails, 'offerDetail', offerDetail);

  const subCategory = offerDetail?.company_id?.sub_categories || [
    requestDetails?.sub_category_id,
  ];

  const formatKey = key =>
    key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <SafeareaProvider style={[styles.safeArea]}>
      <View style={styles.topContainer}>
        <BackHeader
          text={isRequestDetails ? 'Request Detail' : 'Offers Detail'}
          rightIcon={
            isRequestDetails ? (
              <></>
            ) : (
              <View style={styles.rightIcon}>
                <CommonText text={'Offer'} style={styles.offerLabel} />
              </View>
            )
          }
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
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
          bookingId={requestDetails?.job_code}
          subtitleStyle={styles.subtitleStyle}
        />

        <Divider />

        {requestDetails?.statuses?.length > 0 && (
          <StepTracker trackingData={requestDetails?.statuses} />
        )}
        <View style={styles.titleRow}>
          {(offerDetail?.company_id?.category_id?.title ||
            requestDetails?.category_id?.title) && (
            <CommonText
              text={
                offerDetail?.company_id?.category_id?.title ||
                requestDetails?.category_id?.title
              }
              style={styles.titleText}
            />
          )}
          {offerDetail?.company_id?.avg_rating && (
            <View style={styles.ratingRow}>
              <Image source={IMAGES.star} />
              <CommonText
                text={offerDetail?.company_id?.avg_rating?.toString()}
                style={styles.ratingText}
              />
            </View>
          )}
        </View>

        <View style={styles.referenceRow}>
          <CommonText text={'Reference Id: '} style={styles.refLabel} />
          <CommonText text={requestDetails?.job_code} style={styles.refValue} />
        </View>
        {requestDetails &&
          Object.entries(requestDetails?.meta_data)
            .filter(([key]) => key !== '') // remove empty key if you want
            .map(([key, value]) => (
              <View style={styles.referenceRow} key={key}>
                <CommonText
                  text={`${formatKey(key)}: `}
                  style={styles.refLabel}
                />
                <CommonText text={String(value)} style={styles.refValue} />
              </View>
            ))}

        <View style={styles.featuresRow}>
          {subCategory &&
            subCategory.map((item: any, index: any) => (
              <View
                key={index}
                style={[
                  styles.featureBadge,
                  index !== 2 && styles.featureSpacing,
                ]}>
                <CommonText text={item?.title} style={styles.featureText} />
              </View>
            ))}
        </View>
        <Divider />

        <View style={styles.bookingContainer}>
          <View style={styles.bookingRow}>
            <CommonText text={'Booking Date'} style={styles.bookingLabel} />
            <CommonText
              text={`${start.format('ddd, DD MMM')}`}
              style={styles.bookingValue}
            />
          </View>
          <View style={styles.bookingRow}>
            <CommonText text={'Booking Time'} style={styles.bookingLabel} />
            <CommonText
              text={offerDetail?.time || requestDetails?.time}
              style={styles.bookingValue}
            />
          </View>
        </View>
        {requestDetails?.media_files?.length > 0 && (
          <AttachmentCard
            requestImages={requestDetails?.media_files}
            title="Attachments"
          />
        )}
        {offerDetail?.media_files?.length > 0 && (
          <AttachmentCard
            requestImages={offerDetail?.media_files}
            title="Attachments"
          />
        )}
        {requestDetails?.notes && (
          <View
            style={{marginVertical: getFontSize(1.5), gap: getFontSize(0.8)}}>
            <CommonText
              text={`Additional Note:-`}
              style={[
                styles.description,
                {...commonFontStyle(600, 1.6, Colors.black)},
              ]}
            />
            <CommonText
              text={` ${requestDetails?.notes}`}
              style={styles.description}
            />
          </View>
        )}
        {offerDetail?.notes && (
          <View
            style={{marginVertical: getFontSize(1.5), gap: getFontSize(0.8)}}>
            <CommonText
              text={`Additional Note:-`}
              style={[
                styles.description,
                {...commonFontStyle(600, 1.6, Colors._676767)},
              ]}
            />
            <CommonText
              text={` ${offerDetail?.notes}`}
              style={styles.description}
            />
          </View>
        )}
        {offerDetail?.request_change?.note && (
          <View
            style={{marginVertical: getFontSize(1.5), gap: getFontSize(0.8)}}>
            <CommonText
              text={`Change Request Note:-`}
              style={[
                styles.description,
                {...commonFontStyle(600, 1.6, Colors._676767)},
              ]}
            />
            <CommonText
              text={`${offerDetail?.request_change?.note}`}
              style={styles.description}
            />
          </View>
        )}
        {isEditRequest && (
          <RequestEditServiceModal
            onClose={() => {
              setIsEditRequest(false);
            }}
            visible={isEditRequest}
            offer_id={offerDetail?._id}
          />
        )}
        {!isRequestDetails && !offerDetail?.request_change?.requested && (
          <CustomButton
            isPrimary="seeker"
            title={'Request To Edit Service'}
            type="outline"
            btnStyle={{
              borderColor: Colors.black,
              margin: 0,
              marginTop: getFontSize(1.5),
            }}
            style={{margin: 0}}
            textStyle={{color: Colors.black}}
            onPress={() => {
              setIsEditRequest(true);
            }}
          />
        )}
      </ScrollView>
      {!isRequestDetails && (
        <View style={styles.bottomRow}>
          {!offerDetail?.request_change?.requested ? (
            <CustomButton
              title={'Accept Offer'}
              btnStyle={styles.acceptBtn}
              textStyle={styles.acceptText}
              onPress={() => {
                navigateTo(SEEKER_SCREENS.OfferSummary, {
                  offer_id: offerDetail?._id,
                  requestDetails: requestDetails,
                });
              }}
            />
          ) : (
            <CustomButton
              title={'Change Requested'}
              btnStyle={styles.acceptBtn}
              textStyle={styles.acceptText}
              disabled
            />
          )}
          <View style={styles.priceRow}>
            <Image source={IMAGES.currency} style={styles.currencyIcon} />
            <CommonText
              text={formatPriceIN(offerDetail?.offer_price)}
              style={styles.priceText}
            />
          </View>
        </View>
      )}
    </SafeareaProvider>
  );
};

export default OffersDetails;

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: Colors.white,
    },
    topContainer: {
      paddingHorizontal: wp(24),
    },
    scrollContainer: {
      paddingBottom: '15%',
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
      ...textRTL(_language),
    },
    subtitleStyle: {
      ...commonFontStyle(600, 1.9, Colors._898989),
      ...textRTL(_language),
    },
    rightIcon: {
      borderRadius: hp(50),
      paddingVertical: hp(10),
      paddingHorizontal: wp(16),
      backgroundColor: Colors.black,
    },
    offerLabel: {
      ...commonFontStyle(600, 1.3, Colors.white),
      ...textRTL(_language),
    },
    titleRow: {
      gap: wp(40),
      marginTop: hp(35),
      ...rowReverseRTL(_language),
      alignItems: 'center',
    },
    titleText: {
      ...commonFontStyle(500, 2.2, Colors.black),
      ...textRTL(_language),
    },
    ratingRow: {
      gap: wp(5),
      ...rowReverseRTL(_language),
      alignItems: 'center',
    },
    ratingText: {
      ...commonFontStyle(500, 2, Colors.black),
      ...textRTL(_language),
    },
    referenceRow: {
      ...rowReverseRTL(_language),
      alignItems: 'center',
      marginTop: hp(11),
    },
    refLabel: {
      ...commonFontStyle(400, 1.9, Colors._868686),
    },
    refValue: {
      ...commonFontStyle(400, 1.9, Colors.black),
    },
    featuresRow: {
      ...rowReverseRTL(_language),
      alignItems: 'center',
      marginVertical: hp(20),
      flexWrap: 'wrap',
      gap: wp(10),
    },
    featureBadge: {
      borderRadius: hp(50),
      paddingVertical: hp(10),
      paddingHorizontal: wp(18),
      backgroundColor: Colors._F5F5F5,
    },
    featureSpacing: {
      marginRight: wp(10),
    },
    featureText: {
      ...commonFontStyle(500, 1.3, Colors.black),
    },
    description: {
      // marginVertical: hp(20),
      ...commonFontStyle(400, 1.6, Colors._676767),
      ...textRTL(_language),
    },
    bookingContainer: {
      marginVertical: hp(27),
      gap: hp(22),
    },
    bookingRow: {
      ...rowReverseRTL(_language),
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    bookingLabel: {
      ...commonFontStyle(400, 1.9, Colors._5E5E5E),
    },
    bookingValue: {
      ...commonFontStyle(700, 1.9, Colors._2C2C2C),
    },
    shadowCard: {
      width: '100%',
      alignItems: 'flex-start',
      paddingHorizontal: wp(17),
      paddingVertical: hp(20),
    },
    watchTitle: {
      paddingBottom: hp(17),
      ...commonFontStyle(600, 1.7, Colors._202020),
    },
    imageRow: {
      gap: wp(12),
      ...rowReverseRTL(_language),
      justifyContent: 'space-between',
    },
    imageBox: {
      width: '48%',
      height: hp(100),
      borderRadius: hp(10),
    },
    bottomRow: {
      width: '100%',
      // marginTop: hp(45),
      ...rowReverseRTL(_language),
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'absolute',
      backgroundColor: Colors.white,
      bottom: 0,
      alignSelf: 'center',
      paddingHorizontal: wp(24),
      paddingVertical: hp(5),
    },
    acceptBtn: {
      height: hp(50),
      paddingHorizontal: wp(27),
      backgroundColor: Colors.seeker_primary,
      minWidth: '30%',
    },
    acceptText: {
      ...commonFontStyle(600, 1.7, Colors.white),
    },
    priceRow: {
      ...rowReverseRTL(_language),
      alignItems: 'center',
      gap: wp(7),
    },
    currencyIcon: {
      height: hp(30),
      width: wp(30),
    },
    priceText: {
      ...commonFontStyle(700, 3.7, Colors.black),
    },
    secondImageWrapper: {
      position: 'relative',
      width: '48%',
      height: hp(100),
    },
    blurredImage: {
      width: '100%',
      height: '100%',
      borderRadius: hp(10),
    },
    overlay: {
      borderRadius: hp(10),
      alignItems: 'center',
      justifyContent: 'center',
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    overlayText: {
      ...commonFontStyle(700, 2.5, Colors.white),
    },
  });
};
