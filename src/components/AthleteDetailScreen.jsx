import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function AthleteDetailScreen({ route }) {
    const { athlete } = route.params;

    const InfoItem = ({ label, value }) => (
        <View style={styles.infoItem}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>{athlete.name}</Text>
                
                <View style={styles.infoContainer}>
                    <InfoItem label="Club" value={athlete.Club} />
                    <InfoItem label="Edad" value={`${athlete.Edad} años`} />
                    <InfoItem label="Nacionalidad" value={athlete.nacionalidad} />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    card: {
        margin: 16,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    infoContainer: {
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        padding: 16,
    },
    infoItem: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
});