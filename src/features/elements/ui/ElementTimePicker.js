import React, {useState} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const ElementTimeInput = ({
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
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  if (conditionVisibility !== 'true') {
    return null;
  }

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === 'ios');
    setTime(currentTime);
    // Handle time change if needed
  };

  const showMode = () => {
    setShowTimePicker(true);
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
          value={time}
          mode="time"
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

export default ElementTimeInput;
