import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';

import CustomButton from '@/components/common/CustomButton';
import {Colors} from '@/constants/Colors';
import CommonText from '@/components/common/CommonText';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import {navigateTo} from '@/components/common/commonFunction';
import {SCREENS} from '@/navigation/screenNames';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import CustomCarousel from '@/components/common/CustomCarousel';
import {IMAGES} from '@/assets/images';
import LanguageModal from '@/components/common/LanguageModel';
import {useAppDispatch, useAppSelector} from '@/Hooks/hooks';
import {setIsProvider} from '@/features/authSlice';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {rightRTL, rowReverseRTL, textRTL} from '@/utils/arabicStyles';
import {getAsyncLanguage, setLanguages} from '@/Hooks/asyncStorage';

const OnBoarding = () => {
  const insets = useSafeAreaInsets();
  const {language} = useAppSelector(state => state.auth);
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);
  const dispatch = useAppDispatch();
  const openLanguageModal = () => {
    setIsLanguageModalVisible(true);
  };
  const styles = React.useMemo(() => getGlobalStyles(language), [language]);
  React.useEffect(() => {
    getLanguage();
  }, []);
  const getLanguage = async () => {
    const oldLanguage = await getAsyncLanguage();
    dispatch(setLanguages(oldLanguage));
  };

  const closeLanguageModal = () => {
    setIsLanguageModalVisible(false);
  };

  const handleLanguageSelect = () => {
    closeLanguageModal();
  };

  return (
    <>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={Colors.seeker_primary}
      />
      <SafeareaProvider
        SafeAreaProps={{edges: []}}
        style={{
          paddingTop: insets?.top,
          backgroundColor: Colors.seeker_primary,
        }}>
        <View style={styles.wrapper}>
          <TouchableOpacity
            onPress={openLanguageModal}
            style={styles.topRightContainer}>
            <View style={styles.flagContainer}>
              <Image
                source={language === 'en' ? IMAGES.flag : IMAGES.flag2}
                style={styles.flagIcon}
              />
            </View>
            <View style={styles.dropdownContainer}>
              <Image source={IMAGES.dropDown} style={styles.dropdownIcon} />
            </View>
          </TouchableOpacity>

          <LanguageModal
            visible={isLanguageModalVisible}
            onClose={closeLanguageModal}
            onLanguageSelect={handleLanguageSelect}
          />

          <CustomCarousel />

          <View style={styles.bottomSection}>
            <CommonText
              text="Welcome to Home Services"
              style={styles.heading1}
            />
            <CommonText
              text="Our services is to help you to clean your house as quick as possible."
              style={styles.description}
            />

            <View style={{gap: hp(23)}}>
              <CustomButton
                isPrimary="seeker"
                title={'Service Seeker'}
                onPress={() => {
                  dispatch(setIsProvider(false));
                  navigateTo(SCREENS.SeekerNavigator);
                }}
                textStyle={styles.btnText}
              />
              <CustomButton
                title={'Service Provider'}
                btnStyle={{backgroundColor: Colors.provider_primary}}
                onPress={() => {
                  dispatch(setIsProvider(true));
                  navigateTo(SCREENS.ProviderNavigator, {
                    isProvider: true,
                  });
                }}
                textStyle={styles.btnText}
              />
            </View>
          </View>
        </View>
      </SafeareaProvider>
    </>
  );
};

export default OnBoarding;

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: Colors.white,
    },
    topRightContainer: {
      position: 'absolute',
      top: '2%',
      ...rightRTL(_language, wp(20)),
      ...rowReverseRTL(_language),
      alignItems: 'center',
      zIndex: 10,
      gap: 10,
    },
    flagContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    flagIcon: {
      width: wp(30),
      height: hp(30),
    },
    dropdownContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    dropdownIcon: {
      width: wp(11),
      height: hp(8),
    },
    bottomSection: {
      flex: 1,
      padding: hp(20),
      justifyContent: 'center',
      backgroundColor: Colors.white,
    },
    heading1: {
      // width: '70%',
      lineHeight: 43,
      ...textRTL(_language),
      marginBottom: hp(22),
      ...commonFontStyle(600, 3.4, Colors.black),
    },
    description: {
      marginBottom: hp(40),
      ...commonFontStyle(400, 2, Colors._888888),
      ...textRTL(_language),
    },
    btnText: {...commonFontStyle(600, 2, Colors.white)},
  });
};
