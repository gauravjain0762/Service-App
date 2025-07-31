import {StyleSheet} from 'react-native';
import {wp} from '@/utils/responsiveFn';
import {Colors} from '@/constants/Colors';

export const AppStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
  side: {
    paddingHorizontal: wp(32),
  },
  mainSide: {
    marginHorizontal: wp(32),
  },
  mainWhiteContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
