// store.js
import {combineReducers, createStore, applyMiddleware} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Используйте AsyncStorage для React Native
import thunk from 'redux-thunk'; // Импортируйте redux-thunk

import userReducer from './userReducer';
import tasksReducer from 'entities/tasks/model/store/tasksReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage, // Укажите AsyncStorage как хранилище
  whitelist: ['userData'], // Укажите, какие данные хотите сохранить в "белом списке"
  blacklist: [''],
};

const rootReducer = combineReducers({
  userData: userReducer,
  tasks: tasksReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Примените middleware redux-thunk при создании хранилища
export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
