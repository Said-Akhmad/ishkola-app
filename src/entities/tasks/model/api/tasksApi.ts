import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const getTasks = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(
      'https://app.dev.rad.codesmith.space/api/ui/data/all',
      {
        params: {
          metaId: 'process_tasks_data',
          pageNumber: 0,
          pageSize: 10,
          orderBy: '"object_data"->>\'assignedTime\' DESC',
          where: '',
        },
        headers: {
          authorization: `${token}`,
        },
      },
    );
    console.log('Fetch data response:', response.data);

    return response;
    // Обработка ответа, если необходимо
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const getTask = async (taskId: string) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(
      'https://app.dev.rad.codesmith.space/api/ui/forms/' + taskId,
      {
        headers: {
          authorization: `${token}`,
        },
      },
    );
    console.log('Fetch data response:', response.data);

    return response;
    // Обработка ответа, если необходимо
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export default {
  getTasks,
  getTask,
};
