import React from 'react';
import { SafeAreaView } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import { MovieProvider } from './src/context/MovieContext';

export default function App() {
  return (
    <MovieProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <RootNavigator />
      </SafeAreaView>
    </MovieProvider>
  );
}