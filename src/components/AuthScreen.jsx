import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
        <LinearGradient
            colors={['#153047', '#2B87D1', '#9CCEF4']}
            style={styles.container}
        >
            <View style={styles.overlay}>
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

                <View style={styles.contentContainer}>
                    <View style={styles.logoContainer}>
                        <Text style={styles.logoText}>SwimIt</Text>
                    </View>
                    
                    <Text style={styles.title}>{t('auth.bienvenida')}</Text>
                    
                    <View style={styles.buttonsContainer}>
                        <StyledButton 
                            style={styles.authButton}
                            onPress={() => navigation.navigate('LogIn')}
                        >
                            <ButtonText style={styles.buttonText}>
                                {t('auth.iniciarSesion')}
                            </ButtonText>
                        </StyledButton>

                        <StyledButton 
                            style={styles.authButton}
                            onPress={() => navigation.navigate('Register')}
                        >
                            <ButtonText style={styles.buttonText}>
                                {t('auth.registrarse')}
                            </ButtonText>
                        </StyledButton>

                        <StyledButton 
                            style={[styles.authButton, styles.guestButton]}
                            onPress={onSkip}
                        >
                            <ButtonText style={[styles.buttonText, styles.guestButtonText]}>
                                {t('auth.invitado')}
                            </ButtonText>
                        </StyledButton>
                    </View>
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        width: '100%',
        paddingHorizontal: 30,
        alignItems: 'center',
    },
    logoContainer: {
        marginBottom: 40,
        alignItems: 'center',
    },
    logoText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#ffffff',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 5,
    },
    title: {
        fontSize: 24,
        marginBottom: 40,
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
    buttonsContainer: {
        width: '100%',
        gap: 15,
    },
    languageSelector: {
        position: 'absolute',
        top: 40,
        right: 20,
        flexDirection: 'row',
        gap: 10,
        zIndex: 1,
    },
    langButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.9)',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    activeLangButton: {
        backgroundColor: '#2B87D1',
    },
    langButtonText: {
        color: '#374151',
        fontSize: 16,
        fontWeight: '600',
    },
    activeLangButtonText: {
        color: 'white',
    },
    authButton: {
        backgroundColor: 'rgba(255,255,255,0.95)',
        paddingVertical: 15,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    guestButton: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginTop: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
    },
    buttonText: {
        color: '#1a365d',
        fontSize: 18,
        fontWeight: '600',
    },
    guestButtonText: {
        color: '#ffffff',
    }
});