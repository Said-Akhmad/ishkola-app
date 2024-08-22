import React, { useRef, useState, useEffect, useContext } from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet, BackHandler, SafeAreaView, ScrollView, RefreshControl, Platform, AppState } from 'react-native';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../store/userActions';
import { Indicator } from '../shared/ui/Indicator';
import { useNavigation } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';
import { sleep } from 'shared/lib/utils/sleep';
import { TasksList } from 'features/tasks';
import { launchCamera } from 'react-native-image-picker';
import uploadFile from 'shared/api/uploadFile';

const WebViewScreen = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [canGoBack, setCanGoBack] = useState(false);
  const [isMainScreen, setIsMainScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true); // Added to track scroll position
  const webViewRef = useRef(null);
  const { isConnected } = useNetInfo();
  const url = route?.params?.url;
  const isTasksScreen = route?.params?.isTasksScreen;

  const handleBackButton = () => {
    if (canGoBack) {
      webViewRef.current.goBack();
      return true; // Prevent default behavior
    } else if (isMainScreen) {
      BackHandler.exitApp(); // Exit the app if on the main screen
      return true; // Prevent default behavior
    } else {
      // Check if there's a screen to go back to
      if (navigation.canGoBack()) {
        navigation.goBack();
        return true; // Prevent default behavior
      } else {
        return false; // Allow default behavior
      }
    }
  };

  const handleNavigationChange = (navState) => {
    setCanGoBack(navState.canGoBack);
    setIsMainScreen(navState.url === 'https://dev.ishkola.com/home'); // Update if on main screen

    if (Platform.OS === 'ios' && navState?.url.includes('error=login_required')) {
      logout();
    }

    if (Platform.OS === 'android' && navState?.url.includes('auth?client_id')) {
      logout();
    }

    if (navState.url === 'https://dev.ishkola.com/login') {
      logout();
    }
  };

  const injectJavaScript = `
    (function() {
      function removeElementsByClass(className) {
        const elements = document.querySelectorAll(className);
        elements.forEach(element => element.remove());
      }

      removeElementsByClass('.nav-menu-main');
      removeElementsByClass('.nav-link-style.nav-link');

      var meta = document.createElement('meta');
      meta.name = 'viewport';
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

  const handleLaunchCamera = async () => {
    const options = {
      mediaType: 'photo',
      cameraType: 'back',
      saveToPhotos: true,
    };

    await requestCameraPermission();

    launchCamera(options, async response => {
      if (!response.didCancel && !response.error) {
        const responseUpload = await uploadFile(response.assets[0].uri, 'image.png');
      }
    });
  };

  const handleMessage = async event => {
    try {
      const data = JSON.parse(event.nativeEvent?.data);

      if (data?.action === 'openCamera') {
        handleLaunchCamera();
      }

      if (data?.action === 'scanBarCode') {
        navigation.navigate('BarCodeScanScreen', {
          onComplete: value => injectInputValue(value, data.inputId),
        });
      }

      if (data?.action === 'openImageEditor') {
        navigation.navigate('ImageEditorScreen', {
          schema: data.schema,
          objectDataId: data.objectData.id,
          metaId: data.meta.id,
          onComplete: onRefresh,
        });
      }

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
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    const appStateListener = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        // Reset navigation states when the app comes to the foreground
        setCanGoBack(false);
        setIsMainScreen(false);
      }
    });

    return () => {
      backHandler.remove();
      appStateListener.remove();
    };
  }, [canGoBack, isMainScreen]);

  if (isTasksScreen && (isVisibleNativeTasksOnline || !isConnected)) {
    return (
      <SafeAreaView style={styles.webview}>
        {isConnected && <SwitchTasksButton />}

        <View style={styles.header}>
          <CustomText style={styles.headerText}>Мои задачи (оффлайн доступ)</CustomText>
        </View>
        <TasksList />
      </SafeAreaView>
    );
  }

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
              enabled={isAtTop} // Refresh allowed only when at the top
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
            userAgent={'Expresso/Mobile/1.0'}
            injectedJavaScript={injectJavaScript}
            geolocationEnabled={true}
            allowsInlineMediaPlayback
            mediaPlaybackRequiresUserAction={false}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  webview: {
    flex: 1,
    backgroundColor: '#f5f5ff',
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
