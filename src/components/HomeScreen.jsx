import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SwimIt Chile</Text>
      <Button
        title="Ver Deportistas"
        onPress={() => navigation.navigate('Athletes')}
      />
      <Button
        title="Ver Clubes"
        onPress={() => navigation.navigate('Clubs')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
  });
  