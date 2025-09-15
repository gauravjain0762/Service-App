import React from 'react';
import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import CommonText from './CommonText';
import {IMAGES} from '@/assets/images';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import CustomImage from './CustomImage';
import {useAppSelector} from '@/Hooks/hooks';
import {rowReverseRTL, textRTL} from '@/utils/arabicStyles';

type props = {
  text1?: string;
  text2?: string;
  imageSource?: any;
  titleStyle?: ViewStyle;
  subtitleStyle?: ViewStyle;
  style?: StyleProp<ViewStyle>;
  handleCardPress?: () => void;
  bookingId?: any;
};

const RequestCard = ({
  style,
  text1,
  text2,
  titleStyle,
  imageSource,
  subtitleStyle,
  handleCardPress,
  bookingId,
}: props) => {
  const {language} = useAppSelector(state => state.auth);
  const styles = React.useMemo(() => getGlobalStyles(language), [language]);
  return (
    <Pressable onPress={handleCardPress} style={[styles.main, style]}>
      <CustomImage
        source={imageSource ? {uri: imageSource} : IMAGES.dummy}
        imageStyle={{
          width: '100%',
          height: '100%',
        }}
        containerStyle={styles.imageContainer}
      />
      <View style={styles.textContainer}>
        <CommonText
          text={text1 ? text1 : 'AC Regular Services'}
          style={[styles.title, titleStyle]}
        />
        <CommonText
          text={text2 ? text2 : '1 Ton - 1.5 Ton x3'}
          style={[styles.subtitle, subtitleStyle]}
        />
        {bookingId && (
          <CommonText
            text={`${'Booking Ref' + ' ' + '#' + bookingId}`}
            style={[styles.subtitle, {color: Colors.seeker_primary}]}
          />
        )}
      </View>
    </Pressable>
  );
};

export default RequestCard;

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
    main: {
      gap: wp(14),
      width: '100%',
      ...rowReverseRTL(_language),
      alignItems: 'center',
      borderRadius: hp(30),
      paddingVertical: hp(13),
      paddingHorizontal: hp(18),
      backgroundColor: Colors.seeker_primary,
    },
    imageContainer: {
      width: wp(72),
      height: hp(72),
      borderRadius: hp(72),
      backgroundColor: Colors.white,
      overflow: 'hidden',
    },
    textContainer: {
      flexShrink: 1,
      gap: hp(5),
    },
    title: {
      ...commonFontStyle(600, 2.1, Colors.white),
      ...textRTL(_language),
    },
    subtitle: {
      ...commonFontStyle(400, 1.8, Colors.white),
      ...textRTL(_language),
    },
  });
};
