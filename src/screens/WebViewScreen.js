import React, { useRef, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet,Button, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../store/userActions'; // Предположим, что это ваш action
import { Text } from 'react-native-svg';




const WebViewScreen = ({route,navigation}) => {
  const webViewRef = useRef(null);
  const dispatch = useDispatch();


  const url = route?.params?.url;


  const logout = () => {
    dispatch(logoutAction());
  };




  const onNavigationStateChange = (navState) => {
    if (navState.url === 'https://lk.ishkola.com/login') {
      // Alert.alert('Please')
      logout();
    }
  };
  const onMessageWebView = (event) => {
    console.log('!!!!!');
    const message = event.nativeEvent.data;

    if (message === 'userLoggedOut') {
      // Обработка разлогинивания
      console.log('Пользователь разлогинился');
      // Обновите состояние приложения, например:
      logout();
    }
  };

  return (
    <View style={styles.container}>
       {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="Press Me"
        onPress={logout}
      />
    </View> */}
      <WebView
        ref={webViewRef}
        source={{ uri: url }}  // Замените на ваш URL
        onMessage={onMessageWebView}
        // onLoad={injectLinkClickListener}
        javaScriptEnabled={true}
        onNavigationStateChange={onNavigationStateChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WebViewScreen;
