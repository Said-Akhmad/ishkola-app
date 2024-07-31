import { Provider, useSelector } from 'react-redux';
import { store } from '../store/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import TabNavigation from './TabNavigation';
import { DarkModeProvider } from '../screens/DarkModeContext';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const isSignedIn = useSelector(state => state.userData.isSignedIn);

  return (
    <Provider store={store}>
      <DarkModeProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {isSignedIn ? (
              <Stack.Screen
                name={'Home'}
                options={{ headerShown: false }}
                component={TabNavigation}
              />
            ) : (
              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
            )}
            <Stack.Screen 
                name="WebViewScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
          </Stack.Navigator>
        </NavigationContainer>
      </DarkModeProvider>
    </Provider>
  );
};

export default AppNavigator;
