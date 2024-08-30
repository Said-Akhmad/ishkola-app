import React, { useCallback, useRef, useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet, BackHandler, SafeAreaView, ScrollView, RefreshControl, Platform, AppState, Modal, Button, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../store/userActions';
import { Indicator } from '../shared/ui/Indicator';
import { useFocusEffect, useNavigation, useNavigationState } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';
import { sleep } from 'shared/lib/utils/sleep';

const WebViewScreen = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const webViewRef = useRef(null);
  const { isConnected } = useNetInfo();
  const url = route?.params?.url;
  const isTasksScreen = route?.params?.isTasksScreen;

  const [canGoBack, setCanGoBack] = useState(false);
  const [isMainScreen, setIsMainScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalUrl, setModalUrl] = useState('');
  const [previousUrl, setPreviousUrl] = useState('');
  const [currentTab, setCurrentTab] = useState('default');

  const action = route?.params?.action;

  const navigationState = useNavigationState(state => state);

  const handleBackButton = () => {
    if (canGoBack) {
      webViewRef.current.goBack();
      return true;
    } else if (isMainScreen) {
      BackHandler.exitApp();
      return true;
    } else {
      if (navigation.canGoBack()) {
        navigation.goBack();
        return true;
      } else {
        return false;
      }
    }
  };

  const handleNavigationChange = (navState) => {
    const url = navState.url;
    if (url !== previousUrl) {
      setPreviousUrl(url);
      setCanGoBack(navState.canGoBack);
      setIsMainScreen(url === 'https://dev.ishkola.com/home');

      if (Platform.OS === 'ios' && url.includes('error=login_required')) {
        logout();
      }

      if (Platform.OS === 'android' && url.includes('auth?client_id')) {
        logout();
      }

      if (url === 'https://dev.ishkola.com/login') {
        logout();
      }
    }
  };


  const injectJavaScript = `
    (function() {
      function removeElementsByClass(className) {
        const elements = document.querySelectorAll(className);
        elements.forEach(element => element.remove());
      }

      document.querySelectorAll('.nav-menu-main, .nav-link-style.nav-link').forEach(element => {
        element.style.display = 'none';
      });

      removeElementsByClass('.nav-menu-main');
      removeElementsByClass('.nav-link-style.nav-link');


      var meta = document.createElement('meta');
      meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
      document.getElementsByTagName('head')[0].appendChild(meta);

      window.addEventListener('scroll', function() {
        window.ReactNativeWebView.postMessage(JSON.stringify({ action: 'scroll', value: window.scrollY }));
      });
    })();
    true;
  `;

  const logout = () => {
    dispatch(logoutAction());
  };

  const onRefresh = () => {
    setIsLoading(true);
    webViewRef.current?.reload();
    setIsLoading(false);
  };

  const handleMessage = async event => {
    try {
      const data = JSON.parse(event.nativeEvent?.data);

      if (data?.action === 'logout') {
        await sleep(300);
        logout();
      }

      if (data?.action === 'scroll') {
        setIsAtTop(data.value <= 0);
      }

      
    } catch (e) {
      console.error('Error in handleMessage:', e);
    }
  };

  useEffect(() => {
    if (action === 'goBack' && webViewRef.current) {
      webViewRef.current.goBack();
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    const appStateListener = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        setCanGoBack(false);
        setIsMainScreen(false);
      }
    }, [action]);

    return () => {
      backHandler.remove();
      appStateListener.remove();
    };
  }, [canGoBack, isMainScreen]);

  useEffect(() => {
    const currentTab = navigationState.routes[navigationState.index].name;
    setCurrentTab(currentTab);
  }, [navigationState]);

  return (
    <SafeAreaView style={styles.webview}>
      {isTasksScreen && <SwitchTasksButton />}
      {url && (
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={onRefresh}
              enabled={isAtTop}
            />
          }
        >
          <WebView
            ref={webViewRef}
            source={{ uri: url }}
            style={styles.webview}
            renderLoading={() => <Indicator />}
            startInLoadingState={true}
            onMessage={handleMessage}
            onNavigationStateChange={handleNavigationChange}
            injectedJavaScript={injectJavaScript}
            geolocationEnabled={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
        </ScrollView>
      )}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <WebView
            source={{ uri: modalUrl }}
            style={styles.modalWebview}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
          <Button title="Закрыть" onPress={() => setModalVisible(false)} />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  webview: {
    flex: 1,
    backgroundColor: '#f5f5ff',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalWebview: {
    flex: 1,
  },
  header: {
    marginBottom: 10,
    marginTop: 5,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
  },
});

export default WebViewScreen;
