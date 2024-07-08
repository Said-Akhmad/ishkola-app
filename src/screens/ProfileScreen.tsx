import React from 'react';
import {StyleSheet, SafeAreaView, Text, View} from 'react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Данная страница пуста</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    marginTop: 20,
    marginLeft: 10,
  },
  text: {
    fontSize: 16,
  },
});
