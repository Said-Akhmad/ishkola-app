import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const ElementSelectDropdown = ({
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
  dictionary,
  formEvents,
  scanBarCode,
  isDictionary,
  conditionVisibility,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(
    choices.map(choice => ({label: choice.label, value: choice.value})),
  );

  if (conditionVisibility !== 'true') {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        width && {width: parseInt(width)},
        height && {height: parseInt(height)},
      ]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        multiple={false}
        disabled={disabled}
        required={required}
        style={styles.dropdown}
        containerStyle={{zIndex: open ? 1000 : 1}}
        dropDownContainerStyle={{zIndex: 1000}}
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
  dropdown: {
    zIndex: 1000,
  },
});

export default ElementSelectDropdown;
