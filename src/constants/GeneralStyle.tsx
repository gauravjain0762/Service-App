import {StyleSheet} from 'react-native';
import {Colors} from './Colors';
import {getFontSize, wp} from '@/utils/responsiveFn';

export const GeneralStyle = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    // paddingHorizontal: wp(25),
    backgroundColor: Colors.white,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  back: {
    marginBottom: getFontSize(2),
    paddingHorizontal: getFontSize(2),
  },
});
