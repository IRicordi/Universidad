import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const clubs = [
  { id: '1', name: 'Club de Natación Universidad de Chile' },
  { id: '2', name: 'Club Stadio Italiano' },
  // Agrega más clubes aquí
];

export default function ClubsScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={clubs}
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