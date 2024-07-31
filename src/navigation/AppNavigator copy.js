import {Provider, useSelector} from 'react-redux';
import React from 'react';
import {store} from '../store/store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import ImageEditorScreen from '../screens/ImageEditorScreen';
import TabNavigation from './TabNavigation';
import TaskEditScreen from '../screens/TaskEditScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const isSignedIn = useSelector(state => state.userData.isSignedIn);

  if (isSignedIn) {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name={'Home'}
              options={{headerShown: false}}
              component={TabNavigation}
            />
            {/* <Stack.Screen
              name={'ImageEditorScreen'}
              options={{headerShown: false}}
              component={ImageEditorScreen}
            />
            <Stack.Screen
              name={'TaskEditScreen'}
              options={{headerShown: false}}
              component={TaskEditScreen}
            /> */}

          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }



  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default AppNavigator;
