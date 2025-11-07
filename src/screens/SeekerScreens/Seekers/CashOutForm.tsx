import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import BackHeader from '@/components/common/BackHeader';
import {GeneralStyle} from '@/constants/GeneralStyle';
import {useAppSelector} from '@/Hooks/hooks';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getFontSize, hp} from '@/utils/responsiveFn';
import {Colors} from '@/constants/Colors';
import CustomTextInput from '@/components/common/CustomTextInput';
import {useUpdateProfileMutation} from '@/api/Seeker/profileApi';
import {errorToast, goBack} from '@/components/common/commonFunction';
import CustomButton from '@/components/common/CustomButton';
import {useKeyboard} from '@/Hooks/useKeyboard';

const CashOutForm = () => {
  const {language, userInfo} = useAppSelector((state: any) => state.auth);
  const styles = React.useMemo(() => getGlobalStyles(language), [language]);
  const {keyboardVisible} = useKeyboard();
  const [updateProfile, {isLoading}] = useUpdateProfileMutation();
  const [updateBank, setUpdateBank] = React.useState({
    bank_name: userInfo?.bank_info?.bank_name ?? '',
    account_holder_name: userInfo?.bank_info?.account_holder_name ?? '',
    account_number: userInfo?.bank_info?.account_number ?? '',
    iban: userInfo?.bank_info?.iban ?? '',
    swift_code: userInfo?.bank_info?.swift_code ?? '',
  });
  console.log(userInfo, 'userInfo');

  const handleUpdate = async () => {
    try {
      if (!updateBank?.bank_name.trim()) {
        errorToast('Enter a bank name');
      } else if (!updateBank?.account_holder_name.trim()) {
        errorToast('Enter a account holder name');
      } else if (!updateBank?.iban.trim()) {
        errorToast('Enter a iban');
      } else {
        const formData = new FormData();
        // formData.append('bank_name', updateBank?.bank_name);
        // formData.append('account_holder_name', updateBank?.account_holder_name);
        // formData.append('iban', updateBank?.iban);
        formData.append(
          'bank_info',
          JSON.stringify({
            bank_name: updateBank?.bank_name,
            account_holder_name: updateBank?.account_holder_name,
            iban: updateBank?.iban,
          }),
        );
        const response = await updateProfile(formData).unwrap();
        if (response?.status) {
          goBack();
        } else {
          errorToast(response?.message);
        }
      }
    } catch (error: any) {
      console.log(error);
      errorToast(
        error?.message || error?.data?.message || 'Something went wrong',
      );
    }
  };
  return (
    <SafeareaProvider>
      <BackHeader text={'Cashback'} style={GeneralStyle.back} />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>
        <KeyboardAwareScrollView
          nestedScrollEnabled
          enableResetScrollToCoords={false}
          keyboardShouldPersistTaps="handled"
          style={styles.container}
          contentContainerStyle={{
            paddingBottom: hp(30),
            flexGrow: 1,
            justifyContent: 'space-between',
          }}
          enableOnAndroid
          extraScrollHeight={Platform.OS === 'ios' ? 0 : 50}
          showsVerticalScrollIndicator={false}>
          <View style={{rowGap: 30}}>
            <CustomTextInput
              label="Bank name"
              placeholder="Enter Bank name"
              value={updateBank?.bank_name}
              onChangeText={e => {
                setUpdateBank({...updateBank, bank_name: e});
              }}
            />
            <CustomTextInput
              label="Account Holder name"
              placeholder="Enter account holder name"
              value={updateBank?.account_holder_name}
              onChangeText={e => {
                setUpdateBank({...updateBank, account_holder_name: e});
              }}
            />
            <CustomTextInput
              label="Iban"
              placeholder="Enter iban"
              value={updateBank?.iban}
              onChangeText={e => {
                setUpdateBank({...updateBank, iban: e});
              }}
            />
          </View>
          <View style={[{paddingHorizontal: 20}]}>
            <CustomButton
              isPrimary="seeker"
              loading={isLoading}
              title={'Submit'}
              onPress={handleUpdate}
            />
          </View>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </SafeareaProvider>
  );
};

export default CashOutForm;

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
      paddingHorizontal: getFontSize(2.2),
      paddingTop: getFontSize(3),
    },
  });
};
