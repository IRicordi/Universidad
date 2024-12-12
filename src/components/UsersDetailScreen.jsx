import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { doc, getDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../Config/firebase';
import { useTranslation } from 'react-i18next';

const UsersDetailScreen = ({ route }) => {
  const [profile, setProfile] = useState(null);
  const { id } = route.params;
  const { t } = useTranslation();

  const roleMapping = {
    'entrenador': 'coach',
    'nadador': 'swimmer',
    'marca': 'brand'
  };


  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const docRef = doc(FIREBASE_DB, 'users', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  if (!profile) return null;

  return (
    <ScrollView 
        style={styles.container} 
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={true}
    >
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle" size={120} color="#2196F3" />
        </View>
        <Text style={styles.name}>{profile.nombre}</Text>
        <Text style={styles.role}>
          {t(`userDetails.role.${roleMapping[profile.rol]}`)}
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('userDetails.contactInfo')}</Text>
          <InfoRow 
            icon="call" 
            label={t('userDetails.phone')} 
            value={profile.telefono} 
          />
          <InfoRow 
            icon="mail" 
            label={t('userDetails.email')} 
            value={profile.email} 
          />
          <InfoRow 
            icon="location" 
            label={t('userDetails.address')} 
            value={profile.direccion} 
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('userDetails.about')}</Text>
          <Text style={styles.description}>{profile.descripcion}</Text>
        </View>

        {profile.logros && profile.logros.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('userDetails.achievements')}</Text>
            {profile.logros.map((logro, index) => (
              <View key={logro.id} style={styles.achievementItem}>
                <Ionicons name="trophy" size={20} color="#FFD700" />
                <Text style={styles.achievementText}>{logro.texto}</Text>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity style={styles.contactButton}>
          <Ionicons name="mail" size={20} color="white" />
          <Text style={styles.contactButtonText}>
            {t('userDetails.contact')}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <View style={styles.infoRow}>
    <Ionicons name={icon} size={20} color="#666" />
    <Text style={styles.infoLabel}>{label}:</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatarContainer: {
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  role: {
    fontSize: 18,
    color: '#666',
  },
  card: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
    width: 80,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 8,
  },
  achievementText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  contactButton: {
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  contactButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default UsersDetailScreen;