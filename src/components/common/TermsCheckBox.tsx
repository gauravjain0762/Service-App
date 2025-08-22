import React from 'react';
import {StyleSheet, View} from 'react-native';
import CheckBox, {CheckBoxProps} from 'react-native-check-box';
import CommonText from './CommonText';
import {navigateTo} from './commonFunction';
import {SCREENS} from '@/navigation/screenNames';
import {commonFontStyle, getFontSize, hp} from '@/utils/responsiveFn';
import {Colors} from '@/constants/Colors';
import {rowReverseRTL} from '@/utils/arabicStyles';

type Props = {
  isSeeker?: boolean;
  toggleCheckBox: boolean;
  setToggleCheckBox: React.Dispatch<React.SetStateAction<boolean>>;
} & CheckBoxProps;

const TermsCheckBox = ({
  setToggleCheckBox,
  toggleCheckBox,
  isSeeker,
  ...rest
}: Props) => {
  return (
    <View style={styles.midContainer}>
      <CheckBox uncheckedCheckBoxColor="#878787" {...rest}  checkedCheckBoxColor={isSeeker ? Colors.seeker_primary : Colors.provider_primary}/>
      <CommonText onPress={()=>setToggleCheckBox(!toggleCheckBox)} text="I agree to follow the" style={styles.checkBoxText}>
        {' '}
        <CommonText
          onPress={() => navigateTo(SCREENS.TermsWebScreen)}
          text="terms of use"
          style={[
            styles.checkBoxText2,
            {color: isSeeker ? Colors.seeker_primary : Colors.provider_primary},
          ]}
        />
      </CommonText>
    </View>
  );
};

export default TermsCheckBox;

const styles = StyleSheet.create({
  midContainer: {
    gap: 10,
    marginTop: hp(10),
    ...rowReverseRTL(),
    alignItems: 'center',
    marginLeft: getFontSize(0.5),
  },
  checkBoxText: {
    ...commonFontStyle(400, 1.9, Colors._5E5D5D),
  },
  checkBoxText2: {
    ...commonFontStyle(400, 1.9, Colors.provider_primary),
  },
});
