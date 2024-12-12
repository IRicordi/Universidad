import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, KeyboardAvoidingView, ScrollView, Platform, Alert, TouchableOpacity, Text, StyleSheet } from 'react-native';
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
    const [selectedRole, setSelectedRole] = useState(null);
    const { t } = useTranslation();
    const auth = FIREBASE_AUTH;

    const handleRegistration = async (values) => {
        const { t } = useTranslation();
      
        // Validación de rol
        if (!selectedRole) {
          Alert.alert(
            t('register.errorTitle'),
            t('register.roleRequired')
          );
          return;
        }
      
        // Validación de contraseñas
        if (values.password !== values.confirmPassword) {
          Alert.alert(
            t('register.errorTitle'),
            t('register.passwordMismatch') 
          );
          return;
        }
      
        setLoading(true);
        try {
          const response = await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password
          );
      
          // Crear documento del usuario
          await setDoc(doc(FIREBASE_DB, 'users', response.user.uid), {
            nombre: values.nombre,
            email: values.email,
            rol: selectedRole,
            createdAt: new Date().toISOString(),
            telefono: '',
            direccion: '',
            fechaNacimiento: '',
            fotoPerfil: '',
            updatedAt: new Date().toISOString(),
            configuracion: {
              notificaciones: true,
              privacidad: 'public',
              tema: 'light'
            },
            isComplete: false
          });
      
          Alert.alert(
            t('register.successTitle'), 
            t('register.successMessage') 
          );
          onRegister();
        } catch (error) {
          console.error('Error en el registro:', error);
          
          // Manejo de errores específicos de Firebase
          let errorMessage;
          switch (error.code) {
            case 'auth/email-already-in-use':
              errorMessage = t('register.errors.emailInUse');
              break;
            case 'auth/invalid-email':
              errorMessage = t('register.errors.invalidEmail');
              break;
            case 'auth/operation-not-allowed':
              errorMessage = t('register.errors.operationNotAllowed');
              break;
            case 'auth/weak-password':
              errorMessage = t('register.errors.weakPassword');
              break;
            default:
              errorMessage = t('register.errors.default');
          }
      
          Alert.alert(
            t('register.errorTitle'),
            errorMessage
          );
        } finally {
          setLoading(false);
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

                                    {/* Botones de Rol */}
                                    <View style={styles.roleContainer}>
                                        <Text style={styles.roleLabel}>{t('register.role')}</Text>
                                        <View style={styles.buttonContainer}>
                                            <TouchableOpacity
                                                style={[
                                                    styles.roleButton,
                                                    selectedRole === 'nadador' && styles.selectedButton
                                                ]}
                                                onPress={() => setSelectedRole('nadador')}
                                            >
                                                <Text style={[
                                                    styles.roleButtonText,
                                                    selectedRole === 'nadador' && styles.selectedButtonText
                                                ]}>
                                                    {t('register.roles.swimmer')}
                                                </Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={[
                                                    styles.roleButton,
                                                    selectedRole === 'entrenador' && styles.selectedButton
                                                ]}
                                                onPress={() => setSelectedRole('entrenador')}
                                            >
                                                <Text style={[
                                                    styles.roleButtonText,
                                                    selectedRole === 'entrenador' && styles.selectedButtonText
                                                ]}>
                                                    {t('register.roles.coach')}
                                                </Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={[
                                                    styles.roleButton,
                                                    selectedRole === 'marca' && styles.selectedButton
                                                ]}
                                                onPress={() => setSelectedRole('marca')}
                                            >
                                                <Text style={[
                                                    styles.roleButtonText,
                                                    selectedRole === 'marca' && styles.selectedButtonText
                                                ]}>
                                                    {t('register.roles.brand')}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

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

const styles = StyleSheet.create({
    roleContainer: {
        marginVertical: 15,
        width: '100%',
    },
    roleLabel: {
        fontSize: 16,
        marginBottom: 10,
        color: MainColors.primary,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    roleButton: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: MainColors.accionbuttoms,
        alignItems: 'center',
    },
    selectedButton: {
        backgroundColor: MainColors.accionbuttoms,
    },
    roleButtonText: {
        color: MainColors.accionbuttoms,
        fontSize: 13,
        fontWeight: '500',
    },
    selectedButtonText: {
        color: 'white',
    },
});

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