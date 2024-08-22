import { StyleSheet, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { useDispatch } from 'react-redux';
import { loginAction } from '../store/userActions';
import { Indicator } from '../shared/ui/Indicator';
import { notificationInitialized } from '../entities/notification';
import React, { useState, useRef, useEffect } from 'react';
import { logoutAction } from '../store/userActions'; // Предположим, что это ваш action


export default function LoginScreen() {
  const dispatch = useDispatch();
  const [isLoginPage, setIsLoginPage] = useState(false);
  const webViewRef = useRef<WebView | null>(null);

  const injectButtonClickListener = () => {
    const buttonScript = `
      (function() {
        function onButtonClick() {
          setTimeout(() => {
            // Add logic here to interact with localStorage
            const userData = JSON.parse(localStorage.getItem('userData'));
             window.ReactNativeWebView.postMessage(JSON.stringify({action: 'login', token: userData.token}));
          }, 2000); // 500ms delay to ensure localStorage is ready
        }
        var button = document.querySelector('.waves-effect.btn.btn-primary.btn-block');
        if (button) {
          button.addEventListener('click', onButtonClick);
        }
      })();
      true; // note: this is required, or you'll sometimes get silent failures
    `;
    webViewRef?.current?.injectJavaScript(buttonScript);
  };

  

  const onMessageWebView = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent?.data);
      console.log('1 data:', data);
      if (data?.action === 'login' && data?.token) {
        dispatch(loginAction(data.token));
        notificationInitialized();
      } 
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect(() => {
  //   checkIfUserIsLoggedIn();
  // }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://dev.ishkola.com/login' }}
        style={styles.webview}
        renderLoading={() => <Indicator />} // Показываем индикатор загрузки
        onLoad={injectButtonClickListener}
        onMessage={onMessageWebView}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
});
