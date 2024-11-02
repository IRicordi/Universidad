import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  // Por ahora datos estáticos, luego se pueden conectar a un sistema de autenticación
  const userData = {
    username: "Usuario Ejemplo",
    age: 25
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <Text style={styles.title}>Perfil</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Nombre de usuario:</Text>
          <Text style={styles.value}>{userData.username}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Edad:</Text>
          <Text style={styles.value}>{userData.age} años</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: '#000',
  },
});