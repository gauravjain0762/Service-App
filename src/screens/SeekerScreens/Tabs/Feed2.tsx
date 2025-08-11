import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {hp} from '@/utils/responsiveFn';
import CustomButton from '@/components/common/CustomButton';
import ConfirmJobModal from '@/components/common/ConfirmJobModal';
import ReviewModal from '@/components/common/ReviewModel';

const Feed2 = () => {
  const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false);
  const [isReviewModalVisible, setIsReviewModalVisible] =
    useState<boolean>(false);

  const openModal = () => {
    setIsSubmitModalVisible(true);
  };

  const handleConfirm = () => {
    setIsSubmitModalVisible(false);
    // setTimeout(() => {
    //   setIsReviewModalVisible(true);
    // }, 500);
  };

  const handleCancel = () => {
    setIsSubmitModalVisible(false);
  };

  return (
    <View style={styles.modalContent}>
      <CustomButton isPrimary="seeker" title={'Model'} onPress={openModal} />

      <ConfirmJobModal
        visible={isSubmitModalVisible}
        onClose={handleCancel}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </View>
  );
};

export default Feed2;

const styles = StyleSheet.create({
  modalContent: {
    marginTop: hp(300),
    paddingHorizontal: hp(20),
  },
});
