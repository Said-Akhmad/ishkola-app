import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import React from 'react';
import {store, persistor} from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, Platform } from 'react-native'



const App = () => {
  return (
    <Provider store={store}>
     
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{flex: 1}}>
          <AppNavigator />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    marginVertical: 25,
    fontSize: 20,
    fontWeight: '600',
    fontFamily: Platform.OS === 'android' ? 'AntonSC-Regular' : 'Circular Std',
  },
})

export default App;
// import React from 'react';
// import { Text, View, StyleSheet } from 'react-native';

// const styles = StyleSheet.create({
//   main: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   customText: {
//     color: 'black',
//     fontSize: 30,
//     fontFamily: 'Montserrat-Regular',
//   },
// });

// const App = () => {
//   return (
//     <View style={styles.main}>
//       <Text style={styles.customText}>Hello, Custom Font!</Text>
//     </View>
//   );
// };

// export default App;
