import React, {useState} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const ElementDatePicker = ({
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
}) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  if (conditionVisibility !== 'true') {
    return null;
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
    // Handle date change if needed
  };

  const showMode = () => {
    setShowDatePicker(true);
  };

  return (
    <View
      style={[
        styles.container,
        width && {width: parseInt(width)},
        height && {height: parseInt(height)},
      ]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View>
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
          disabled={disabled}
        />
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
});

export default ElementDatePicker;
