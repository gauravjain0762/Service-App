import React, {useState} from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native'
import {Colors} from '@/constants/Colors'
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn'
import CommonText from '@/components/common/CommonText'
import {IMAGES} from '@/assets/images'
import BottomModal from '@/components/common/BottomModal'
import CustomImage from './CustomImage'

Dimensions.get('window')

type LanguageModalProps = {
  visible: boolean
  onClose: () => void
  onLanguageSelect: (language: string) => void
}

const LanguageModal = ({
  visible,
  onClose,
  onLanguageSelect,
}: LanguageModalProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState('English')

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language)
    onLanguageSelect(language)
  }

  return (
    <BottomModal
      visible={visible}
      onClose={onClose}
      showCloseButton={false}
      style={styles.modalContainer}>
      <View style={styles.selectLanTitle}>
        <CommonText text='Select Language' style={styles.title} />
        <CustomImage
          source={IMAGES.close2}
          onPress={onClose}
          imageStyle={{width: wp(20), height: hp(20)}}
        />
      </View>
      <View style={styles.languageContainer}>
        <TouchableOpacity
          style={styles.languageOption}
          onPress={() => handleLanguageSelect('English')}>
          <View style={styles.languageInfo}>
            <Image source={IMAGES.flag} style={styles.flagIcon} />
            <CommonText text='English' style={styles.languageText} />
          </View>
          <View
            style={[
              styles.radioButton,
              selectedLanguage === 'English' && styles.radioButtonSelected,
            ]}>
            {selectedLanguage === 'English' && (
              <View style={styles.radioButtonInner} />
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.languageOption}
          onPress={() => handleLanguageSelect('Arabic')}>
          <View style={styles.languageInfo}>
            <Image source={IMAGES.flag2} style={styles.flagIcon} />
            <CommonText text='Arabic' style={styles.languageText} />
          </View>
          <View
            style={[
              styles.radioButton,
              selectedLanguage === 'Arabic' && styles.radioButtonSelected,
            ]}>
            {selectedLanguage === 'Arabic' && (
              <View style={styles.radioButtonInner} />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </BottomModal>
  )
}

export default LanguageModal

const styles = StyleSheet.create({
  modalContainer: {
    paddingTop: hp(30),
    paddingBottom: hp(40),
    paddingHorizontal: wp(20),
  },
  selectLanTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(15),
  },
  title: {
    ...commonFontStyle(600, 2.4, Colors.black),
    textAlign: 'center',
    marginBottom: hp(15),
  },
  languageContainer: {
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
    borderColor: Colors.seeker_primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: '#03B463',
  },
  radioButtonInner: {
    width: wp(10),
    height: hp(10),
    borderRadius: wp(5),
    backgroundColor: '#03B463',
  },
})
