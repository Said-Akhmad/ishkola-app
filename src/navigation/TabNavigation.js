import React, {useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import WebViewScreen from '../screens/WebViewScreen';
import AllLessonsScreen from '../screens/AllLessonsScreen';
import PaymentsScreen from '../screens/PaymentsScreen';
import FaqScreen from '../screens/FaqScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TasksScreen from '../screens/TasksScreen';
import ImageEditorScreen from '../screens/ImageEditorScreen';
import {SvgXml} from 'react-native-svg';
import {useDispatch} from 'react-redux';
import {logoutAction} from '../store/userActions';
import { Image,Text } from 'react-native';
import { View, StyleSheet } from 'react-native';



import {FaPencil} from '../shared/ui/ImageEditor/model/const/controls';

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  const dispatch = useDispatch();

 

  // const svgIconHome = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`

  // const svgIcons =  `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#7367f0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`

  // const svgIconPayments = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#7367f0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`
  
  // const svgIconsSetings = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`

return (
   <Tab.Navigator
   screenOptions={({ route }) => ({
    
    tabBarStyle: {
      height: 70, // Установка высоты TabBar
    },
  })}

  
 >   

      
      <Tab.Screen
        name="Главная"
        component={WebViewScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../Images/home.png')}
              style={{marginTop:10,width: 20, height: 20, tintColor: focused ? '#7367f0' : '#625f6e' }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{ 
                fontFamily: 'Montserrat-Regular',
                marginBottom:10,
                textAlign: 'center',
                fontSize: 16,
                width: 100, // Увеличенная ширина
                flexWrap: 'nowrap', // Предотвращает перенос текста
                color: focused ? '#7367f0' : '#625f6e'
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
                  style={{marginTop:10,width: 20, height: 20, tintColor: focused ? '#7367f0' : '#625f6e' }}
                />
              ),
              tabBarLabel: ({ focused }) => (
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    marginBottom:10,
                    textAlign: 'center',
                    fontSize: 16,
                    width: 100, // Увеличенная ширина
                    flexWrap: 'nowrap', // Предотвращает перенос текста
                    color: focused ? '#7367f0' : '#625f6e'
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
                  style={{marginTop:10,width: 20, height: 20, tintColor: focused ? '#7367f0' : '#625f6e' }}
                />
              ),
              tabBarLabel: ({ focused }) => (
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={{ 
                    fontFamily: 'Montserrat-Regular',
                    marginBottom:10,
                    textAlign: 'center',
                    fontSize: 16,
                    width: 100, // Увеличенная ширина
                    flexWrap: 'nowrap', // Предотвращает перенос текста
                    color: focused ? '#7367f0' : '#625f6e'
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
                tintColor: focused ? '#7367f0' : '#625f6e',
              }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{
                marginBottom:10,
                fontFamily: 'Montserrat-Regular',
                textAlign: 'center',
                fontSize: 16,
                width:100, // Увеличенная ширина
                flexWrap: 'nowrap', // Предотвращает перенос текста
                color: focused ? '#7367f0' : '#625f6e'
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
          
      </Tab.Navigator>
    
  );
};


const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  customText: {
    color: 'black',
    fontSize: 30,
    fontFamily: 'Montserrat-Regular',
  },
});


export default MainScreen;

