import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WebViewScreen from '../screens/WebViewScreen';
import { Image, Text } from 'react-native';
import { DarkModeContext } from '../screens/DarkModeContext';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const { isDarkened } = useContext(DarkModeContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 70,
          backgroundColor: isDarkened ? '#283046' : 'white',
        },
      }}
    >
      <Tab.Screen
        name="Главная"
        component={WebViewScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image                                                                      
              source={require('../Images/home.png')}
              style={{ marginTop: 10, width: 20, height: 20, tintColor: isDarkened ?(focused ? '#7367f0' : '#d0d2d6'):(focused ? '#7367f0' : '#625f6e') }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              // numberOfLines={1}
              // adjustsFontSizeToFit
              style={{
                fontFamily: 'Montserrat-Regular',
                marginBottom: 10,
                textAlign: 'center',
                fontSize: 14,
                width: 100,
                flexWrap: 'nowrap',
                color: isDarkened ?(focused ? '#7367f0' : '#d0d2d6'):(focused ? '#7367f0' : '#625f6e'),
              }}
            >
              Главная
            </Text>
          ),
          headerShown: false,
        }}
        initialParams={{
          url: 'https://lk.ishkola.com/home',
        }}
      />
      <Tab.Screen
        name="All"
        component={WebViewScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../Images/allClasses.png')}
              style={{ marginTop: 10, width: 20, height: 20, tintColor: isDarkened ?(focused ? '#7367f0' : '#d0d2d6'):(focused ? '#7367f0' : '#625f6e') }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              // numberOfLines={1}
              // adjustsFontSizeToFit
              style={{
                fontFamily: 'Montserrat-Regular',
                marginBottom: 10,
                textAlign: 'center',
                fontSize: 14,
                width: 100,
                flexWrap: 'nowrap',
                color: isDarkened ?(focused ? '#7367f0' : '#d0d2d6'):(focused ? '#7367f0' : '#625f6e')
              }}
            >
              Все занятия
            </Text>
          ),
          headerShown: false,
        }}
        initialParams={{
          url: 'https://lk.ishkola.com/all-lessons',
        }}
      />
      <Tab.Screen
        name="Платежи"
        component={WebViewScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <Image
                  source={require('../Images/payments.png')}
                  style={{marginTop:10,width: 20, height: 20, tintColor: isDarkened ?(focused ? '#7367f0' : '#d0d2d6'):(focused ? '#7367f0' : '#625f6e') }}
                />
              ),
              tabBarLabel: ({ focused }) => (
                <Text
                  // numberOfLines={1}
                  // adjustsFontSizeToFit
                  style={{ 
                    fontFamily: 'Montserrat-Regular',
                    marginBottom:10,
                    textAlign: 'center',
                    fontSize: 14,
                    width: 100, // Увеличенная ширина
                    flexWrap: 'nowrap', // Предотвращает перенос текста
                    color: isDarkened ?(focused ? '#7367f0' : '#d0d2d6'):(focused ? '#7367f0' : '#625f6e')
                  }}
                >
                      Платежи
                </Text>
              ),
              headerShown: false,
            }}
        initialParams={{
          url: 'https://lk.ishkola.com/payments',
        }}
      />
        <Tab.Screen
        name="Faq"
        component={WebViewScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../Images/faq.png')}
                style={{
                marginTop:10,
                width: 20,
                height: 20,
                tintColor: isDarkened ?(focused ? '#7367f0' : '#d0d2d6'):(focused ? '#7367f0' : '#625f6e'),
              }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              // numberOfLines={1}
              // adjustsFontSizeToFit
              style={{
                marginBottom:10,
                fontFamily: 'Montserrat-Regular',
                textAlign: 'center',
                fontSize: 14,
                width:100, // Увеличенная ширина
                flexWrap: 'nowrap', // Предотвращает перенос текста
                color: isDarkened ?(focused ? '#7367f0' : '#d0d2d6'):(focused ? '#7367f0' : '#625f6e')
              }}
            >
              FAQ
            </Text>
          ),
          headerShown: false,
        }}
        initialParams={{
          url: 'https://lk.ishkola.com/faq',
        }}
      />

      {/* Другие Tab.Screen компоненты */}
    </Tab.Navigator>
  );
};

export default TabNavigation;
