import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collection, query, getDocs } from 'firebase/firestore';
import { FIREBASE_DB } from '../Config/firebase';
import { getAvatarById } from './AvatarSelector';

const isProfileComplete = (userData) => {
  const requiredFields = ['nombre', 'telefono', 'direccion', 'fechaNacimiento', 'descripcion'];
  return requiredFields.every(field => userData[field] && userData[field].trim() !== '');
};

const ProfileCapsule = ({ profile, onPress }) => (
  <TouchableOpacity 
    style={styles.capsule}
    onPress={onPress}
  >
    <View style={styles.imageContainer}>
      <Image
        source={getAvatarById(profile.avatarId || '1')}
        style={styles.profileImage}
      />
      <View style={styles.sportBadge}>
        <Text style={styles.sportText}>Natación</Text>
      </View>
    </View>
    
    <Text style={styles.name}>{profile.nombre}</Text>
    <Text style={styles.role}>{profile.rol}</Text>
    
    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Ionicons name="trophy-outline" size={16} color="#666" />
        <Text style={styles.statText}>{profile.logros?.length || 0}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const ProfileCapsules = ({ navigation }) => {
  const [profiles, setProfiles] = useState([]);
  
  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      const q = query(collection(FIREBASE_DB, 'users'));
      const querySnapshot = await getDocs(q);
      
      const completeProfiles = [];
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (isProfileComplete(userData)) {
          completeProfiles.push({
            id: doc.id,
            ...userData
          });
        }
      });
      
      setProfiles(completeProfiles);
    } catch (error) {
      console.error('Error loading profiles:', error);
    }
  };

  const handleProfilePress = (profileId) => {
    navigation.navigate('ProfileDetails', { id: profileId });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {profiles.map((profile) => (
          <ProfileCapsule
            key={profile.id}
            profile={profile}
            onPress={() => handleProfilePress(profile.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    justifyContent: 'space-between'
  },
  capsule: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  profileImagePlaceholder: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sportBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  sportText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  profileImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 4,
    color: '#666',
    fontSize: 14,
  },
});

export default ProfileCapsules;