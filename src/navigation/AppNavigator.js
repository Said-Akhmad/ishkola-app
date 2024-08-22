import { Provider, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import WebViewScreen from '../screens/WebViewScreen';
import TabNavigation from './TabNavigation';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const isSignedIn = useSelector(state => state.userData.isSignedIn);

  return (
    
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
                component={WebViewScreen}
                options={{ headerShown: false }}
              />
          </Stack.Navigator>
        </NavigationContainer>
     
  );
};

export default AppNavigator;
