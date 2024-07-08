import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';

export const MultiLineTextInput = ({
  label = 'Enter your text:',
  placeholder = 'Type something...',
  numberOfLines = 2,
  value = 'Здесь ваш текст',
  onChangeText,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        multiline={true}
        numberOfLines={numberOfLines}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        textAlignVertical="top"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  textInput: {
    height: 50,
    borderColor: 'gray',
    color: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
  },
});
