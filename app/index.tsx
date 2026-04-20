import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MainMenu from '../components/MainMenu';
import SplashScreen from '../components/SplashScreen';

export default function Index() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <View style={styles.root}>
      {!splashDone ? (
        <SplashScreen onFinish={() => setSplashDone(true)} />
      ) : (
        <MainMenu />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0a1a15',
  },
});
