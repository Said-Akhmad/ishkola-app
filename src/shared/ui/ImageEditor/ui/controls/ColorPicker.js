import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

const colors = ['black', 'red', 'green', 'blue', 'yellow', 'orange', 'purple'];

export const ColorPicker = ({selectedColor, onSelectColor}) => {
  return (
    <View style={styles.container}>
      {colors.map(color => (
        <TouchableOpacity
          key={color}
          style={[
            styles.colorButton,
            {backgroundColor: color},
            selectedColor === color && styles.selectedColorButton,
          ]}
          onPress={() => onSelectColor(color)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
  selectedColorButton: {
    borderWidth: 3,
    borderColor: 'black',
  },
});
