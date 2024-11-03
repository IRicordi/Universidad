import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View } from 'react-native';
import { Formik } from 'formik';
import { Octicons } from '@expo/vector-icons';
import { KeyboardAvoidingView, ScrollView, Platform, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

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

const Login = () => {
    const [hidePassword, setHidePassword] = useState(true);
    const { t } = useTranslation();

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
                            onSubmit={(values) => {
                                console.log(values);
                            }}
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
                                    />

                                    <StyledButton onPress={handleSubmit}>
                                        <ButtonText>
                                            {t('login.loginButton')}
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