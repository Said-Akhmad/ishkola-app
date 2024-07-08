import {useDispatch} from 'react-redux';
import React, {useRef, useState} from 'react';
import {StyleSheet, SafeAreaView, Platform, RefreshControl} from 'react-native';
import {WebView} from 'react-native-webview';
import {logoutAction} from '../store/userActions';
import {Indicator} from '../shared/ui/Indicator';

export default function FaqScreen({route, navigation}) {
  const dispatch = useDispatch();
  const url = route?.params?.url;
  const [isLoading, setIsLoading] = useState(false);

  const logout = () => {
    dispatch(logoutAction());
  };

  const webViewRef = useRef();

  const handleNavigationStateChange = navState => {
    if (
      Platform.OS === 'ios' &&
      navState?.url.includes('error=login_required')
    ) {
      logout();
    }

    if (Platform.OS === 'android' && navState?.url.includes('auth?client_id')) {
      logout();
    }
  };

  const onRefresh = () => {
    setIsLoading(true);
    webViewRef.current?.reload();
  };

  const handleMessage = event => {
    try {
      const data = JSON.parse(event.nativeEvent?.data);
      if (data?.action === 'openImageEditor') {
        navigation.navigate('ImageEditorScreen', {
          schema: data.schema,
          objectData: data.objectData,
          meta: data.meta,
          onRefresh,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.webview}>
      <WebView
        ref={webViewRef}
        source={{
          uri: 'https://dev.ishkola.com/faq'
        }}
        style={styles.webview}
        renderLoading={() => <Indicator />}
        startInLoadingState={true}
        onNavigationStateChange={handleNavigationStateChange}
        pullToRefreshEnabled={true}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        onMessage={handleMessage}
        userAgent={'Expresso/Mobile/1.0'}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
});
