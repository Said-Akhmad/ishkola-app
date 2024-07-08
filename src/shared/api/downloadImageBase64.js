import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const downloadImageBase64 = async id => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(
      `https://app.dev.rad.codesmith.space/api/files/files/download/${id}`,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${token}`,
        },
        responseType: 'blob',
      },
    );

    const blob = await response.data;
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
      reader.onerror = error => {
        console.error('Error converting blob to base64:', error);
        reject(error);
      };
    });
  } catch (error) {
    console.error('Image download failed:', error);
    throw error;
  }
};

export default downloadImageBase64;
