import React from 'react';
import {StyleSheet, SafeAreaView, Text, View} from 'react-native';
import {TasksList} from '../features/tasks';

export default function TasksScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Мои задачи (оффлайн доступ)</Text>
      </View>
      <TasksList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 20,
    marginLeft: 10,
  },
  text: {
    fontSize: 16,
  },
});
