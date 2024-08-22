const injectJavaScript = `
  (function() {
    document.querySelector('.nav-link-style.nav-link').addEventListener('click', function() {
      setTimeout(() => {
        const skin = JSON.parse(localStorage.getItem('skin'));
        alert(skin)
        window.ReactNativeWebView.postMessage(JSON.stringify({ action: 'toggleDarkMode', skin: skin }));
      }, 3);
    });
    
    // window.addEventListener('storage', function(event) {
    //   setTimeout(() => {
    //     if (event.key === 'skin') {
    //       const newSkin = JSON.parse(event.newValue);
    //       if (newSkin === 'dark') {
    //         window.ReactNativeWebView.postMessage(JSON.stringify({ action: 'toggleDarkMode', value: true }));
    //       } else {
    //         window.ReactNativeWebView.postMessage(JSON.stringify({ action: 'toggleDarkMode', value: false }));
    //       }
    //     }
    //   }, 3);
    // });
  })();
  true;
`;

import React, { useRef, useContext, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../store/userActions';
import { DarkModeContext } from '../screens/DarkModeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WebViewScreen = ({ route }) => {
  const webViewRef = useRef(null);
  const dispatch = useDispatch();
  const { isDarkened, toggleDarkMode } = useContext(DarkModeContext);

  const url = route?.params?.url;

  const logout = () => {
    dispatch(logoutAction());
  };

  const onNavigationStateChange = (navState) => {
    if (navState.url === 'https://lk.ishkola.com/login') {
      logout();
    }
  };

  const onMessageWebView = async (event) => {
    const message = JSON.parse(event.nativeEvent.data);

    if (message.action === 'toggleDarkMode') {
      await toggleDarkMode(message.skin === 'dark');
    }
  };

  useEffect(() => {
    const updateSkinInWebView = async () => {
      const skin = isDarkened ? 'dark' : 'light';
      const currentSkin = await AsyncStorage.getItem('skin');
      
      if (currentSkin !== JSON.stringify(skin)) {
        await AsyncStorage.setItem('skin', JSON.stringify(skin));
        setTimeout(() => {
          webViewRef.current.injectJavaScript(`
            localStorage.setItem('skin', JSON.stringify('${skin}'));
          `);
        }, 3);
      }
    };

    updateSkinInWebView();
  }, [isDarkened]);

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        onMessage={onMessageWebView}
        javaScriptEnabled={true}
        injectedJavaScript={injectJavaScript}
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
