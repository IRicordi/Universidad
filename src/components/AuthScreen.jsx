import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    StyledButton,
    ButtonText,
} from './Styles';

export default function AuthScreen({ navigation, onSkip }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido a SwimIt Chile</Text>
            
            <StyledButton onPress={() => navigation.navigate('LogIn')}>
                <ButtonText>
                    Iniciar Sesión
                </ButtonText>
            </StyledButton>

            <StyledButton onPress={() => navigation.navigate('Register')}>
                <ButtonText>
                    Registrarse
                </ButtonText>
            </StyledButton>

            <StyledButton onPress={onSkip}>
                <ButtonText>
                    Entrar como Invitado
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
});