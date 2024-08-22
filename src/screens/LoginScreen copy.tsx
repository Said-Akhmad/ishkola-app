import { StyleSheet, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { useDispatch } from 'react-redux';
import { loginAction, logoutAction } from '../store/userActions';
import { Indicator } from '../shared/ui/Indicator';
import { notificationInitialized } from '../entities/notification';
import React, { useRef } from 'react';

export default function LoginScreen() {
  const dispatch = useDispatch();
  const webViewRef = useRef<WebView | null>(null);

  const injectButtonClickListener = () => {
    const buttonScript = `
      (function() {
        // Function to handle login button click
        function onLoginButtonClick() {
          alert('Login clicked');
          setTimeout(() => {
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (userData && userData.token) {
              alert(userData.token);
              window.ReactNativeWebView.postMessage(JSON.stringify({ action: 'login', token: userData.token }));
            }
          }, 2000);
        }

        // Function to handle logout button click
        function onLogoutButtonClick() {
          alert('Logout clicked');
          window.ReactNativeWebView.postMessage(JSON.stringify({ action: 'logout' }));
        }

        // Attach the login button click event listener
        var loginButton = document.querySelector('.waves-effect.btn.btn-primary.btn-block');
        if (loginButton) {
          loginButton.addEventListener('click', onLoginButtonClick);
        }

        // Attach the logout button click event listener
        var logoutButton = document.querySelector('a.dropdown-item[href="/logout"]');
        if (logoutButton) {
          logoutButton.addEventListener('click', onLogoutButtonClick);
        }
      })();
      true; // this is required, or you'll sometimes get silent failures
    `;
    webViewRef?.current?.injectJavaScript(buttonScript);
  };

  const onMessageWebView = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent?.data);
      console.log('data', data);
      if (data?.action === 'login' && data?.token) {
        dispatch(loginAction(data.token));
        notificationInitialized();
      } else if (data?.action === 'logout') {
        dispatch(logoutAction());
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://lk.ishkola.com/login' }}
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
