import React from 'react';
import { StyleSheet } from 'react-native';
import { StyledContainer, PageTitle } from './Styles';
import { useTranslation } from 'react-i18next';
import ProfileCapsules from './ProfileCapsules';
import ProfileAlert from './ProfileCompletation';

export default function HomeScreen({ navigation }) {
  const { t } = useTranslation();

  return (
    <StyledContainer>
      <ProfileAlert />
      <PageTitle>{t('home.featuredProfiles')}</PageTitle>
      <ProfileCapsules navigation={navigation} />
    </StyledContainer>
  );
}