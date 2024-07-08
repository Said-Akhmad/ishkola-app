import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import Header from '../components/Header';
import TaskEdit from 'features/tasks/ui/TaskEdit.tsx';

export default function TaskEditScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Edit Task" />
      <TaskEdit />
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
