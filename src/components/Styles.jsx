import styled from 'styled-components';
import Constants from 'expo-constants';
import { TouchableOpacity, Text } from 'react-native';

const StatusBarHeight = Constants.statusBarHeight;

export const MainColors = {
    primary: "#2B87D1",
    text: "#164B74",
    secondary: "#71B2E3",
    background: "#EDF6FC",
    purewhite: "#FFFFFF",
    accionbuttoms: "#40C4FF",
    tertiary: "#E0F4FF",
};

const { primary, text, tertiary, secondary, background, purewhite, accionbuttoms } = MainColors;

export const StyledContainer = styled.View`
    flex: 1;
    padding: 25px;
    padding-top: ${StatusBarHeight + 10}px;
    background-color: ${background};
`;

export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
`;

export const PageLogo = styled.Image`
    width: 250px;
    height: 200px;
`;

export const PageTitle = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${primary};
    padding: 10px;
`;

export const Subtittle = styled.Text`
    font-size: 18px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${text};
`;

export const StyledFormArea = styled.View`
    width: 90%;
`;

export const InputContainer = styled.View`
    width: 100%;
    margin-bottom: 15px;
`;

export const StyledTextInput = styled.TextInput`
    background-color: ${secondary};
    padding: 15px;
    padding-left: 50px;
    padding-right: 50px;
    border-radius: 5px;
    font-size: 16px;
    height: 50px;
    color: ${tertiary};
`;


export const StyledInputLabel = styled.Text`
    color: ${primary};
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
`;

export const LeftIcon = styled.View`
    left: 15px;
    position: absolute;
    height: 100%;
    justify-content: center;
    align-items: center;
    z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
    right: 15px;
    position: absolute;
    height: 100%;
    justify-content: center;
    align-items: center;
    z-index: 1;
`;

export const StyledButton = ({ children, style, ...props }) => (
    <TouchableOpacity
        style={[{
            width: '100%',
            padding: 15,
            borderRadius: 5,
            backgroundColor: '#2B87D1',
            marginVertical: 5,
        }, style]}
        {...props}
    >
        {children}
    </TouchableOpacity>
);

export const ButtonText = styled.Text`
    color: ${purewhite};
    font-size: 16px;
    font-weight: bold;
`;

export const MessageContainer = styled.View`
    margin-bottom: 25px;
    padding: 10px;
`;

export const MessageText = styled.Text`
    font-size: 16px;
    color: ${primary};
    margin-bottom: 10px;
    font-weight: bold;
`;
