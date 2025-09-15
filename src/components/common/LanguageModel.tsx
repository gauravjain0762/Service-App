import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import CommonText from '@/components/common/CommonText';
import {IMAGES} from '@/assets/images';
import BottomModal from '@/components/common/BottomModal';
import CustomImage from './CustomImage';
import { setLanguages } from '@/Hooks/asyncStorage';
import { useAppDispatch } from '@/Hooks/hooks';

type LanguageModalProps = {
  visible: boolean;
  isProvider?: boolean;
  onClose: () => void;
  onLanguageSelect: (language: string) => void;
};

const LanguageModal = ({
  visible,
  onClose,
  isProvider,
  onLanguageSelect,
}: LanguageModalProps) => {
  const dispatch = useAppDispatch();
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    onLanguageSelect(language);
    if (language == 'Arabic') {
      dispatch(setLanguages('ar'));
    } else {
      dispatch(setLanguages('en'));
    }
  };

  return (
    <BottomModal
      visible={visible}
      onClose={onClose}
      style={styles.modalContainer}>
      <View style={styles.header}>
        <CommonText text="Select Language" style={styles.title} />
        <CustomImage
          source={IMAGES.close2}
          onPress={onClose}
          imageStyle={styles.closeIcon}
        />
      </View>

      <View>
        {[
          {label: 'English', flag: IMAGES.flag},
          {label: 'Arabic', flag: IMAGES.flag2},
        ].map(({label, flag}) => (
          <TouchableOpacity
            key={label}
            style={styles.languageOption}
            onPress={() => handleLanguageSelect(label)}>
            <View style={styles.languageInfo}>
              <Image source={flag} style={styles.flagIcon} />
              <CommonText text={label} style={styles.languageText} />
            </View>

            <View
              style={[
                styles.radioButton,
                {
                  borderColor: isProvider
                    ? Colors.provider_primary
                    : Colors.seeker_primary,
                },
              ]}>
              {selectedLanguage === label && (
                <View
                  style={[
                    styles.radioButtonInner,
                    {
                      backgroundColor: isProvider
                        ? Colors.provider_primary
                        : Colors.seeker_primary,
                    },
                  ]}
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </BottomModal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    paddingTop: hp(30),
    paddingBottom: hp(40),
    paddingHorizontal: wp(20),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(15),
    marginBottom: hp(15),
  },
  title: {
    ...commonFontStyle(600, 2.4, Colors.black),
  },
  closeIcon: {
    width: wp(20),
    height: hp(20),
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(15),
    paddingHorizontal: wp(15),
  },
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(15),
  },
  flagIcon: {
    width: wp(30),
    height: hp(30),
    resizeMode: 'contain',
  },
  languageText: {
    ...commonFontStyle(500, 2.0, Colors.black),
  },
  radioButton: {
    width: wp(25),
    height: hp(25),
    borderRadius: wp(100),
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonInner: {
    width: wp(10),
    height: hp(10),
    borderRadius: wp(5),
  },
});

export default LanguageModal;
