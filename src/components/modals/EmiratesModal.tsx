/* eslint-disable react/no-unstable-nested-components */
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../constants/Colors';
import {commonFontStyle, getFontSize, hp, wp} from '../../utils/responsiveFn';
import {IMAGES} from '../../assets/images';
import {rowReverseRTL} from '../../utils/arabicStyles';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import CommonText from '../common/CommonText';
import CustomImage from '../common/CustomImage';
import BottomModal from '../common/BottomModal';
import {getLocalizedText} from '../common/commonFunction';
import CustomButton from '../common/CustomButton';
interface EmiratesModal {
  visible: boolean;
  onClose: () => void | any;
  onChangeEmirates?: any;
  selectedEmirates?: any;
  isProvider?: boolean;
}

const EmiratesModal = ({
  onClose,
  visible,
  onChangeEmirates,
  selectedEmirates = [],
  isProvider,
}: EmiratesModal) => {
  const {i18n} = useTranslation();
  const {emirates, language} = useSelector((state: RootState) => state.auth);
  const [tempSelectedEmirates, setTempSelectedEmirates] =
    React.useState<any[]>(selectedEmirates);
  React.useEffect(() => {
    setTempSelectedEmirates(selectedEmirates);
  }, [selectedEmirates]);

  const handleEmirateSelection = (item: any) => {
    setTempSelectedEmirates(prev => {
      const isAlreadySelected = prev.some(emirate => emirate._id === item._id);
      if (isAlreadySelected) {
        // Remove if already selected
        return prev.filter(emirate => emirate._id !== item._id);
      } else {
        return [...prev, item];
      }
    });
  };
  const isEmirateSelected = (item: any) => {
    return tempSelectedEmirates.some(emirate => emirate._id === item._id);
  };

  const styles = React.useMemo(
    () => getGlobalStyles(i18n.language),
    [i18n.language],
  );
  const renderLanguageItem = ({item}: any) => {
    const isSelected = isEmirateSelected(item);

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => handleEmirateSelection(item)}>
        <CommonText
          numberOfLines={2}
          style={styles.title}
          text={getLocalizedText(item?.name, item?.name_ar, language)}
        />
        <View
          style={[
            styles.radioButton,
            {
              borderColor: isProvider
                ? Colors.provider_primary
                : Colors.seeker_primary,
            },
          ]}>
          {isSelected && (
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
    );
  };
  const handleConfirm = () => {
     if (onChangeEmirates) {
      onChangeEmirates(tempSelectedEmirates);
    }
    onClose();
  };
  return (
    <BottomModal
      visible={visible}
      onClose={onClose}
      style={styles.modalContainer}>
      <View style={styles.header}>
        <CommonText text="Select Emirates" style={styles.title} />
        <CustomImage
          source={IMAGES.close2}
          onPress={onClose}
          imageStyle={styles.closeIcon}
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={emirates}
        renderItem={renderLanguageItem}
        contentContainerStyle={{
          paddingVertical: getFontSize(2),
          rowGap: getFontSize(1),
        }}
        ListFooterComponent={() => {
          return (
            <>
              <CustomButton
                title={`Confirm`}
                onPress={handleConfirm}
                btnStyle={[
                  styles.button,
                  styles.confirmButton,
                  {
                    backgroundColor: isProvider
                      ? Colors.provider_primary
                      : Colors.seeker_primary,
                  },
                ]}
              />
            </>
          );
        }}
      />
    </BottomModal>
  );
};

export default EmiratesModal;

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
    container: {},
    header: {
      ...rowReverseRTL(_language),
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
    modalContainer: {
      paddingTop: hp(30),
      paddingBottom: hp(40),
      paddingHorizontal: wp(20),
      maxHeight: '70%',
    },
    itemContainer: {
      ...rowReverseRTL(_language),
      alignItems: 'center',
      paddingVertical: getFontSize(1),
      justifyContent: 'space-between',
    },
    topLeftContainer: {
      flex: 1,
      ...rowReverseRTL(_language),
      alignItems: 'center',
      gap: getFontSize(2),
    },
    title: {
      ...commonFontStyle(400, 2.1, Colors.black),
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
};
