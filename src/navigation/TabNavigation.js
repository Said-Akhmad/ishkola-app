import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text } from 'react-native';
import React, { useRef } from 'react';
import { useNavigation, TabActions } from '@react-navigation/native';
import WebViewScreen from '../screens/WebViewScreen';


const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const navigation = useNavigation();

  const handleTabPress = (routeName) => {
    const state = navigation.getState();
    const currentRoute = state.routes[state.index];
    const isFocused = currentRoute.name === routeName;

    if (isFocused) {
      // Если пользователь уже на нужном скрине, возвращаем WebView назад, если возможно
      navigation.navigate(routeName, {
        action: 'goBack',
      });
    } else {
      // Переходим на нужный скрин
      navigation.navigate(routeName);
    }
  };

  const screenOptions = (routeName, iconName) => ({
    tabBarIcon: ({ focused }) => (
      <Image
        source={iconName}
        style={{
          marginTop: 10,
          width: 20,
          height: 20,
          tintColor: focused ? '#7367f0' : '#625f6e',
        }}
      />
    ),
    tabBarLabel: ({ focused }) => (
      <Text
        style={{
          fontFamily: 'Montserrat-Regular',
          marginBottom: 10,
          textAlign: 'center',
          fontSize: 14,
          width: 100,
          flexWrap: 'nowrap',
          color: focused ? '#7367f0' : '#625f6e',
        }}
      >
        {routeName}
      </Text>
    ),
    headerShown: false,
  });

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 70,
          backgroundColor: 'white',
        },
      }}
    >
      <Tab.Screen
        name="Главная"
        component={WebViewScreen}
        options={screenOptions("Главная", require('../Images/home.png'))}
        listeners={{
          tabPress: () => handleTabPress("Главная"),
        }}
        initialParams={{
          url: 'https://dev.ishkola.com/home',
        }}
      />
      <Tab.Screen
        name="Все занятия"
        component={WebViewScreen}
        options={screenOptions("Все занятия", require('../Images/allClasses.png'))}
        listeners={{
          tabPress: () => handleTabPress("Все занятия"),
        }}
        initialParams={{
          url: 'https://dev.ishkola.com/all-lessons',
        }}
      />
      <Tab.Screen
        name="Платежи"
        component={WebViewScreen}
        options={screenOptions("Платежи", require('../Images/payments.png'))}
        listeners={{
          tabPress: () => handleTabPress("Платежи"),
        }}
        initialParams={{
          url: 'https://dev.ishkola.com/payments',
        }}
      />
      <Tab.Screen
        name="Faq"
        component={WebViewScreen}
        options={screenOptions("Faq", require('../Images/faq.png'))}
        listeners={{
          tabPress: () => handleTabPress("Faq"),
        }}
        initialParams={{
          url: 'https://dev.ishkola.com/faq',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
