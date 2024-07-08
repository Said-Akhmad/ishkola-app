import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const GridAngle = ({initialAngle = 0, increment = 15}) => {
  const elements = [];

  for (let i = 0; i < 7; i++) {
    const angle = initialAngle + i * increment;
    elements.push(
      <View key={i} style={styles.element}>
        <Text style={styles.text}>{angle}°</Text>
      </View>,
    );
  }

  return <View style={styles.container}>{elements}</View>;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 100,
    top: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  element: {
    padding: 10,
    paddingVertical: 5,
    backgroundColor: '#6e6e6e',
    borderRadius: 5,
  },
  text: {
    fontSize: 14,
    color: '#fff',
  },
});

export default GridAngle;
