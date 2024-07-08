import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function uploadFile(fileUri, fileName) {
  const token = await AsyncStorage.getItem('token');
  const formData = new FormData();
  formData.append('file', {
    uri: fileUri,
    name: fileName,
    type: 'image/jpg', // Adjust the MIME type if needed
  });

  try {
    const response = await axios.post(
      'https://app.dev.rad.codesmith.space/api/files/files/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

export default uploadFile;
