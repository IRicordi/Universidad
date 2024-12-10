import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, ScrollView, Modal, Text } from 'react-native';

const AVATARS = [
  { id: '1', source: require('../../assets/avatars/avatar1.png') },
  { id: '2', source: require('../../assets/avatars/avatar2.png') },
  { id: '3', source: require('../../assets/avatars/avatar3.png') },
  { id: '4', source: require('../../assets/avatars/avatar4.png') },
  { id: '5', source: require('../../assets/avatars/avatar5.png') },
  { id: '6', source: require('../../assets/avatars/avatar6.png') },
  { id: '7', source: require('../../assets/avatars/avatar7.png') },
  { id: '8', source: require('../../assets/avatars/avatar8.png') },
  { id: '9', source: require('../../assets/avatars/avatar9.png') },
  { id: '10', source: require('../../assets/avatars/avatar10.png') },
];

export const getAvatarById = (id) => {
  const avatar = AVATARS.find(av => av.id === id);
  return avatar ? avatar.source : null;
};

const AvatarSelector = ({ visible, onClose, onSelect, selectedAvatarId }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.avatarGrid}>
            {AVATARS.map((avatar) => (
              <TouchableOpacity
                key={avatar.id}
                style={[
                  styles.avatarItem,
                  selectedAvatarId === avatar.id && styles.selectedAvatar
                ]}
                onPress={() => {
                  onSelect(avatar.id);
                  onClose();
                }}
              >
                <Image
                  source={avatar.source}
                  style={styles.avatarImage}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  avatarItem: {
    width: '30%',
    aspectRatio: 1,
    marginBottom: 15,
    borderRadius: 10,
    padding: 5,
  },
  selectedAvatar: {
    backgroundColor: '#e3f2fd',
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  closeButton: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#f44336',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AvatarSelector;