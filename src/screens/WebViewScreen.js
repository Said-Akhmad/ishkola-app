import React, { useRef, useContext, useEffect, useState, useCallback } from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet, BackHandler, RefreshControl, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../store/userActions';
import { DarkModeContext } from '../screens/DarkModeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

const WebViewScreen = () => {
  const [previousUrl, setPreviousUrl] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const navigation = useNavigation();
  const route = useRoute();
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
    } else if (navState.url.includes('settings')) {
      setPreviousUrl(navState.url);
    }
  };

  const onMessageWebView = async (event) => {
    const message = JSON.parse(event.nativeEvent.data);

    if (message.action === 'toggleDarkMode') {
      await toggleDarkMode(message.skin === 'dark');
      setTimeout(() => {
        RNRestart.Restart();
      }, 1000);
    }
  };

  const injectJavaScript = `
    (function() {
      const mobileMenu = document.querySelector('.mobile-menu.mr-auto.nav-item');
      const navLinkStyle = document.querySelector('.nav-link-style.nav-link');
      if (mobileMenu) mobileMenu.remove();
      if (navLinkStyle) navLinkStyle.remove();
      document.querySelector('.dropdown-item').addEventListener('click', function() {
        window.ReactNativeWebView.postMessage(JSON.stringify({ action: 'navigateToSettings' }));
      });
    })();
    true;
  `;

  useEffect(() => {
    const updateSkinInWebView = async () => {
      const skin = isDarkened ? 'dark' : 'light';
      const currentSkin = await AsyncStorage.getItem('skin');
      console.log('!!!' + currentSkin);

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

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (previousUrl) {
          console.log(previousUrl);
          webViewRef.current.goBack();
          setPreviousUrl(null);
          return true;
        } else if (navigation.canGoBack()) {
          console.log('Can go back', navigation.canGoBack);
          navigation.goBack();
          return true;
        }
        return false;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [previousUrl, navigation])
  );

  const onRefresh = useCallback(() => {
    if (scrollY <= 0) {  // Обновляем только если находимся в самом верху страницы
      setRefreshing(true);
      webViewRef.current.reload();
      setTimeout(() => setRefreshing(false), 2000);
    }
  }, [scrollY]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#000"
            colors={['#000']}
          />
        }
        onScroll={(event) => {
          setScrollY(event.nativeEvent.contentOffset.y);
        }}
        scrollEventThrottle={16}
      >
        <WebView
          ref={webViewRef}
          source={{ uri: url }}
          onMessage={onMessageWebView}
          javaScriptEnabled={true}
          injectedJavaScript={injectJavaScript}
          onNavigationStateChange={onNavigationStateChange}
          style={{ flex: 1, height: '100%' }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WebViewScreen;
