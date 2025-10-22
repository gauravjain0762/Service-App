/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  FlatList,
  Linking,
} from 'react-native';
import BackHeader from '@/components/common/BackHeader';
import CustomImage from '@/components/common/CustomImage';
import CommonText from '@/components/common/CommonText';
import {IMAGES} from '@/assets/images';
import {Colors} from '@/constants/Colors';
import {hp, wp, commonFontStyle} from '@/utils/responsiveFn';
import ProfileActionItem from '@/components/common/ProfileActionItem';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import {navigateTo, resetNavigation} from '@/components/common/commonFunction';
import {SCREEN_NAMES, SCREENS, SEEKER_SCREENS} from '@/navigation/screenNames';
import LanguageModal from '@/components/common/LanguageModel';
import LogoutDeleteModal from '@/components/modals/LogoutDeleteModal';
import {useLogoutMutation} from '@/api/Seeker/authApi';
import {resetStore} from '@/store';
import {useAppDispatch, useAppSelector} from '@/Hooks/hooks';
import {clearToken} from '@/features/authSlice';
import {rowReverseRTL} from '@/utils/arabicStyles';

const Profile = () => {
  const {userInfo, language, appData} = useAppSelector(state => state.auth);
  const [logout, {isLoading}] = useLogoutMutation();

  const styles = React.useMemo(() => getGlobalStyles(language), [language]);
  const dispatch = useAppDispatch();
  const [isLanguageModalVisible, setIsLanguageModalVisible] =
    useState<boolean>(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] =
    useState<boolean>(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);
  const [selectedModal, setSelectedModal] = useState<'LOGOUT' | 'DELETE'>(
    'LOGOUT',
  );

  const handleLanguageSelect = () => {
    setIsLanguageModalVisible(false);
  };

  const ACTIONS = [
    {
      key: 'loyalty_credits',
      leftIcon: IMAGES.loyalty_credit,
      title: 'Loyalty Credits',
      rightIcon: IMAGES.rightArrow,
      onPress: () => {
        navigateTo(SEEKER_SCREENS.LoyaltyCredit);
      },
    },
    {
      key: 'language',
      leftIcon: IMAGES.language,
      title: 'Language',
      languageSection: (
        <View style={styles.languageSection}>
          <CustomImage
            source={language === 'en' ? IMAGES.flag : IMAGES.flag2}
            size={hp(20)}
          />
          <CustomImage source={IMAGES.downArrow} size={hp(20)} />
        </View>
      ),
      onPress: () => setIsLanguageModalVisible(true),
    },
    {
      key: 'contact_us',
      leftIcon: IMAGES.phone,
      title: 'Contact us',
      rightIcon: IMAGES.rightArrow,
      whatsappIcon: true,
      onPress: () => {
        const message = encodeURIComponent(
          `Thanks for reaching out to Helpio! How can we help you today?`,
        );
        const url = `whatsapp://send?phone=${appData?.support_phone}&text=${message}`;
        Linking.openURL(url).catch(() => {
          // alert('Make sure WhatsApp is installed on your device');
        });
      },
    },
    {
      key: 'about_us',
      leftIcon: IMAGES.iBtn,
      title: 'About us',
      rightIcon: IMAGES.rightArrow,
      onPress: () => {
        navigateTo(SCREENS.WebViewScreen, {
          url: 'https://helpio.ae',
          title: 'About us',
        });
      },
    },
    {
      key: 'privacy_policy',
      leftIcon: IMAGES.privacy,
      title: 'Privacy Policy',
      rightIcon: IMAGES.rightArrow,
      onPress: () => {
        navigateTo(SCREENS.WebViewScreen, {
          url:
            language === 'en'
              ? 'https://helpio.ae/privacy'
              : 'https://helpio.ae/privacy?lang=ar',
          title: 'Privacy Policy',
        });
      },
    },
    {
      key: 'terms_conditions',
      leftIcon: IMAGES.file,
      title: 'Terms & Conditions',
      rightIcon: IMAGES.rightArrow,
      onPress: () => {
        navigateTo(SCREENS.WebViewScreen, {
          url:
            language === 'en'
              ? 'https://helpio.ae/terms'
              : 'https://helpio.ae/terms?lang=ar',
          title: 'Terms & Conditions',
        });
      },
    },
    {
      key: 'delete_account',
      leftIcon: IMAGES.delete,
      title: 'Delete Account',
      isDelete: true,
      onPress: () => {
        setSelectedModal('DELETE');
        setIsDeleteModalVisible(true);
      },
    },
    {
      key: 'logout',
      leftIcon: IMAGES.newlogout,
      title: 'Logout',
      onPress: () => {
        setSelectedModal('LOGOUT');
        setIsLogoutModalVisible(true);
      },
    },
  ];

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

      // setTimeout(() => {
      //   setIsDeleteModalVisible(false);
      //   resetNavigation(SCREEN_NAMES.OnBoarding);
      // }, 300);
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

  const renderItem = ({item}: any) => (
    <ProfileActionItem
      leftIcon={item.leftIcon}
      title={item.title}
      rightIcon={item.rightIcon}
      languageSection={item.languageSection}
      isDelete={item.isDelete}
      onPress={item.onPress}
      whatsappIcon={item.whatsappIcon}
    />
  );

  return (
    <SafeareaProvider
      loading={isLoading}
      style={{
        flex: 1,
        backgroundColor: Colors.white,
        paddingHorizontal: wp(20),
      }}>
      <BackHeader text="Profile" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <Pressable
          onPress={() => navigateTo(SCREEN_NAMES.UserProfile)}
          style={styles.avatarSection}>
          <CustomImage
            uri={userInfo?.picture}
            size={hp(80)}
            disabled={true}
            containerStyle={styles.avatar}
            resizeMode="stretch"
          />
          <CommonText text={userInfo?.name} style={styles.name} />
        </Pressable>

        <FlatList
          data={ACTIONS}
          keyExtractor={item => item.key}
          renderItem={renderItem}
          scrollEnabled={false}
          contentContainerStyle={styles.actionList}
        />
      </ScrollView>
      <LanguageModal
        visible={isLanguageModalVisible}
        onLanguageSelect={() => handleLanguageSelect()}
        onClose={() => setIsLanguageModalVisible(false)}
      />
      <LogoutDeleteModal
        visible={isLogoutModalVisible}
        image={IMAGES.newlogout}
        buttonTitle="Logout"
        headerText="Ready to Logout?"
        descriptionText="Are you sure want to logout? Make sure all your work is saved."
        onPressClose={closeAllModals}
        onPressConfirm={handleConfirm}
      />

      <LogoutDeleteModal
        visible={isDeleteModalVisible}
        image={IMAGES.delete}
        buttonTitle="Delete"
        headerText="Delete Account"
        descriptionText="Are you sure want to delete your account?"
        onPressClose={closeAllModals}
        onPressConfirm={handleConfirm}
      />
    </SafeareaProvider>
  );
};

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: hp(100),
    },
    avatarSection: {
      alignItems: 'center',
      marginTop: hp(24),
      marginBottom: hp(32),
    },
    avatar: {
      borderRadius: hp(40),
      backgroundColor: Colors._EBFCF4,
      marginBottom: hp(12),
      overflow: 'hidden',
    },
    name: {
      ...commonFontStyle(700, 2.4, Colors.black),
    },
    actionList: {
      marginTop: 0,
    },
    languageSection: {
      ...rowReverseRTL(_language),
      alignItems: 'center',
      gap: wp(2),
    },
  });
};

export default Profile;
