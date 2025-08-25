import React, {useState} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';

import {IMAGES} from '@/assets/images';
import BackHeader from '@/components/common/BackHeader';
import {navigateTo, resetNavigation} from '@/components/common/commonFunction';
import CommonText from '@/components/common/CommonText';
import CustomButton from '@/components/common/CustomButton';
import CustomImage from '@/components/common/CustomImage';
import LanguageModal from '@/components/common/LanguageModel';
import ProfileListItem from '@/components/Provider/ProfileListItem';
import {Colors} from '@/constants/Colors';
import {GeneralStyle} from '@/constants/GeneralStyle';
import {PROVIDER_SCREENS, SCREEN_NAMES} from '@/navigation/screenNames';
import {commonFontStyle, getFontSize, hp} from '@/utils/responsiveFn';
import {useRoute} from '@react-navigation/native';
import LogoutDeleteModal from '@/components/modals/LogoutDeleteModal';
import {useLogoutMutation} from '@/api/Provider/authApi';
import {resetStore} from '@/store';
import {clearToken} from '@/features/authSlice';
import {useAppDispatch, useAppSelector} from '@/Hooks/hooks';
import SafeareaProvider from '@/components/common/SafeareaProvider';

const ProProfile = () => {
  const {userInfo} = useAppSelector<any>(state => state.auth);

  const route = useRoute<any>();
  const {isProvider} = route.params ?? {};
  const dispatch = useAppDispatch();
  const [logout, {isLoading}] = useLogoutMutation();

  const [isLanguageModalVisible, setIsLanguageModalVisible] =
    useState<boolean>(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] =
    useState<boolean>(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);
  const [selectedModal, setSelectedModal] = useState<'LOGOUT' | 'DELETE'>(
    'LOGOUT',
  );

  const List = [
    {
      id: 1,
      title: 'Language',
      icon: IMAGES.pro_language,
      onPress: () => setIsLanguageModalVisible(true),
    },
    {
      id: 2,
      title: 'Change Password',
      icon: IMAGES.lock,
      onPress: () =>
        navigateTo(PROVIDER_SCREENS.CreateNewPass, {isProvider: true}),
    },
    {
      id: 3,
      title: 'Delete Account',
      icon: IMAGES.delete_account,
      onPress: () => {
        setSelectedModal('DELETE');
        setIsDeleteModalVisible(true);
      },
    },
    {
      id: 4,
      title: 'Logout',
      icon: IMAGES.pro_logout,
      onPress: () => {
        setSelectedModal('LOGOUT');
        setIsLogoutModalVisible(true);
      },
    },
  ];

  const handleLanguageSelect = () => {
    setIsLanguageModalVisible(false);
  };

  const closeAllModals = () => {
    if (selectedModal === 'LOGOUT') {
      setIsLogoutModalVisible(false);
    } else {
      setIsDeleteModalVisible(false);
    }
  };

  const handleConfirm = async () => {
    if (selectedModal === 'LOGOUT') {
      setIsLogoutModalVisible(false);

      const response = await logout({}).unwrap();
      if (response?.status) {
        setIsDeleteModalVisible(false);
        resetNavigation(SCREEN_NAMES.OnBoarding);
        resetStore();
        dispatch(clearToken());
      }
    } else {
      setIsDeleteModalVisible(false);
      setIsLogoutModalVisible(true);

      setTimeout(() => {
        setIsLogoutModalVisible(false);
        resetNavigation(SCREEN_NAMES.OnBoarding);
      }, 300);
    }
  };
  console.log(userInfo, 'userInfo');

  return (
    <SafeareaProvider loading={isLoading} style={GeneralStyle.container}>
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <CustomImage
          uri={userInfo?.logo}
          containerStyle={styles.userImageStyle}
          size={getFontSize(7)}
          onPress={() => navigateTo(PROVIDER_SCREENS.ProfileDetail)}
        />

        <CommonText text={userInfo?.name} style={styles.name} />
        <CommonText text={userInfo?.email} style={styles.link} />

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
          renderItem={({item}) => (
            <ProfileListItem item={item} onPress={item?.onPress} />
          )}
          contentContainerStyle={styles.contentContainer}
        />
      </ScrollView>

      <LanguageModal
        isProvider={isProvider}
        visible={isLanguageModalVisible}
        onLanguageSelect={() => handleLanguageSelect()}
        onClose={() => setIsLanguageModalVisible(false)}
      />

      <LogoutDeleteModal
        isProvider={isProvider}
        visible={isLogoutModalVisible}
        image={IMAGES.newlogout}
        buttonTitle="Logout"
        headerText="Ready to Logout?"
        descriptionText="Are you sure want to logout? Make sure all your work is saved."
        onPressClose={closeAllModals}
        onPressConfirm={handleConfirm}
      />

      <LogoutDeleteModal
        isProvider={isProvider}
        visible={isDeleteModalVisible}
        image={IMAGES.delete}
        buttonTitle="Delete Now"
        headerText="Delete Account"
        descriptionText="Are you sure want to delete your account?"
        onPressClose={closeAllModals}
        onPressConfirm={handleConfirm}
      />
    </SafeareaProvider>
  );
};

export default ProProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: hp(20),
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
    ...commonFontStyle(700, 3.7, Colors.white),
    textAlign: 'center',
  },
  label: {
    ...commonFontStyle(500, 2, Colors.white),
    textAlign: 'center',
  },
  line: {
    width: hp(1.5),
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
    gap: getFontSize(4),
    paddingHorizontal: getFontSize(3),
    paddingTop: getFontSize(2),
  },
});
