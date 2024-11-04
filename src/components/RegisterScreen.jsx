import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, KeyboardAvoidingView, ScrollView, Platform, Alert } from 'react-native';
import { Formik } from 'formik';
import { Octicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from '../Config/firebase';

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    Subtittle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    MainColors,
    StyledButton,
    ButtonText,
    InputContainer
} from './Styles';

const Register = ({ navigation, onRegister }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const auth = FIREBASE_AUTH;

    const handleRegistration = async (values) => {
        if (values.password !== values.confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return;
        }
    
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );
    
            // Guardar información expandida del usuario en Firestore
            await setDoc(doc(FIREBASE_DB, 'users', response.user.uid), {
                nombre: values.nombre,
                email: values.email,
                createdAt: new Date().toISOString(),
                // Campos adicionales inicializados
                telefono: '',
                direccion: '',
                fechaNacimiento: '',
                fotoPerfil: '', // URL para la foto de perfil
                updatedAt: new Date().toISOString(),
                configuracion: {
                    notificaciones: true,
                    privacidad: 'public',
                    tema: 'light'
                },
                rol: 'usuario',
                isComplete: false // Para saber si completó su perfil
            });
    
            Alert.alert('Éxito', '¡Registro completado con éxito!');
            onRegister();
        } catch (error) {
            
        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <StyledContainer>
                <StatusBar style="dark" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <InnerContainer>
                        <PageLogo resizeMode="cover" source={require('../../assets/logo.png')} />
                        <PageTitle>{t('register.title')}</PageTitle>
                        <Subtittle>{t('register.subtitle')}</Subtittle>

                        <Formik
                            initialValues={{ 
                                nombre: '',
                                email: '', 
                                password: '',
                                confirmPassword: '' 
                            }}
                            onSubmit={handleRegistration}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values }) => (
                                <StyledFormArea>
                                    <MyTextInput
                                        label={t('register.fullName')}
                                        icon="person"
                                        placeholder={t('register.fullNamePlaceholder')}
                                        onChangeText={handleChange('nombre')}
                                        onBlur={handleBlur('nombre')}     
                                        value={values.nombre}
                                    />

                                    <MyTextInput
                                        label={t('register.email')}
                                        icon="mail"
                                        placeholder={t('register.emailPlaceholder')}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}     
                                        value={values.email}
                                        keyboardType="email-address"
                                    />

                                    <MyTextInput
                                        label={t('register.password')}
                                        icon="lock"
                                        placeholder={t('register.passwordPlaceholder')}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}     
                                        value={values.password}
                                        secureTextEntry={hidePassword}
                                        isPassword={true}
                                        hidePassword={hidePassword}
                                        setHidePassword={setHidePassword}
                                    />

                                    <MyTextInput
                                        label={t('register.confirmPassword')}
                                        icon="lock"
                                        placeholder={t('register.confirmPasswordPlaceholder')}
                                        onChangeText={handleChange('confirmPassword')}
                                        onBlur={handleBlur('confirmPassword')}     
                                        value={values.confirmPassword}
                                        secureTextEntry={hideConfirmPassword}
                                        isPassword={true}
                                        hidePassword={hideConfirmPassword}
                                        setHidePassword={setHideConfirmPassword}
                                    />

                                    <StyledButton 
                                        onPress={handleSubmit}
                                        disabled={loading}
                                        style={{ opacity: loading ? 0.7 : 1 }}
                                    >
                                        <ButtonText>
                                            {loading ? 'Registrando...' : t('register.registerButton')}
                                        </ButtonText>
                                    </StyledButton>
                                </StyledFormArea>
                            )}
                        </Formik>
                    </InnerContainer>
                </ScrollView>
            </StyledContainer>
        </KeyboardAvoidingView>
    );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
        <InputContainer>
            {label && <StyledInputLabel>{label}</StyledInputLabel>}
            <View style={{ position: 'relative' }}>
                <LeftIcon>
                    <Octicons name={icon} size={20} color={MainColors.accionbuttoms} />
                </LeftIcon>
                <StyledTextInput {...props} />
                {isPassword && (
                    <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                        <Octicons 
                            name={hidePassword ? 'eye-closed' : 'eye'} 
                            size={20} 
                            color={MainColors.tertiary}
                        />
                    </RightIcon>
                )}
            </View>
        </InputContainer>
    );
};

export default Register;