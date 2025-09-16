import {StyleSheet, View} from 'react-native';
import React from 'react';
import {commonFontStyle, getFontSize, hp} from '../../utils/responsiveFn';
import {Colors} from '../../constants/Colors';
import {useTranslation} from 'react-i18next';
import {rowReverseRTL} from '../../utils/arabicStyles';
import {SCREEN_NAMES} from '../../navigation/screenNames';
import {persistor, resetStore} from '../../store';
import {useAppDispatch} from '../../Hooks/hooks';
import {clearToken, setGuestLogin, setGuestUserModal} from '../../features/authSlice';
import BottomModal from '../common/BottomModal';
import {useLogoutMutation} from '@/api/Seeker/authApi';
import {resetNavigation} from '../common/commonFunction';
import CommonText from '../common/CommonText';
import CustomButton from '../common/CustomButton';
import CustomImage from '../common/CustomImage';
import {IMAGES} from '@/assets/images';

interface GuestModal {
  visible: boolean;
}
const GuestModal = ({visible}: GuestModal) => {
  const {i18n} = useTranslation();
  const dispatch = useAppDispatch();
  const [logout, {isLoading: logoutLoading}] = useLogoutMutation();
  const styles = React.useMemo(
    () => getGlobalStyles(i18n.language),
    [i18n.language],
  );
  const onClose = () => {
    dispatch(setGuestUserModal(false));
  };
  const onPressLogin = async (_type: any) => {
    onClose();
    const response = await logout({}).unwrap();
    if (response?.status) {
      resetNavigation(SCREEN_NAMES.OnBoarding);
      resetStore();
      dispatch(clearToken());
    }
    persistor.purge();
    dispatch(setGuestLogin(false));
  };
  return (
    <BottomModal close={false} onClose={onClose} visible={visible}>
      <CustomImage
        size={hp(16)}
        source={IMAGES.close}
        onPress={onClose}
        imageStyle={styles.closeIcon}
      />
      <View style={styles.subContainer}>
        <CommonText
          style={styles.subHeadingText}
          text={'Please login or create new account to use this feature.'}
        />
        <View style={styles.buttonContainer}>
          <CustomButton
            onPress={() => {
              onPressLogin('login');
            }}
            title={'Login'}
            btnStyle={[
              styles.activeButtonStyle,
              {
                backgroundColor: Colors.white,
                borderColor: Colors.black,
                borderWidth: 1,
              },
            ]}
            textStyle={styles.activeButtonTextStyle}
          />
          <CustomButton
            onPress={() => {
              onPressLogin('signup');
            }}
            shadow
            title={'Sign Up'}
            btnStyle={styles.activeButtonStyle}
            textStyle={[styles.activeButtonTextStyle, {color: Colors.white}]}
          />
        </View>
      </View>
    </BottomModal>
  );
};

export default GuestModal;

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
    subContainer: {
      marginTop: getFontSize(2.5),
      marginBottom: getFontSize(4),
    },
    subHeadingText: {
      ...commonFontStyle(400, 2.4, Colors._767676),
      textAlign: 'center',
      marginBottom: getFontSize(2),
    },
    buttonContainer: {
      ...rowReverseRTL(_language),
      alignItems: 'center',
      gap: getFontSize(1.5),
    },
    activeButtonStyle: {
      backgroundColor: Colors.seeker_primary,
      minWidth: '45%',
    },
    activeButtonTextStyle: {
      ...commonFontStyle(500, 2, Colors.black),
    },
    closeIcon: {
      alignSelf: 'flex-end',
    },
  });
};
