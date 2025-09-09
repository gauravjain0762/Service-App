import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {GeneralStyle} from '@/constants/GeneralStyle';
import BackHeader from '@/components/common/BackHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import UploadBox from '@/components/common/UploadBox';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import CommonText from '@/components/common/CommonText';
import {Colors} from '@/constants/Colors';
import AddSpecialNote from '@/components/common/AddSpecialNote';
import CustomDates from '@/components/common/CustomDates';
import TimeSlots from '@/components/common/TimeSlots';
import TermsCheckBox from '@/components/common/TermsCheckBox';
import CustomButton from '@/components/common/CustomButton';
import BottomModal from '@/components/common/BottomModal';
import {
  errorToast,
  getLocalizedText,
  resetNavigation,
} from '@/components/common/commonFunction';
import {PROVIDER_SCREENS, SCREENS} from '@/navigation/screenNames';
import RequestSubmitModal from '@/components/modals/RequestSubmitModal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useRoute} from '@react-navigation/native';
import {
  useModifyOfferMutation,
  useSendOfferMutation,
} from '@/api/Provider/homeApi';
import {useAppSelector} from '@/Hooks/hooks';
import moment from 'moment';

const MakeOffer = () => {
  const {
    params: {requestDetails, myOffer},
  } = useRoute<any>();
  const {language} = useAppSelector(state => state.auth);
  const [sendOffer, {isLoading}] = useSendOfferMutation();
  const [modifyOffer, {isLoading: isModifyOfferLoading}] =
    useModifyOfferMutation();
  const [selectedTime, setSelectedTime] = useState(myOffer?.time ?? '');
  const [note, setNote] = useState<string>(myOffer?.notes ?? '');
  const [timeToComplete, setTimeToComplete] = useState<string>(
    myOffer?.estimated_time ?? '',
  );
  const [offerPrice, setOfferPrice] = useState<string>(
    myOffer?.offer_price?.toString() ?? '',
  );
  const [selectedDate, setSelectedDate] = useState<any>(() => {
    if (myOffer?.date) {
      const offerDate = moment(myOffer?.date);
      if (offerDate.isBefore(moment(), 'day')) {
        return null;
      }
      return {
        key: offerDate && offerDate.format('DDMM'),
        month: offerDate && offerDate.format('MMM'),
        day: offerDate && offerDate.format('DD'),
        weekday: offerDate && offerDate.format('ddd'),
        isoDate: offerDate && offerDate.format('YYYY-MM-DD'),
      };
    }
    return null;
  });
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false);
  // const [selectedMedia, setSelectedMedia] = useState<any[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<any[]>(() => {
    if (myOffer?.media_files) {
      return myOffer.media_files.map((file: any, index: number) => ({
        uri: file.file,
        type: file.type === 'other' ? 'application/pdf' : file.type,
        name: file.name,
        isExisting: true, // flag to identify existing files
      }));
    }
    return [];
  });

  const onSubmitOffer = async () => {
    try {
      if (!timeToComplete) {
        errorToast('Please enter estimated time');
        return;
      }
      if (!offerPrice) {
        errorToast('Please enter offer price');
        return;
      }
      if (!toggleCheckBox) {
        errorToast('Please check the terms of use');
        return;
      }

      const formData = new FormData();
      if (myOffer) {
        formData.append('offer_id', myOffer?._id);
      } else {
        formData.append('request_id', requestDetails?._id);
      }
      formData.append('offer_price', offerPrice);
      formData.append('estimated_time', timeToComplete);

      // ✅ append optional fields only if present
      if (note) {
        formData.append('notes', note);
      }

      if (selectedDate?.isoDate) {
        formData.append('date', selectedDate.isoDate);
      }

      if (selectedTime) {
        formData.append('time', selectedTime);
      }

      if (selectedMedia?.length > 0) {
        selectedMedia.forEach((media, index) => {
          const fileObject = {
            uri: media.uri,
            type: media.type,
            name: media.name || `media_${index}.${media.type.split('/')[1]}`,
          };
          formData.append('media_files', fileObject);
        });
      }

      const response = await (myOffer
        ? modifyOffer(formData)
        : sendOffer(formData)
      ).unwrap();
      
      if (response?.status) {
        setIsSubmitModalVisible(true);
      } else {
        errorToast(response?.message);
      }
    } catch (error: any) {
      console.log(error);
      errorToast(
        error?.data?.message || error?.message || 'Something went wrong',
      );
    }
  };

  return (
    <SafeAreaView style={[GeneralStyle.container]}>
      <BackHeader
        text="Make an Offer"
        style={{
          paddingHorizontal: wp(23),
        }}
      />

      <KeyboardAwareScrollView
        nestedScrollEnabled
        // style={{flex: 1}}
        contentContainerStyle={{paddingBottom: hp(30), flexGrow: 1}}
        enableOnAndroid
        extraHeight={hp(200)}
        showsVerticalScrollIndicator={false}>
        <View style={styles.attachmentSection}>
          <CommonText text="Attach Document" style={styles.attachTitle} />
          <UploadBox
            style={styles.uploadBox}
            btnStyle={styles.uploadBtn}
            setSelectedMedia={setSelectedMedia}
            isDocument={true}
            desc="Upload PDF's here."
            selectedMedia={selectedMedia}
          />
        </View>

        <View style={{gap: hp(22), marginTop: hp(20)}}>
          <View style={{gap: hp(20)}}>
            <CommonText
              text="Add Special Note"
              style={styles.specialNoteTitle}
            />
            <AddSpecialNote
              style={styles.noteContainer}
              textInputStyle={styles.noteInput}
              value={note}
              onChangeText={setNote}
            />
          </View>
          <View style={{gap: hp(20)}}>
            <CommonText
              text="Estimated time to complete"
              style={styles.specialNoteTitle}
            />
            <AddSpecialNote
              placeholder="3 Hours"
              textInputStyle={[styles.noteInput]}
              style={[styles.noteContainer, {height: hp(60)}]}
              value={timeToComplete}
              onChangeText={setTimeToComplete}
              keyboardType="numeric"
              maxLength={2}
            />
          </View>

          <View style={styles.safeArea}>
            <CustomDates
              isProvider
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </View>

          <View style={styles.safeArea}>
            <TimeSlots
              isProvider
              date={selectedDate?.isoDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
          </View>

          <View style={{gap: hp(20)}}>
            <CommonText
              text="Your Offer Price"
              style={styles.specialNoteTitle}
            />
            <AddSpecialNote
              placeholder="Your Offer Price"
              // value={'5,000 AED'}
              value={offerPrice}
              onChangeText={setOfferPrice}
              textInputStyle={[
                styles.noteInput,
                {
                  ...commonFontStyle(700, 2.6, Colors.provider_primary),
                },
              ]}
              style={[styles.noteContainer, {height: hp(60)}]}
              keyboardType="numeric"
              maxLength={7}
            />
          </View>

          <View style={styles.safeArea}>
            <TermsCheckBox
              toggleCheckBox={toggleCheckBox}
              setToggleCheckBox={setToggleCheckBox}
              checkedCheckBoxColor={Colors.provider_primary}
              isChecked={toggleCheckBox}
              onClick={() => setToggleCheckBox(!toggleCheckBox)}
            />

            <CustomButton
              title={'Submit Offer'}
              btnStyle={{marginVertical: hp(27)}}
              onPress={onSubmitOffer}
              loading={isLoading}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>

      <BottomModal
        close
        style={{paddingTop: hp(40)}}
        visible={isSubmitModalVisible}
        onPressCancel={() => {
          setIsSubmitModalVisible(false);
          resetNavigation(
            PROVIDER_SCREENS.ProviderTabNavigation,
            SCREENS.Dashboard,
          );
        }}
        onClose={() => {
          setIsSubmitModalVisible(false);
          resetNavigation(
            PROVIDER_SCREENS.ProviderTabNavigation,
            SCREENS.Dashboard,
          );
        }}>
        <RequestSubmitModal
          header="Offer Submitted"
          title={'Your Offer has been Submitted Good Luck!'}
          color={Colors.provider_primary}
          handleCardPress={() => {
            setIsSubmitModalVisible(false);
            resetNavigation(
              PROVIDER_SCREENS.ProviderTabNavigation,
              SCREENS.Dashboard,
            );
          }}
          bookingNumber={`#${requestDetails?.job_code}`}
          requestCardStyle={{backgroundColor: Colors.provider_primary}}
          text1={getLocalizedText(
            requestDetails?.category_id?.title,
            requestDetails?.category_id?.title_ar,
            language,
          )}
          text2={getLocalizedText(
            requestDetails?.sub_category_id?.title,
            requestDetails?.sub_category_id?.title_ar,
            language,
          )}
          imageSource={requestDetails?.sub_category_id?.image}
        />
      </BottomModal>
    </SafeAreaView>
  );
};

export default MakeOffer;

const styles = StyleSheet.create({
  safeArea: {
    paddingHorizontal: wp(23),
  },
  attachmentSection: {
    marginTop: hp(40),
    paddingHorizontal: wp(23),
  },
  attachTitle: {
    marginBottom: hp(18),
    ...commonFontStyle(600, 2.2, Colors.black),
  },
  uploadBox: {
    width: '100%',
  },
  uploadBtn: {
    backgroundColor: Colors.provider_primary,
  },
  specialNoteTitle: {
    paddingHorizontal: wp(23),
    ...commonFontStyle(600, 2.2, Colors.black),
  },
  noteContainer: {
    padding: 0,
    width: '100%',
    height: hp(85),
    paddingVertical: 0,
  },
  noteInput: {
    marginTop: 0,
    borderWidth: 0,
    paddingHorizontal: wp(22),
    ...commonFontStyle(400, 1.9, Colors._818181),
  },
});
