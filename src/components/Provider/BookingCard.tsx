import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, getFontSize} from '@/utils/responsiveFn';
import CustomImage from '../common/CustomImage';
import CommonText from '../common/CommonText';
import CustomButton from '../common/CustomButton';
import {getLocalizedText, navigateTo} from '../common/commonFunction';
import {useAppSelector} from '@/Hooks/hooks';
import moment from 'moment';
import {PROVIDER_SCREENS} from '@/navigation/screenNames';

type Props = {
  item: any;
  index?: number;
  isBooking?: boolean;
  onPressButton?: () => void;
  onPress?: () => void;
};

const BookingCard = ({
  item,
  index,
  isBooking = true,
  onPressButton,
  onPress,
}: Props) => {
  const {language} = useAppSelector(state => state.auth);

  const formatBookingTime = (date: any, time: any, no_hours: any) => {
    const start = moment(
      `${moment(date).format('YYYY-MM-DD')} ${time}`,
      'YYYY-MM-DD hh:mm A',
    );
    const end = moment(start).add(Number(no_hours), 'hours');
    return `${start.format('ddd, DD MMM')} - ${time}`;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      key={index?.toString()}
      style={styles.card}>
      <View style={styles.row}>
        <CustomImage
          uri={
            item?.sub_category_id?.image ||
            'https://cdn-icons-png.flaticon.com/512/2965/2965567.png'
          }
          containerStyle={styles.image}
          imageStyle={{width: '100%', height: '100%'}}
        />
        <View style={styles.textContainer}>
          <View style={styles.titleRow}>
            <CommonText
              style={styles.title}
              text={getLocalizedText(
                item?.category_id?.title,
                item?.category_id?.title_ar,
                language,
              )}
            />
            {isBooking && (
              <CommonText style={styles.id} text={`Req-${item?.job_code}`} />
            )}
          </View>

          <CommonText
            style={styles.subtitle}
            text={getLocalizedText(
              item?.sub_category_id?.title,
              item?.sub_category_id?.title_ar,
              language,
            )}
          />

          {!isBooking && (
            <CommonText style={styles.id} text={`Req-${item?.job_code}`} />
          )}

          {isBooking && (
            <CustomButton
              title={item?.status}
              type="fill"
              btnStyle={{
                ...styles.status,
                backgroundColor:
                  item?.status === 'Active' || item?.status === 'Accepted'
                    ? Colors.provider_primary
                    : Colors._03B463,
              }}
              textStyle={styles.statusText}
            />
          )}
        </View>
      </View>

      <View style={styles.detailView}>
        <CommonText style={styles.label} text={'Address'} />
        <CommonText
          style={styles.value}
          text={
            item.location === 'Your Location'
              ? 'Your Location'
              : `${item.address?.apt_villa_no} ${item.address?.building_name}  ${item.address?.directions}`
          }
        />
      </View>
      <View style={styles.detailView}>
        <CommonText style={styles.label} text={'Date & Time'} />
        <CommonText
          style={styles.value}
          text={formatBookingTime(
            item?.date,
            item?.time,
            item?.meta_data?.no_hours,
          )}
        />
      </View>
      {isBooking && (
        <View style={styles.detailView}>
          <CommonText style={styles.label} text={'Customer'} />
          <CommonText style={styles.value} text={item.user_id?.name} />
        </View>
      )}
      {!isBooking && !item?.is_applied && (
        <CustomButton
          title={'Make an Offer'}
          type="fill"
          btnStyle={{
            ...styles.btn,
          }}
          onPress={onPressButton}
        />
      )}

      {(item?.is_applied || item?.is_change_requested) && (
        <CustomButton
          isPrimary={'provider'}
          title={item?.is_change_requested ? 'Request edit' : 'Offer Submitted'}
          btnStyle={{
            ...styles.btn,
          }}
          disabled={item?.is_change_requested}
          onPress={() => {
            navigateTo(PROVIDER_SCREENS.ProviderOfferDetails, {
              request_id: item?._id,
            });
          }}
        />
      )}
    </TouchableOpacity>
  );
};

export default BookingCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 4},
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: getFontSize(1),
  },
  image: {
    backgroundColor: Colors._E5E5E5,
    height: getFontSize(8),
    width: getFontSize(8),
    borderRadius: getFontSize(2),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  textContainer: {
    flex: 1,
    gap: 7,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    ...commonFontStyle(600, 2, Colors.black),
    flex: 1,
  },
  subtitle: {
    ...commonFontStyle(600, 1.9, Colors._898989),
  },
  id: {
    ...commonFontStyle(500, 1.7, Colors.provider_primary),
    marginTop: 4,
  },
  status: {
    height: getFontSize(3.5),
    width: getFontSize(12),
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingHorizontal: getFontSize(2),
  },
  statusText: {
    ...commonFontStyle(600, 1.5, Colors.white),
  },
  detailView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: getFontSize(2),
    gap: getFontSize(1),
  },

  label: {
    ...commonFontStyle(500, 2.2, Colors._868686),
    width: '30%',
  },
  value: {
    ...commonFontStyle(500, 2, Colors._333333),
    textAlign: 'left',
    flex: 1,
  },

  btn: {
    height: getFontSize(6),
    marginHorizontal: getFontSize(3),
    marginTop: getFontSize(2),
  },
});
