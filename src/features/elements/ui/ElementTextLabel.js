import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ElementTextLabel = ({
  id,
  text,
  type,
  align,
  width,
  height,
  formEvents,
  conditionVisibility,
}) => {
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
      <Text
        style={[styles.text, align && {textAlign: align}]}
        {...formEvents.reduce(
          (acc, event) => ({...acc, [event.type]: event.handler}),
          {},
        )}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  text: {
    fontSize: 14, // smaller font size for label
  },
});

export default ElementTextLabel;
