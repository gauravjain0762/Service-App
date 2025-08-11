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

import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
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
import {navigateTo, resetNavigation} from '@/components/common/commonFunction';
import {SCREENS, SEEKER_SCREENS} from '@/navigation/screenNames';
import BackHeader from '@/components/common/BackHeader';
import BottomModal from '@/components/common/BottomModal';
import RequestSubmitModal from '@/components/modals/RequestSubmitModal';

const MyBookings = () => {
  const {t} = useTranslation();
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false);
  const [selectedMileage, setSelectedMileage] = useState<string | null>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<
    number | null
  >(null);

  return (
    <SafeareaProvider style={styles.safeArea}>
      <BackHeader
        text={'Create Request'}
        rightIcon={<Image source={IMAGES.search} style={styles.searchIcon} />}
        style={{
          paddingHorizontal: wp(24),
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}>
        <View
          style={{
            paddingHorizontal: wp(24),
          }}>
          <RequestCard style={styles.requestCard} />

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
                navigateTo(SCREENS.SetLocation);
              }}
              btnStyle={styles.myLocationBtn}
              leftImg={<Image source={IMAGES.marker} />}
            />
            <CustomButton
              title={'Store Location'}
              btnStyle={styles.yourLocationBtn}
              textStyle={{...commonFontStyle(500, 1.8, Colors._4F4F4F)}}
              leftImg={<Image source={IMAGES.home_marker} />}
            />
          </View>

          <Pressable
            onPress={() => navigateTo(SCREENS.SetLocation)}
            style={styles.locationContainer}>
            <Image source={IMAGES.dummy_map} />
            <View style={styles.locationDetails}>
              <CommonText text={'Add Location'} style={styles.locationTitle} />
              <CommonText
                text={'Dubai Internet City UAE'}
                style={styles.locationSubtitle}
              />
            </View>
            <View style={styles.changeBtn}>
              <CommonText text={'Change'} style={styles.changeBtnText} />
            </View>
          </Pressable>

          <View style={styles.sectionSpacing}>
            <CustomDates
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </View>

          <View style={styles.sectionSpacing}>
            <CommonText text={'Car Make & Model'} style={styles.sectionTitle} />
            <TextInput
              style={styles.carInput}
              placeholder="SUV Toyota Corola"
            />
          </View>

          <View style={styles.sectionSpacing}>
            <CommonText text={'Mileage Oil'} style={styles.sectionTitle} />
            <View style={styles.mileageRow}>
              {['10,000', '15,000', '20,000'].map((item, index, array) => {
                const isLastItem = index === array.length - 1;
                const isSelected = selectedMileage === item;

                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedMileage(item)}
                    style={[
                      styles.mileageBox,
                      !isLastItem && styles.mileageBoxSpacing,
                      isSelected && styles.selectedMileageBox,
                    ]}>
                    <CommonText
                      text={`${item} KM`}
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

          <View style={styles.sectionSpacing}>
            <TimeSlots />
          </View>

          <View style={[styles.sectionSpacing, {marginTop: hp(12)}]}>
            <CommonText text={'How Many Hours?'} style={styles.subTitle} />
            <View style={styles.circleRow}>
              {Array.from({length: 6}).map((_, index) => {
                const value = index + 1;
                const isSelected = selectedHour === value;
                return (
                  <TouchableOpacity
                    key={value}
                    onPress={() => setSelectedHour(value)}
                    style={[
                      styles.circleBox,
                      isSelected && styles.selectedCircleBox,
                    ]}>
                    <CommonText
                      text={value}
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

          <View style={styles.sectionSpacing}>
            <CommonText
              text={'How Many Professional?'}
              style={styles.subTitle}
            />
            <View style={styles.circleRow}>
              {Array.from({length: 6}).map((_, index) => {
                const value = index + 1;
                const isSelected = selectedProfessional === value;
                return (
                  <TouchableOpacity
                    key={value}
                    onPress={() => setSelectedProfessional(value)}
                    style={[
                      styles.circleBox,
                      isSelected && styles.selectedCircleBox,
                    ]}>
                    <CommonText
                      text={value}
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
        </View>

        <View style={{marginTop: hp(30), paddingHorizontal: wp(24)}}>
          <UploadBox title="Upload Video/Image" style={{width: '100%'}} />
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
            />
          </ShadowCard>
        </View>

        <CustomButton
          title={'Send Request'}
          btnStyle={styles.sendRequestBtn}
          onPress={() => setIsSubmitModalVisible(true)}
        />
      </ScrollView>

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
        }}>
        <RequestSubmitModal
          handleCardPress={() => {
            setIsSubmitModalVisible(false);
            resetNavigation(SEEKER_SCREENS.Offers, '', {isResetNav: true});
          }}
          color={Colors.seeker_primary}
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
  },
  locationDetails: {
    gap: hp(10),
  },
  locationTitle: {
    ...commonFontStyle(600, 2.2, Colors.black),
  },
  locationSubtitle: {
    ...commonFontStyle(400, 1.7, Colors._7D7D7D),
  },
  changeBtn: {
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
  },
  circleBox: {
    width: wp(40),
    height: hp(40),
    borderWidth: hp(1),
    marginRight: wp(17),
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
    backgroundColor: Colors.seeker_primary,
  },
  yourLocationBtn: {
    flex: 1,
    borderWidth: hp(1),
    borderColor: Colors._F2EDED,
    backgroundColor: Colors.white,
  },
});
