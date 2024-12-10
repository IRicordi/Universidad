import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FIREBASE_AUTH, FIREBASE_DB } from '../Config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import AvatarSelector, { getAvatarById } from '../components/AvatarSelector';

export default function ProfileScreen() {
  const [userData, setUserData] = useState({
    avatarId: null,
    ...null  
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;
  const currentUser = auth.currentUser;
  const { t } = useTranslation();

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
      Alert.alert('Éxito', '¡Perfil actualizado correctamente!');
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

  if (!currentUser) {
    return (
      <View style={styles.container}>
        <View style={styles.guestContainer}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle-outline" size={100} color="#2196F3" />
          </View>
          <Text style={styles.guestTitle}>Invitado</Text>
          <Text style={styles.guestText}>
            Inicia sesión o regístrate para acceder a tu perfil
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle" size={100} color="#2196F3" />
        </View>
        
        <Text style={styles.title}>Mi Perfil</Text>
        
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
            <InfoRow label="Fecha de Nacimiento" value={userData?.fechaNacimiento || 'No especificado'} />
            <InfoRow label="Descripción" value={userData?.descripcion || 'No especificado'} />
            <InfoRow 
              label="Logros" 
              value={userData?.logros || []} 
              isLogros={true}
            />
            
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

const InfoRow = ({ label, value, isLogros }) => {
  if (isLogros) {
    return (
      <View style={styles.infoRow}>
        <Text style={styles.label}>{label}:</Text>
        <View style={styles.logrosListContainer}>
          {value.map((logro, index) => (
            <Text key={logro.id} style={styles.logroDisplayText}>
              • {logro.texto}
            </Text>
          ))}
          {value.length === 0 && (
            <Text style={styles.value}>No hay logros registrados</Text>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const EditProfileForm = ({ userData, onSave, onCancel }) => {
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [formData, setFormData] = useState({
    avatarId: userData?.avatarId || '1',
    telefono: userData?.telefono || '',
    direccion: userData?.direccion || '',
    fechaNacimiento: userData?.fechaNacimiento || '',
    descripcion: userData?.descripcion || '',
    logros: userData?.logros || [],
  });
  const [nuevoLogro, setNuevoLogro] = useState('');

  const formatDate = (text) => {
    const cleanText = text.replace(/\D/g, '');
    let formatted = '';
    for (let i = 0; i < cleanText.length && i < 8; i++) {
      if (i === 2 || i === 4) formatted += '/';
      formatted += cleanText[i];
    }
    return formatted;
  };

  const handleDateChange = (text) => {
    const formatted = formatDate(text);
    setFormData(prev => ({ ...prev, fechaNacimiento: formatted }));
  };

  const handleAddLogro = () => {
    if (!nuevoLogro.trim()) {
      Alert.alert('Error', 'El logro no puede estar vacío');
      return;
    }
    setFormData(prev => ({
      ...prev,
      logros: [...prev.logros, { id: Date.now().toString(), texto: nuevoLogro.trim() }]
    }));
    setNuevoLogro('');
  };

  const handleDeleteLogro = (id) => {
    setFormData(prev => ({
      ...prev,
      logros: prev.logros.filter(logro => logro.id !== id)
    }));
  };

  const handleEditLogro = (id, nuevoTexto) => {
    setFormData(prev => ({
      ...prev,
      logros: prev.logros.map(logro => 
        logro.id === id ? { ...logro, texto: nuevoTexto } : logro
      )
    }));
  };

  const handleSave = () => {
    if (!formData.telefono.trim()) {
      Alert.alert('Error', 'El teléfono es obligatorio');
      return;
    }

    if (formData.descripcion.split(' ').length > 100) {
      Alert.alert('Error', 'La descripción no puede tener más de 100 palabras');
      return;
    }

    const fechaRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (formData.fechaNacimiento && !fechaRegex.test(formData.fechaNacimiento)) {
      Alert.alert('Error', 'Formato de fecha inválido');
      return;
    }

    if (formData.fechaNacimiento) {
      const [dia, mes, año] = formData.fechaNacimiento.split('/').map(Number);
      const fecha = new Date(año, mes - 1, dia);
      if (
        fecha.getDate() !== dia ||
        fecha.getMonth() !== mes - 1 ||
        fecha.getFullYear() !== año ||
        año < 1900 ||
        año > new Date().getFullYear()
      ) {
        Alert.alert('Error', 'Fecha inválida');
        return;
      }
    }

    onSave(formData);
  };

  return (
    <View style={styles.formContainer}>
      <TouchableOpacity 
        style={styles.avatarSelector}
        onPress={() => setShowAvatarSelector(true)}
      >
        <Image
          source={getAvatarById(formData.avatarId)}
          style={styles.avatarImage}
        />
        <Text style={styles.changeAvatarText}>Cambiar avatar</Text>
      </TouchableOpacity>

      <AvatarSelector
        visible={showAvatarSelector}
        onClose={() => setShowAvatarSelector(false)}
        onSelect={(avatarId) => setFormData(prev => ({ ...prev, avatarId }))}
        selectedAvatarId={formData.avatarId}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={formData.telefono}
        onChangeText={(text) => setFormData(prev => ({ ...prev, telefono: text }))}
        placeholderTextColor="#666"
        keyboardType="phone-pad"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Dirección"
        value={formData.direccion}
        onChangeText={(text) => setFormData(prev => ({ ...prev, direccion: text }))}
        placeholderTextColor="#666"
      />
      
      <TextInput
        style={styles.input}
        placeholder="DD/MM/AAAA"
        value={formData.fechaNacimiento}
        onChangeText={handleDateChange}
        placeholderTextColor="#666"
        keyboardType="numeric"
        maxLength={10}
      />

      <TextInput
        style={[styles.input, styles.descripcionInput]}
        placeholder="Descripción personal (máximo 100 palabras)"
        value={formData.descripcion}
        onChangeText={(text) => setFormData(prev => ({ ...prev, descripcion: text }))}
        placeholderTextColor="#666"
        multiline
        numberOfLines={4}
      />

      <View style={styles.logrosContainer}>
        <Text style={styles.logrosTitle}>Logros en Natación</Text>
        
        <View style={styles.addLogroContainer}>
          <TextInput
            style={styles.logroInput}
            placeholder="Añade un nuevo logro"
            value={nuevoLogro}
            onChangeText={setNuevoLogro}
            placeholderTextColor="#666"
          />
          <TouchableOpacity 
            style={styles.addLogroButton}
            onPress={handleAddLogro}
          >
            <Ionicons name="add-circle" size={24} color="#2196F3" />
          </TouchableOpacity>
        </View>

        {formData.logros.map((logro) => (
          <View key={logro.id} style={styles.logroItem}>
            <TextInput
              style={styles.logroText}
              value={logro.texto}
              onChangeText={(text) => handleEditLogro(logro.id, text)}
            />
            <TouchableOpacity 
              onPress={() => handleDeleteLogro(logro.id)}
              style={styles.deleteLogroButton}
            >
              <Ionicons name="trash-outline" size={20} color="#f44336" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

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
  descripcionInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  logrosContainer: {
    marginVertical: 15,
  },
  logrosTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addLogroContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logroInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  addLogroButton: {
    padding: 5,
  },
  avatarSelector: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  changeAvatarText: {
    color: '#2196F3',
    fontSize: 16,
  },
  logroItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    padding: 5,
  },
  logroText: {
    flex: 1,
    padding: 5,
  },
  deleteLogroButton: {
    padding: 5,
  },
  logrosListContainer: {
    flex: 2,
  },
  logroDisplayText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
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