import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function saveImageEditor(data) {
  const token = await AsyncStorage.getItem('token');
  try {
    const response = await axios.patch(
      'https://app.dev.rad.codesmith.space/api/ui/data',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      },
    );
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error making PATCH request:', error);
  }
}

export default saveImageEditor;
