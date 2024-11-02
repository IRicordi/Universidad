import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View } from 'react-native';
import { Formik } from 'formik';  // Note the capital F
import { Octicons } from '@expo/vector-icons';
import { KeyboardAvoidingView, ScrollView, Platform, Text } from 'react-native';

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
    ButtonText
} from './Styles';

const { accionbuttoms } = MainColors;

const Login = () => {
    const [hidePassword, setHidePassword] = useState(true);

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
                        <PageTitle>Bienvenido!</PageTitle> 
                        {/* // Aquí puedes cambiar el título principal */}
                        

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
                                            color: MainColors.text,
                                            marginBottom: 10,
                                            textAlign: 'center',
                                            fontWeight: 'bold'
                                        }}>
                                            Ingresa tus datos para continuar
                                        </Text>
                                    </View>

                                    <MyTextInput
                                        label="Correo Electrónico" // Aquí puedes cambiar el label del correo
                                        icon="mail"
                                        placeholder="alemanon@gmail.com"
                                        placeholderTextColor={MainColors.tertiary}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}     
                                        value={values.email}
                                        keyboardType="email-address"
                                    />

                                    <MyTextInput
                                        label="Contraseña" // Aquí puedes cambiar el label de la contraseña
                                        icon="lock"
                                        placeholder="* * * * * * * *"
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
                                            Iniciar Sesión
                                            {/* // Aquí puedes cambiar el texto del botón */}
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
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={accionbuttoms} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Octicons 
                        name={hidePassword ? 'eye-closed' : 'eye'} 
                        size={30} 
                        color={MainColors.tertiary}
                    />
                </RightIcon>
            )}
        </View>
    );
};

export default Login;