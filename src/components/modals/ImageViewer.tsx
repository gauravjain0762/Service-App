import React from "react";
import {
  Modal,
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  Image,
} from "react-native";
import CustomImage from "../common/CustomImage";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

type Props = {
  visible: boolean;
  imageUri?: string | any;
  onClose: () => void;
  source?: any;
};

const ImageViewer = ({ visible, imageUri, onClose, source }: Props) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.imageWrapper}>
        <CustomImage
          uri={imageUri}
          imageStyle={{ height: "100%", width: "100%" }}
          containerStyle={styles.fullSizeImage}
        />
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    paddingHorizontal: 16,
  },
  fullSizeImage: {
    width: screenWidth - 32,
    height: screenHeight /3,
  },
});

export default ImageViewer;
