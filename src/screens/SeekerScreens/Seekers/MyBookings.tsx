/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {commonFontStyle, getFontSize, hp, wp} from '@/utils/responsiveFn';
import {Colors} from '@/constants/Colors';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import {IMAGES} from '@/assets/images';
import CommonText from '@/components/common/CommonText';
import RequestCard from '@/components/common/RequestCard';
import CustomDates from '@/components/common/CustomDates';
import TimeSlots from '@/components/common/TimeSlots';
import UploadBox from '@/components/common/UploadBox';
import ShadowCard from '@/components/common/ShadowCard';
import {useTranslation} from 'react-i18next';
import CustomButton from '@/components/common/CustomButton';
import {
  errorToast,
  navigateTo,
  resetNavigation,
} from '@/components/common/commonFunction';
import {SCREENS, SEEKER_SCREENS} from '@/navigation/screenNames';
import BackHeader from '@/components/common/BackHeader';
import BottomModal from '@/components/common/BottomModal';
import RequestSubmitModal from '@/components/modals/RequestSubmitModal';
import {useCreateRequestMutation} from '@/api/Seeker/homeApi';
import {useRoute} from '@react-navigation/native';
import {useAppSelector} from '@/Hooks/hooks';
import {rowReverseRTL} from '@/utils/arabicStyles';
import CustomImage from '@/components/common/CustomImage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const MyBookings = () => {
  const {t} = useTranslation();
  const {userInfo, dashboard} = useAppSelector(state => state.auth);

  const {
    params: {category_id, category_name, category_image, title, _id},
  } = useRoute<any>();
  const categoryData = dashboard?.categories?.find(
    val => val?._id === category_id,
  );

  const [createRequest, {isLoading}] = useCreateRequestMutation();
  const [isLocationType, setIsLocationType] = useState('Your Location');
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectedTime, setSelectedTime] = useState('');

  const [dynamicFieldValues, setDynamicFieldValues] = useState<{
    [key: string]: any;
  }>({});

  const [note, setNote] = useState<string>('');
  const [selectedMedia, setSelectedMedia] = useState<any[]>([]);
  const [jobCode, setJobCode] = useState<string>('');
  const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false);

  const handleDynamicFieldChange = (fieldName: string, value: any) => {
    setDynamicFieldValues(prev => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const renderDynamicField = (field: any) => {
    const {title, name, type, options} = field;

    switch (type) {
      case 'options':
        return (
          <View key={name} style={styles.sectionSpacing}>
            <CommonText text={title} style={styles.sectionTitle} />
            <View style={styles.circleRow}>
              {options.map((option: string, index: number) => {
                const isSelected = dynamicFieldValues[name] === option;
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleDynamicFieldChange(name, option)}
                    style={[
                      styles.circleBox,
                      isSelected && styles.selectedCircleBox,
                      option?.length > 2 && {
                        paddingHorizontal: getFontSize(2),
                        paddingVertical: getFontSize(1),
                        width: 'auto',
                        height: 'auto',
                      },
                    ]}>
                    <CommonText
                      text={option}
                      style={[
                        styles.circleText,
                        isSelected && styles.selectedCircleText,
                      ]}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );

      case 'input':
        return (
          <View key={name} style={styles.sectionSpacing}>
            <CommonText text={title} style={styles.sectionTitle} />
            <TextInput
              style={styles.carInput}
              placeholder={`Enter ${title.toLowerCase()}`}
              onChangeText={value => handleDynamicFieldChange(name, value)}
              value={dynamicFieldValues[name] || ''}
            />
          </View>
        );

      case 'select':
        return (
          <View key={name} style={styles.sectionSpacing}>
            <CommonText text={title} style={styles.sectionTitle} />
            <View style={styles.mileageRow}>
              {options.map((option: string, index: number, array: string[]) => {
                const isLastItem = index === array.length - 1;
                const isSelected = dynamicFieldValues[name] === option;

                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleDynamicFieldChange(name, option)}
                    style={[
                      styles.mileageBox,
                      !isLastItem && styles.mileageBoxSpacing,
                      isSelected && styles.selectedMileageBox,
                    ]}>
                    <CommonText
                      text={option}
                      style={[
                        styles.mileageText,
                        isSelected && styles.selectedMileageText,
                      ]}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  const onSend = async () => {
    try {
      if (!selectedDate) {
        errorToast('Please select a date');
        return;
      }

      if (!selectedTime) {
        errorToast('Please select a time slot');
        return;
      }

      if (!isLocationType) {
        errorToast('Please choose a location type');
        return;
      }
      if (!note) {
        errorToast('Please enter a note');
        return;
      }
      const formData = new FormData();
      formData.append('category_id', category_id);
      formData.append('sub_category_id', _id);
      formData.append('date', selectedDate?.isoDate);
      formData.append('notes', note);
      formData.append('time', selectedTime);
      formData.append('location', isLocationType);
      // formData.append('media_files', selectedMedia);
      selectedMedia.forEach((media, index) => {
        const fileObject = {
          uri: media.uri,
          type: media.type,
          name: media.name || `media_${index}.${media.type.split('/')[1]}`,
        };
        formData.append('media_files', fileObject); // <-- use same key for all
      });

      // Add dynamic field values to meta_data
      Object.keys(dynamicFieldValues).forEach(fieldName => {
        if (dynamicFieldValues[fieldName]) {
          formData.append(
            `meta_data[${fieldName}]`,
            dynamicFieldValues[fieldName],
          );
        }
      });

      const response = await createRequest(formData).unwrap();
      console.log('response', response);

      if (response?.status) {
        setIsSubmitModalVisible(true);
        setJobCode(response?.data?.job_code);
      }
    } catch (error: any) {
      console.log(error);
      errorToast(
        error?.data?.message || error?.message || 'Something went wrong',
      );
    }
  };

  return (
    <SafeareaProvider style={styles.safeArea}>
      <BackHeader
        text={'Create Request'}
        rightIcon={<Image source={IMAGES.search} style={styles.searchIcon} />}
        style={{
          paddingHorizontal: wp(24),
        }}
      />

      <KeyboardAwareScrollView
        nestedScrollEnabled
        // style={{flex: 1}}
        contentContainerStyle={{paddingBottom: hp(30), flexGrow: 1}}
        enableOnAndroid
        extraHeight={hp(200)}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: wp(24),
          }}>
          <RequestCard
            text1={category_name}
            text2={title}
            imageSource={category_image}
            style={styles.requestCard}
          />

          <CommonText
            text={'Choose Location'}
            style={{
              ...commonFontStyle(700, 2.2, Colors.black),
            }}
          />
          <View style={styles.locationTab}>
            <CustomButton
              title={'My Location'}
              onPress={() => {
                userInfo?.address?.type
                  ? setIsLocationType('My Location')
                  : navigateTo(SCREENS.SetLocation);
              }}
              textStyle={
                isLocationType == 'My Location'
                  ? {fontSize: getFontSize(1.8)}
                  : {...commonFontStyle(500, 1.8, Colors._4F4F4F)}
              }
              btnStyle={[
                styles.yourLocationBtn,
                isLocationType == 'My Location' && styles.myLocationBtn,
              ]}
              leftImg={
                <Image
                  source={IMAGES.marker}
                  tintColor={
                    isLocationType == 'My Location'
                      ? Colors.white
                      : Colors.black
                  }
                />
              }
            />
            <CustomButton
              title={'Store Location'}
              onPress={() => {
                setIsLocationType('Your Location');
              }}
              btnStyle={[
                styles.yourLocationBtn,
                isLocationType == 'Your Location' && styles.myLocationBtn,
              ]}
              textStyle={
                isLocationType == 'Your Location'
                  ? {fontSize: getFontSize(1.8)}
                  : {...commonFontStyle(500, 1.8, Colors._4F4F4F)}
              }
              leftImg={
                <Image
                  source={IMAGES.home_marker}
                  tintColor={
                    isLocationType == 'Your Location'
                      ? Colors.white
                      : Colors.black
                  }
                />
              }
            />
          </View>

          {isLocationType == 'My Location' && (
            <Pressable
              onPress={() => navigateTo(SCREENS.SetLocation)}
              style={styles.locationContainer}>
              <View style={styles.locationSubContainer}>
                <CustomImage source={IMAGES.dummy_map} size={getFontSize(8)} />
                <View style={styles.locationDetails}>
                  <CommonText
                    text={userInfo?.address?.type ?? 'Add Location'}
                    style={styles.locationTitle}
                  />
                  <CommonText
                    text={`${userInfo?.address?.apt_villa_no} ${userInfo?.address?.building_name} ${userInfo?.address?.directions}`}
                    style={styles.locationSubtitle}
                    numberOfLines={2}
                  />
                </View>
              </View>
              <View style={styles.changeBtn}>
                <CommonText text={'Change'} style={styles.changeBtnText} />
              </View>
            </Pressable>
          )}

          <View style={styles.sectionSpacing}>
            <CustomDates
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </View>
          <View style={styles.sectionSpacing}>
            <TimeSlots
              date={selectedDate?.isoDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
          </View>

          {/* Render dynamic fields */}
          {categoryData?.fields?.map((field: any) => renderDynamicField(field))}
        </View>

        <View style={{marginTop: hp(30), paddingHorizontal: wp(24)}}>
          <UploadBox
            title="Upload Video/Image"
            style={{width: '100%'}}
            setSelectedMedia={setSelectedMedia}
          />
        </View>

        <View
          style={[
            styles.sectionSpacing,
            {
              paddingHorizontal: wp(24),
            },
          ]}>
          <ShadowCard style={[styles.shadowCard, {width: '100%'}]}>
            <CommonText
              text={'Add Special Note'}
              style={styles.specialNoteTitle}
            />
            <TextInput
              multiline
              placeholder={t('Describe here...')}
              style={styles.textInput}
              value={note}
              onChangeText={setNote}
            />
          </ShadowCard>
        </View>

        <CustomButton
          title={'Send Request'}
          loading={isLoading}
          btnStyle={styles.sendRequestBtn}
          onPress={() => onSend()}
        />
      </KeyboardAwareScrollView>

      <BottomModal
        close
        style={{paddingTop: hp(40)}}
        visible={isSubmitModalVisible}
        onPressCancel={() => {
          setIsSubmitModalVisible(false);
          resetNavigation(SCREENS.SeekerTabNavigation, SCREENS.Home);
        }}
        onClose={() => {
          setIsSubmitModalVisible(false);
          resetNavigation(SCREENS.SeekerTabNavigation, SCREENS.Home);
        }}>
        <RequestSubmitModal
          handleCardPress={() => {
            setIsSubmitModalVisible(false);
            resetNavigation(SEEKER_SCREENS.Offers, '', {isResetNav: true});
          }}
          color={Colors.seeker_primary}
          text1={category_name}
          text2={title}
          imageSource={category_image}
          jobCode={jobCode}
        />
      </BottomModal>
    </SafeareaProvider>
  );
};

export default MyBookings;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerContainer: {
    marginTop: hp(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    gap: wp(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    ...commonFontStyle(700, 2.4, Colors.black),
  },
  searchIcon: {
    height: hp(40),
    width: wp(40),
  },
  scrollViewContent: {
    paddingBottom: hp(25),
  },
  requestCard: {
    marginVertical: hp(35),
  },
  locationContainer: {
    gap: wp(20),
    elevation: 5,
    padding: hp(12),
    borderRadius: hp(20),
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
  },
  locationSubContainer: {
    gap: wp(15),
    ...rowReverseRTL(),
    alignItems: 'center',
    flex: 1,
  },
  locationDetails: {
    gap: hp(2),
  },
  locationTitle: {
    ...commonFontStyle(600, 2.2, Colors.black),
  },
  locationSubtitle: {
    ...commonFontStyle(400, 1.7, Colors._7D7D7D),
  },
  changeBtn: {
    flexShrink: 1,
    borderRadius: hp(50),
    paddingVertical: hp(6),
    paddingHorizontal: wp(12),
    backgroundColor: Colors._EBFCF4,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeBtnText: {
    ...commonFontStyle(500, 1.4, Colors._039B55),
  },
  sectionSpacing: {
    marginTop: hp(30),
  },
  sectionTitle: {
    ...commonFontStyle(700, 2.2, Colors.black),
  },
  carInput: {
    height: hp(60),
    marginTop: hp(22),
    borderWidth: hp(1),
    borderRadius: hp(35),
    paddingHorizontal: wp(25),
    borderColor: Colors._F2EDED,
    ...commonFontStyle(500, 1.7, Colors.black),
  },
  mileageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(15),
  },
  mileageBox: {
    flex: 1,
    borderWidth: hp(1),
    borderRadius: hp(25),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(15),
    borderColor: Colors._F2EDED,
  },
  mileageBoxSpacing: {
    marginRight: wp(15),
  },
  mileageText: {
    ...commonFontStyle(500, 1.7, Colors.black),
  },
  subTitle: {
    ...commonFontStyle(500, 2.2, Colors.black),
  },
  circleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(17),
    gap: getFontSize(2),
    flexWrap: 'wrap',
  },
  circleBox: {
    width: wp(40),
    height: hp(40),
    borderWidth: hp(1),
    borderRadius: hp(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors._F2EDED,
    backgroundColor: Colors.white,
  },
  selectedCircleBox: {
    backgroundColor: Colors.seeker_primary,
    borderColor: Colors.seeker_primary,
  },
  circleText: {
    ...commonFontStyle(500, 1.8, Colors.black),
  },
  selectedCircleText: {
    color: Colors.white,
  },
  shadowCard: {
    padding: hp(20),
    alignItems: 'flex-start',
  },
  specialNoteTitle: {
    ...commonFontStyle(600, 2.2, Colors.black),
  },
  textInput: {
    width: '100%',
    height: hp(125),
    padding: hp(16),
    marginTop: hp(18),
    borderWidth: hp(1),
    borderRadius: hp(10),
    textAlignVertical: 'top',
    borderColor: Colors._BFC2C1,
  },
  sendRequestBtn: {
    marginTop: hp(50),
    marginHorizontal: wp(24),
    backgroundColor: Colors.seeker_primary,
  },
  selectedMileageBox: {
    borderColor: Colors.seeker_primary,
    backgroundColor: Colors.seeker_primary,
  },
  selectedMileageText: {
    color: Colors.white,
  },
  locationTab: {
    gap: wp(23),
    marginTop: hp(18),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(30),
  },
  myLocationBtn: {
    flex: 1,
    borderWidth: hp(1),
    borderColor: Colors.seeker_primary,
    backgroundColor: Colors.seeker_primary,
  },
  yourLocationBtn: {
    flex: 1,
    borderWidth: hp(1),
    borderColor: Colors._F2EDED,
    backgroundColor: Colors.white,
  },
});
