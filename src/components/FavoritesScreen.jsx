import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function FavoritesScreen() {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Agregar a favoritos?</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, isFavorite && styles.activeButton]} 
          onPress={() => setIsFavorite(true)}
        >
          <Text style={[styles.buttonText, isFavorite && styles.activeButtonText]}>Sí</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, !isFavorite && styles.activeButton]} 
          onPress={() => setIsFavorite(false)}
        >
          <Text style={[styles.buttonText, !isFavorite && styles.activeButtonText]}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#2196F3',
    backgroundColor: 'transparent',
  },
  activeButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    fontSize: 18,
    color: '#2196F3',
    fontWeight: 'bold',
  },
  activeButtonText: {
    color: 'white',
  },
});