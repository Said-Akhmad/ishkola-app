import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CachedWebView = ({pageUrl}) => {
  const [cachedPage, setCachedPage] = useState(null);
  const [isConnected, setIsConnected] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [cachedJs, setCachedJs] = useState('');
  const [cachedCss, setCachedCss] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const netInfoState = await NetInfo.fetch();
        setIsConnected(netInfoState.isConnected);

        if (netInfoState.isConnected) {
          const response = await fetch(pageUrl);
          const html = await response.text();
          setCachedPage(html);
          await AsyncStorage.setItem(`cachedPage:${pageUrl}`, html);

          // Extract script and link tags from HTML
          const scriptTags = html.match(/<script\s+src=["']([^"']+)["']/g);
          const cssLinks = html.match(
            /<link\s+href=["']([^"']+)["']\s+rel=["']stylesheet["']/g,
          );

          if (scriptTags) {
            for (const tag of scriptTags) {
              const src = tag.match(/src=["']([^"']+)["']/)[1];
              const jsResponse = await fetch(src);
              const jsContent = await jsResponse.text();
              await AsyncStorage.setItem(`cachedJs:${src}`, jsContent);
            }
          }

          if (cssLinks) {
            for (const tag of cssLinks) {
              const href = tag.match(/href=["']([^"']+)["']/)[1];
              const cssResponse = await fetch(href);
              const cssContent = await cssResponse.text();
              await AsyncStorage.setItem(`cachedCss:${href}`, cssContent);
            }
          }
        } else {
          const cachedPageFromStorage = await AsyncStorage.getItem(
            `cachedPage:${pageUrl}`,
          );
          if (cachedPageFromStorage) {
            setCachedPage(cachedPageFromStorage);
          } else {
            console.warn('No internet connection and page not found in cache.');
          }
        }
      } catch (error) {
        console.error('Error fetching or caching page:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pageUrl]);

  useEffect(() => {
    if (!isLoading) {
      setPageLoaded(true);
    }
  }, [isLoading]);

  const generateHtmlContent = () => {
    return `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8"/>
          <link rel="icon" href="/favicon.ico"/>
          <meta name="viewport" content="width=device-width,initial-scale=1"/>
          <meta name="theme-color" content="#000000"/>
          <meta name="description" content="Web site Expresso"/>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
          <link rel="manifest" href="/manifest.json"/>
          <script src="/env-config.js"></script>
          <title>Expresso</title>
          ${cachedJs && `<script>${cachedJs}</script>`}
          ${cachedCss && `<style>${cachedCss}</style>`}
        </head>
        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <div id="root" class="h-[100vh]"></div>
          <div id="portal"></div>
        </body>
      </html>
    `;
  };

  return (
    <View style={{flex: 1}}>
      {!isConnected && (
        <Text style={{textAlign: 'center', marginTop: 20}}>
          No internet connection. Loading from cache.
        </Text>
      )}
      {isLoading && <ActivityIndicator style={{flex: 1}} />}
      {!isLoading && (
        <WebView
          source={{html: generateHtmlContent()}}
          onLoad={() => setPageLoaded(true)}
          style={{flex: pageLoaded ? 1 : 0}}
        />
      )}
    </View>
  );
};

export default CachedWebView;
