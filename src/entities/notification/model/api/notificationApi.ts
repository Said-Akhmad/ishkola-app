import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import { Alert } from 'react-native';

export const setToken = async (fcmToken: string) => {
 
  try {
    // Получаем токен из AsyncStorage и обрабатываем возможное значение null
    const storedToken = await AsyncStorage.getItem('token');

    console.log('3 token: ',storedToken);
    
    let deviceId = await DeviceInfo.getUniqueId();
    console.log('4 Device ID: ', deviceId);
    const body = {
      firebase_token: fcmToken,
      device_id: deviceId,
      permission: 'granted'
    }
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${storedToken}`,
     'Content-Type': 'application/json',
    }
    console.log('5 Body and Headers: ',body,' ',headers)
    const response = await axios.post(

      'https://api-dev.ishkola.com/api/v1/web-push/subscribe-app',
      body,
      {
        headers
      },
    );
    console.log('6 Response: ',response)    
    Alert.alert(
      "Подписка на уведомления",  // Заголовок
      response.data.success,      // Сообщение
      [{ text: "OK", onPress: () => console.log("OK Pressed") }], // Кнопка
      { cancelable: true }       // Опция, чтобы можно было закрыть нажатием вне диалога
    );

    // Обработка ответа, если необходимо
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.message)
    } else {
      console.error('Unexpected error:', error.message);
    }
  }
};
