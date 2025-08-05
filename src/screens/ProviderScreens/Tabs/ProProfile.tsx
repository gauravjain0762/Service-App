import {IMAGES} from '@/assets/images';
import BackHeader from '@/components/common/BackHeader';
// import CommonSwitch from '@/components/common/CommonSwitch';
import CommonText from '@/components/common/CommonText';
import CustomButton from '@/components/common/CustomButton';
import CustomImage from '@/components/common/CustomImage';
import ProfileListItem from '@/components/Provider/ProfileListItem';
import {Colors} from '@/constants/Colors';
import {GeneralStyle} from '@/constants/GeneralStyle';
import {commonFontStyle, getFontSize} from '@/utils/responsiveFn';
import React from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

const List = [
  {
    id: 1,
    title: 'Language',
    icon: IMAGES.pro_language,
  },
  {
    id: 2,
    title: 'Change Password',
    icon: IMAGES.lock,
  },
  {
    id: 3,
    title: 'Delete Account',
    icon: IMAGES.delete_account,
  },
  {
    id: 4,
    title: 'Logout',
    icon: IMAGES.pro_logout,
  },
];

const ProProfile = () => {
  // const [isToggleOn, setIsToggleOn] = React.useState(false);

  return (
    <SafeAreaView style={GeneralStyle.container}>
      <BackHeader
        text="Profile"
        style={GeneralStyle.back}
        rightIcon={
          <CustomButton
            title={'Edit Profile'}
            btnStyle={styles.editBtn}
            textStyle={styles.editBtnText}
          />
        }
      />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <CustomImage
          source={IMAGES.user_profile_icon}
          containerStyle={styles.userImageStyle}
          size={getFontSize(7)}
        />

        <CommonText text="Master Sanitary Fittings" style={styles.name} />
        <CommonText text="serviceprovider.com" style={styles.link} />

        <View style={styles.serviceContainer}>
          <View style={styles.serviceView}>
            <CommonText text={'331'} style={styles.value} />
            <CommonText text={'Services Delivered'} style={styles.label} />
          </View>
          <View style={styles.line} />
          <View style={styles.line} />
          <View style={styles.serviceView}>
            <CommonText text={'5'} style={styles.value} />
            <CommonText text={'Years of Experience'} style={styles.label} />
          </View>
        </View>

        {/* <View style={styles.availableView}>
          <View>
            <CommonText
              text={'Available Status'}
              style={styles.availableText}
            />
            <CommonText text={'You are Online'} style={styles.onlineText} />
          </View>
          <CommonSwitch
            onToggleSwitch={() => setIsToggleOn(!isToggleOn)}
            isToggleOn={isToggleOn}
          />
        </View> */}

        <FlatList
          data={List}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          renderItem={({item}) => <ProfileListItem item={item} />}
          contentContainerStyle={styles.contentContainer}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  editBtn: {
    height: getFontSize(5),
    paddingHorizontal: getFontSize(2.5),
    backgroundColor: Colors._E8F8FF,
  },
  editBtnText: {
    ...commonFontStyle(500, 2, Colors.provider_primary),
  },

  userImageStyle: {
    height: getFontSize(15),
    width: getFontSize(15),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: getFontSize(2),
    marginBottom: getFontSize(2),
    borderRadius: getFontSize(100),
    backgroundColor: Colors._f4f4fe,
  },

  name: {
    textAlign: 'center',
    ...commonFontStyle(600, 2.6, Colors.black),
    paddingBottom: getFontSize(1),
  },
  link: {
    textAlign: 'center',
    ...commonFontStyle(400, 2.3, Colors._848484),
  },

  serviceContainer: {
    borderRadius: getFontSize(2),
    marginVertical: getFontSize(3),
    marginHorizontal: getFontSize(2),
    flexDirection: 'row',
    backgroundColor: Colors.provider_primary,
    paddingVertical: getFontSize(2),
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  serviceView: {
    alignItems: 'center',
    flex: 1,
    gap: getFontSize(1),
  },
  value: {
    ...commonFontStyle(700, 3.9, Colors.white),
    textAlign: 'center',
  },
  label: {
    ...commonFontStyle(500, 2.8, Colors.white),
    flex: 1,
    textAlign: 'center',
  },
  line: {
    width: 1.5,
    height: '50%',
    backgroundColor: Colors.white,
    marginRight: 2,
  },

  availableView: {
    borderRadius: getFontSize(1.8),
    marginHorizontal: getFontSize(2),
    flexDirection: 'row',
    backgroundColor: Colors._F6FFFB,
    borderWidth: 1,
    borderColor: Colors._EEEEEE,
    paddingVertical: getFontSize(2),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: getFontSize(2),
  },
  availableText: {
    ...commonFontStyle(500, 2.4, Colors.black),
    marginBottom: getFontSize(0.5),
  },
  onlineText: {
    ...commonFontStyle(500, 2.2, Colors._06A65D),
  },

  contentContainer: {
    gap: getFontSize(3),
    paddingHorizontal: getFontSize(3),
    paddingTop: getFontSize(2),
  },
});
