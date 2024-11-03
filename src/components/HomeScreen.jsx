import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { StyledContainer, PageTitle } from './Styles';
import NewsCarousel from './NewsCarousel';

export default function HomeScreen({ navigation }) {
  return (
    <StyledContainer>
      <PageTitle>Últimas noticias!</PageTitle>
      <NewsCarousel />
      <Button
        title="Ver Deportistas"
        onPress={() => navigation.navigate('Athletes')}
      />
      <Button
        title="Ver Clubes"
        onPress={() => navigation.navigate('Clubs')}
      />
    </StyledContainer>
  );
}

