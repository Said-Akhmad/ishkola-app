import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginAction = token => {
  AsyncStorage.setItem('token', token);
  return {
    type: 'LOGIN',
    payload: true,
  };
};

export const logoutAction = () => {
  AsyncStorage.removeItem('token');
  return {
    type: 'LOGIN',
    payload: false,
  };
};
