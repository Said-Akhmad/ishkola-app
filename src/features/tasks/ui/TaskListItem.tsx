import React from 'react';
import {
  Text,
  StyleSheet,
  TextStyle,
  ViewStyle,
  View,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface TaskListItemProps {
  onPress?: () => void;
  disabled?: boolean;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  task: any;
}

import {Copy} from '../../../shared/assets/icons';

const TaskListItem: React.FC<TaskListItemProps> = ({
  containerStyle,
  textStyle,
  task,
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('TaskEditScreen', {taskId: task.id});
  };

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={handlePress}
      disabled={task.disabled}>
      <View style={styles.row}>
        <Text style={[styles.text, textStyle]}>ID</Text>
        <Copy />
      </View>

      <InfoRow label="Наименование" value={task.objectData.name} />
      <InfoRow
        label="Статус Исполнения"
        value="COMPLETE"
        valueStyle={styles.statusComplete}
        valueContainerStyle={styles.statusContainer}
      />
      <InfoRow label="Дата назначения задачи" value="Текст" />
      <InfoRow
        label="Дата завершения задачи"
        value="10 апреля 2024 г. 18:11:27"
      />
      <InfoRow label="Исполнитель" value="N/A" />
    </TouchableOpacity>
  );
};

interface InfoRowProps {
  label: string;
  value: string;
  valueStyle?: TextStyle;
  valueContainerStyle?: ViewStyle;
}

const InfoRow: React.FC<InfoRowProps> = ({
  label,
  value,
  valueStyle,
  valueContainerStyle,
}) => (
  <View style={styles.row}>
    <Text style={[styles.label, valueContainerStyle && {width: 180}]}>
      {label}
    </Text>
    <View style={[valueContainerStyle, styles.valueContainer]}>
      <Text style={[styles.text, valueStyle]}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
    borderColor: '#ced5db',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  text: {
    color: '#415b77',
  },
  label: {
    width: 180,
  },
  valueContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  statusContainer: {
    width: 100,
    height: 30,
    borderRadius: 5,
    backgroundColor: '#328f32',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusComplete: {
    color: '#fff',
    fontWeight: '700',
  },
});

export default TaskListItem;
