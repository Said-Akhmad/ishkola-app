import React from 'react';
import {StyleSheet, SafeAreaView, Text, View} from 'react-native';
import {ImageEditor} from '../shared/ui/ImageEditor';
import Header from '../components/Header';

export default function ImageEditorScreen({navigation, route}) {
  const schema = route?.params?.schema;
  const objectData = route?.params?.objectData;
  const meta = route?.params?.meta;
  const onRefreshPrevScreen = route?.params?.onRefresh;
  return (
    <View style={styles.container}>
      {/*<Header title={'Редактор'} navigation={navigation} />*/}
      <ImageEditor
        schema={schema}
        objectData={objectData}
        meta={meta}
        navigation={navigation}
        onCompleteSave={onRefreshPrevScreen}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 20,
    marginLeft: 10,
  },
  text: {
    fontSize: 16,
  },
});
