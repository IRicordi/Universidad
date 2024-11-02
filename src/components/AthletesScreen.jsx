import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const athletes = [
  { id: '1', name: 'Kristel Köbrich' },
  { id: '2', name: 'Benjamín Schnapp' },
  // Agrega más deportistas aquí
];

export default function AthletesScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={athletes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.name}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
