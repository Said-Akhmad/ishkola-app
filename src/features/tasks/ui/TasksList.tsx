import React, {useEffect, useCallback, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import TaskListItem from './TaskListItem';
import {useDispatch, useSelector} from 'react-redux';
import {getTasks} from 'entities/tasks/model/services/getTasks';

const TasksList: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: any) => state.tasks); // Используйте RootState для типизации состояния
  const [refreshing, setRefreshing] = useState(false);

  const fetchTasks = useCallback(async () => {
    setRefreshing(true);
    await dispatch(getTasks() as any);
    setRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (tasks.loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (tasks.error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading tasks: {tasks.error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={tasks.data}
      keyExtractor={item => item.id.toString()} // Убедитесь, что ключ уникален
      contentContainerStyle={{padding: 10}}
      renderItem={({item}) => <TaskListItem task={item} />}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchTasks} />
      }
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
  buttonContainer: {
    width: 250,
    height: 56,
    borderRadius: 40,
    backgroundColor: '#31D6D6',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TasksList;
