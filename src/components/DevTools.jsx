import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DevTools({ onResetAuth }) {
  const handleResetAuth = async () => {
    try {
      await AsyncStorage.removeItem('isLoggedIn');
      onResetAuth();
    } catch (error) {
      console.error('Error resetting auth state:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Reiniciar Estado de Autenticación" onPress={handleResetAuth} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});