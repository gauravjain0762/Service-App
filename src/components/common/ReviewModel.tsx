import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, getFontSize, hp, wp} from '@/utils/responsiveFn';
import CommonText from '@/components/common/CommonText';
import {IMAGES} from '@/assets/images';
import BottomModal from '@/components/common/BottomModal';

Dimensions.get('window');

type ReviewModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (rating: number, tags: string[]) => void;
};

const tags = [
  'Happy',
  'Not Happy',
  'Satisfied',
  'Not Professional',
  'Good Service',
];

const ReviewModal = ({visible, onClose}: ReviewModalProps) => {
  const [] = useState(5);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag],
    );
  };
  return (
    <BottomModal
      close
      visible={visible}
      onClose={onClose}
      onPressCancel={onClose}
      style={styles.modalContainer}>
      <CommonText text="Review" style={styles.title} />

      <View style={styles.rowText}>
        <CommonText text="How was your rate?" style={styles.description} />
      </View>
      <Image source={IMAGES.stars} style={styles.stars} />

      <View style={styles.tagsWrapper}>
        {tags.map(tag => (
          <TouchableOpacity
            key={tag}
            style={[
              styles.tag,
              selectedTags.includes(tag) && styles.tagSelected,
            ]}
            onPress={() => toggleTag(tag)}>
            <Text
              style={[
                styles.tagText,
                selectedTags.includes(tag) && styles.tagTextSelected,
              ]}>
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={onClose}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </BottomModal>
  );
};

export default ReviewModal;

const styles = StyleSheet.create({
  modalContainer: {
    paddingTop: hp(40),
    paddingBottom: hp(40),
    paddingHorizontal: wp(20),
    alignItems: 'center',
  },
  title: {
    ...commonFontStyle(700, 2.7, Colors.black),
    textAlign: 'center',
    marginBottom: hp(18),
  },
  description: {
    ...commonFontStyle(500, 2.1, '#000000'),
    textAlign: 'center',
    marginBottom: hp(10),
  },
  rowText: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  stars: {
    width: wp(220),
    height: hp(80),
    alignSelf: 'center',
  },
  tagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: wp(10),
    marginTop: hp(20),
    marginBottom: hp(20),
  },
  tag: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: hp(30),
    paddingHorizontal: wp(18),
    paddingVertical: hp(10),
    marginBottom: hp(10),
    backgroundColor: Colors.white,
  },
  tagSelected: {
    borderColor: Colors.seeker_primary,
    backgroundColor: '#E6F9F0',
  },
  tagText: {
    ...commonFontStyle(500, 1.7, Colors.black),
    textAlign: 'center',
  },
  tagTextSelected: {
    ...commonFontStyle(500, 1.7, Colors.black),
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(10),
  },
  submitButton: {
    backgroundColor: Colors.seeker_primary,
    borderRadius: hp(30),
    paddingVertical: hp(15),
    width: '100%',
    alignItems: 'center',
  },
  submitButtonText: {
    ...commonFontStyle(600, 2.1, Colors.white),
  },
});
