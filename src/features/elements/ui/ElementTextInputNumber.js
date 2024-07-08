import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const ElementTextInputNumber = ({
  id,
  max,
  min,
  name,
  type,
  align,
  label,
  width,
  height,
  disabled,
  required,
  formEvents,
  // placeholder,
  conditionVisibility,
}) => {
  if (conditionVisibility !== 'true') {
    return null;
  }

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.textInput,
          width && {width: parseInt(width)},
          height && {height: parseInt(height)},
          align && {textAlign: align},
        ]}
        editable={!disabled}
        // placeholder={placeholder}
        keyboardType="numeric"
        maxLength={String(max).length}
        accessibilityLabel={label}
        {...formEvents.reduce(
          (acc, event) => ({...acc, [event.type]: event.handler}),
          {},
        )}
      />
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
  textInput: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    borderRadius: 5,
  },
});

export default ElementTextInputNumber;
