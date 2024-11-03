import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FIREBASE_AUTH, FIREBASE_DB } from '../Config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;
  const currentUser = auth.currentUser;

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      if (currentUser) {
        const userDoc = await getDoc(doc(FIREBASE_DB, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async (newData) => {
    try {
      await updateDoc(doc(FIREBASE_DB, 'users', currentUser.uid), newData);
      setUserData(prev => ({ ...prev, ...newData }));
      Alert.alert('Éxito', 'Perfil actualizado correctamente');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'No se pudo actualizar el perfil');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  // Vista para usuario invitado
  if (!currentUser) {
    return (
      <View style={styles.container}>
        <View style={styles.guestContainer}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle-outline" size={100} color="#2196F3" />
          </View>
          <Text style={styles.guestTitle}>Invitado</Text>
          <Text style={styles.guestText}>
            Inicia sesión o regístrate para acceder a todas las funciones
          </Text>
          
          <View style={styles.authButtonsContainer}>
            <TouchableOpacity 
              style={[styles.authButton, { backgroundColor: '#2196F3' }]}
              onPress={() => navigation.navigate('LogIn')}
            >
              <Text style={styles.authButtonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.authButton, { backgroundColor: '#4CAF50' }]}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.authButtonText}>Registrarse</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  // Vista para usuario autenticado
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle" size={100} color="#2196F3" />
        </View>
        
        <Text style={styles.title}>Perfil</Text>
        
        {isEditing ? (
          <EditProfileForm 
            userData={userData} 
            onSave={handleUpdateProfile}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <View style={styles.infoContainer}>
            <InfoRow label="Nombre" value={userData?.nombre || 'No especificado'} />
            <InfoRow label="Email" value={userData?.email || 'No especificado'} />
            <InfoRow label="Teléfono" value={userData?.telefono || 'No especificado'} />
            <InfoRow label="Dirección" value={userData?.direccion || 'No especificado'} />
            <InfoRow label="Fecha de nacimiento" value={userData?.fechaNacimiento || 'No especificado'} />
            
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.editButtonText}>Editar Perfil</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const EditProfileForm = ({ userData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
      telefono: userData?.telefono || '',
      direccion: userData?.direccion || '',
      fechaNacimiento: userData?.fechaNacimiento || '',
  });

  const handleSave = () => {
      // Validación básica
      if (!formData.telefono.trim()) {
          Alert.alert('Error', 'Por favor ingresa un número de teléfono');
          return;
      }

      // Validación simple de formato de fecha (puedes mejorarla según tus necesidades)
      const fechaRegex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (formData.fechaNacimiento && !fechaRegex.test(formData.fechaNacimiento)) {
          Alert.alert('Error', 'Por favor ingresa la fecha en formato DD/MM/AAAA');
          return;
      }

      onSave(formData);
  };

  return (
      <View style={styles.formContainer}>
          <TextInput
              style={styles.input}
              placeholder="Teléfono"
              value={formData.telefono}
              onChangeText={(text) => setFormData(prev => ({ ...prev, telefono: text }))}
              placeholderTextColor="#666"
              keyboardType="phone-pad"
              autoCapitalize="none"
          />
          <TextInput
              style={styles.input}
              placeholder="Dirección"
              value={formData.direccion}
              onChangeText={(text) => setFormData(prev => ({ ...prev, direccion: text }))}
              placeholderTextColor="#666"
              autoCapitalize="sentences"
          />
          <TextInput
              style={styles.input}
              placeholder="Fecha de nacimiento (DD/MM/AAAA)"
              value={formData.fechaNacimiento}
              onChangeText={(text) => setFormData(prev => ({ ...prev, fechaNacimiento: text }))}
              placeholderTextColor="#666"
              keyboardType="numeric"
          />
          
          <View style={styles.buttonContainer}>
              <TouchableOpacity 
                  style={[styles.button, { backgroundColor: '#4CAF50' }]}
                  onPress={handleSave}
              >
                  <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                  style={[styles.button, { backgroundColor: '#f44336' }]}
                  onPress={onCancel}
              >
                  <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
          </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: '#000',
    flex: 2,
  },
  editButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  editButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  guestContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  guestTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  guestText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  authButtonsContainer: {
    width: '100%',
    gap: 15,
  },
  authButton: {
    padding: 15,
    borderRadius: 5,
    width: '100%',
  },
  authButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});