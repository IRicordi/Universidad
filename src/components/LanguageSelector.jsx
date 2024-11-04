import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LanguageSelector() {
    const { i18n } = useTranslation();

    const cambiarIdioma = async (lng) => {
        try {
            await AsyncStorage.setItem('userLanguage', lng);
            i18n.changeLanguage(lng);
        } catch (error) {
            console.error('Error saving language:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => cambiarIdioma('es')}
                style={[
                    styles.langButton,
                    i18n.language === 'es' && styles.activeLangButton
                ]}
            >
                <Text style={[
                    styles.langButtonText,
                    i18n.language === 'es' && styles.activeLangButtonText
                ]}>ES</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => cambiarIdioma('en')}
                style={[
                    styles.langButton,
                    i18n.language === 'en' && styles.activeLangButton
                ]}
            >
                <Text style={[
                    styles.langButtonText,
                    i18n.language === 'en' && styles.activeLangButtonText
                ]}>EN</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        gap: 10,
    },
    langButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
        backgroundColor: '#e5e7eb',
    },
    activeLangButton: {
        backgroundColor: '#2B87D1',
    },
    langButtonText: {
        color: '#374151',
        fontSize: 14,
        fontWeight: '600',
    },
    activeLangButtonText: {
        color: 'white',
    },
});