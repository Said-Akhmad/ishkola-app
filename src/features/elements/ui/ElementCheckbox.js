import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const ElementCheckbox = props => {
  const {
    id,
    name,
    type,
    align,
    label,
    width,
    height,
    disabled,
    required,
    formEvents,
    conditionVisibility,
  } = props;

  const [isChecked, setIsChecked] = useState(false);

  if (conditionVisibility !== 'true') {
    return null;
  }

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    // You can handle the checked state here if needed
    console.log('Checked state:', !isChecked);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.checkboxContainer, disabled && styles.disabled]}
        onPress={handleCheckboxChange}
        disabled={disabled}>
        <View style={[styles.checkbox, isChecked && styles.checked]} />
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#000',
    marginRight: 10,
  },
  checked: {
    backgroundColor: '#000',
  },
  label: {
    fontSize: 16,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default ElementCheckbox;
