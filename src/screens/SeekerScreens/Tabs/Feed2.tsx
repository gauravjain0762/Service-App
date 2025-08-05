import {StyleSheet, View} from 'react-native'
import React, {useState} from 'react'
import CustomButton from '@/components/common/CustomButton'
import { hp } from '@/utils/responsiveFn'
import ConfirmJobModal from '@/components/common/ConfirmJobModal'

const Feed2 = () => {
  const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false)

  const openModal = () => {
    setIsSubmitModalVisible(true)
  }

  const closeModal = () => {
    setIsSubmitModalVisible(false)
  }

  const handleConfirm = () => {
    closeModal()
  }

  const handleCancel = () => {
    closeModal()
  }

  return (
    <View style={styles.modalContent}>
      <CustomButton isPrimary='seeker' title={'Model'} onPress={openModal} />

      <ConfirmJobModal
        visible={isSubmitModalVisible}
        onClose={closeModal}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </View>
  )
}

export default Feed2

const styles = StyleSheet.create({
  modalContent: {
    marginTop: hp(300), 
    paddingHorizontal: hp(20)
  },
})
