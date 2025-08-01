import {StyleSheet} from 'react-native';
import {Colors} from './Colors';
import {wp} from '@/utils/responsiveFn';

export const GeneralStyle = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: wp(20),
    backgroundColor: Colors.white,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
