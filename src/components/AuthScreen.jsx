import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    StyledButton,
    ButtonText,
} from './Styles';

export default function AuthScreen({ navigation, onSkip }) {
    const { t, i18n } = useTranslation();

    const cambiarIdioma = async (lng) => {
        try {
            await AsyncStorage.setItem('userLanguage', lng);
            i18n.changeLanguage(lng);
        } catch (error) {
            console.error('Error saving language:', error);
        }
    };

    React.useEffect(() => {
        const loadStoredLanguage = async () => {
            try {
                const storedLanguage = await AsyncStorage.getItem('userLanguage');
                if (storedLanguage) {
                    i18n.changeLanguage(storedLanguage);
                }
            } catch (error) {
                console.error('Error loading language:', error);
            }
        };

        loadStoredLanguage();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.languageSelector}>
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

            <Text style={styles.title}>{t('auth.bienvenida')}</Text>
            
            <StyledButton onPress={() => navigation.navigate('LogIn')}>
                <ButtonText>
                    {t('auth.iniciarSesion')}
                </ButtonText>
            </StyledButton>

            <StyledButton onPress={() => navigation.navigate('Register')}>
                <ButtonText>
                    {t('auth.registrarse')}
                </ButtonText>
            </StyledButton>

            <StyledButton onPress={onSkip}>
                <ButtonText>
                    {t('auth.invitado')}
                </ButtonText>
            </StyledButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#EDF6FC',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: '#2B87D1',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    languageSelector: {
        position: 'absolute',
        top: 40,
        right: 20,
        flexDirection: 'row',
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