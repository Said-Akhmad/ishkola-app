import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const ElementRadioButtons = props => {
  const {
    id,
    name,
    type,
    align,
    label,
    width,
    height,
    choices,
    disabled,
    required,
    formEvents,
    conditionVisibility,
  } = props;

  const [selectedValue, setSelectedValue] = useState(null);

  if (conditionVisibility !== 'true') {
    return null;
  }

  const handleRadioButtonChange = value => {
    setSelectedValue(value);
    // You can handle the selected value here if needed
    console.log('Selected value:', value);
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.radioContainer}>
        {choices.map((choice, index) => (
          <TouchableOpacity
            key={index}
            style={styles.radioItem}
            onPress={() => handleRadioButtonChange(choice.value)}
            disabled={disabled}>
            <View style={styles.radioCircle}>
              {selectedValue === choice.value && (
                <View style={styles.selectedRadioCircle} />
              )}
            </View>
            <Text>{choice.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  label: {
    marginBottom: 5,
  },
  radioContainer: {
    flexDirection: 'column',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRadioCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
});

export default ElementRadioButtons;
