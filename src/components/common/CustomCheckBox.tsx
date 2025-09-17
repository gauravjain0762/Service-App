import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {useState} from 'react';
import { useAppSelector } from '@/Hooks/hooks';
import { rowReverseRTL } from '@/utils/arabicStyles';

const CustomCheckBox = ({
  onChange,
  checked,
}: {
  text: string;
  onChange: (checked: boolean) => void;
  checked: boolean;
}) => {
  const {language} = useAppSelector(state => state.auth);
    const styles = React.useMemo(() => getGlobalStyles(language), [language]);
  const [isChecked, setIsChecked] = useState(checked);

  const checkBoxStyle = isChecked ? styles.checkedBox : styles.unCheckedBox;

  const handlePress = () => {
    setIsChecked(!isChecked);
    onChange(!isChecked);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={checkBoxStyle} />
    </TouchableOpacity>
  );
};

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
  container: {
    ...rowReverseRTL(_language),
    alignItems: 'center',
  },
  checkedBox: {
    width: 20,
    height: 20,
    borderColor: '#000',
    borderWidth: 1,
    backgroundColor: '#000',
  },
  unCheckedBox: {
    width: 20,
    height: 20,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  text: {
    marginLeft: 10,
  },
})}

export default CustomCheckBox;
