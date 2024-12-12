import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../Config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { useTranslation } from 'react-i18next';

const ProfileAlert = () => {
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;
  const { t } = useTranslation();


  return (
    <Modal
      transparent={true}
      visible={showModal}
      animationType="fade"
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.iconContainer}>
            <Ionicons name="person-circle" size={60} color="#2196F3" />
          </View>
          
          <Text style={styles.title}>{t('profileCompletion.title')}</Text>
          <Text style={styles.message}>
            {t('profileCompletion.message')}
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.completeButton]}
              onPress={() => {
                setShowModal(false);
                navigation.navigate('Profile');
              }}
            >
              <Text style={styles.buttonText}>
                {t('profileCompletion.completeButton')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.laterButton]}
              onPress={() => setShowModal(false)}
            >
              <Text style={[styles.buttonText, styles.laterButtonText]}>
                {t('profileCompletion.laterButton')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  iconContainer: {
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    gap: 10,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  completeButton: {
    backgroundColor: '#2196F3',
  },
  laterButton: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  laterButtonText: {
    color: '#666',
  },
});

export default ProfileAlert;