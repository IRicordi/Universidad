import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Alert } from 'react-native';
import { Formik } from 'formik';
import { Octicons } from '@expo/vector-icons';
import { KeyboardAvoidingView, ScrollView, Platform, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../Config/firebase';

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

const { accionbuttoms, text } = MainColors;

const Login = ({ navigation, onLogin }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const auth = FIREBASE_AUTH;

    const handleLogin = async (values) => {
        if (values.email === '' || values.password === '') {
            Alert.alert(t('login.errorTitle'), t('login.emptyFields'));
            return;
        }

        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );

            console.log('Usuario logueado:', response.user.email);
            Alert.alert(t('login.successTitle'), t('login.successMessage'));
            onLogin();
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            let errorMessage;
            
            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage = t('login.errors.invalidEmail');
                    break;
                case 'auth/user-not-found':
                    errorMessage = t('login.errors.userNotFound');
                    break;
                case 'auth/wrong-password':
                    errorMessage = t('login.errors.wrongPassword');
                    break;
                case 'auth/too-many-requests':
                    errorMessage = t('login.errors.tooManyRequests');
                    break;
                case 'auth/network-request-failed':
                    errorMessage = t('login.errors.networkError');
                    break;
                default:
                    errorMessage = t('login.errors.default');
            }
            
            Alert.alert(t('login.errorTitle'), errorMessage);
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
                        <PageTitle>{t('login.welcome')}</PageTitle>

                        <Formik
                            initialValues={{ email: '', password: '' }}
                            onSubmit={handleLogin}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values }) => (
                                <StyledFormArea>
                                    <View style={{ marginBottom: 25 }}>
                                        <Text style={{ 
                                            fontSize: 16, 
                                            color: text,
                                            marginBottom: 10,
                                            textAlign: 'center',
                                            fontWeight: 'bold'
                                        }}>
                                            {t('login.enterData')}
                                        </Text>
                                    </View>

                                    <MyTextInput
                                        label={t('login.email')}
                                        icon="mail"
                                        placeholder={t('login.emailPlaceholder')}
                                        placeholderTextColor={MainColors.tertiary}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}     
                                        value={values.email}
                                        keyboardType="email-address"
                                        editable={!loading}
                                    />

                                    <MyTextInput
                                        label={t('login.password')}
                                        icon="lock"
                                        placeholder={t('login.passwordPlaceholder')}
                                        placeholderTextColor={MainColors.tertiary}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}     
                                        value={values.password}
                                        secureTextEntry={hidePassword}
                                        isPassword={true}
                                        hidePassword={hidePassword}
                                        setHidePassword={setHidePassword}
                                        editable={!loading}
                                    />

                                    <StyledButton 
                                        onPress={handleSubmit}
                                        disabled={loading}
                                        style={{ opacity: loading ? 0.7 : 1 }}
                                    >
                                        <ButtonText>
                                            {loading ? t('login.loading') : t('login.loginButton')}
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
                    <Octicons name={icon} size={20} color={accionbuttoms} />
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

export default Login;