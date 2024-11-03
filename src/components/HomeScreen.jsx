import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { StyledContainer, PageTitle } from './Styles';
import { useTranslation } from 'react-i18next';
import NewsCarousel from './NewsCarousel';

export default function HomeScreen({ navigation }) {
  const { t } = useTranslation();

  return (
    <StyledContainer>
      <PageTitle>{t('home.latestNews')}</PageTitle>
      <NewsCarousel />
      <Button
        title={t('home.viewAthletes')}
        onPress={() => navigation.navigate('Athletes')}
      />
      <Button
        title={t('home.viewClubs')}
        onPress={() => navigation.navigate('Clubs')}
      />
    </StyledContainer>
  );
}