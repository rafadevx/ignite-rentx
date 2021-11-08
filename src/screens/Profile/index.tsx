import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { BackButton } from '../../components/BackButton';

import {
  Container,
  Header,
  HeaderTop,
  Title,
  LogoutButton,
  PhotoContainer,
  ProfileImage,
  ImageButton,
} from './styles';

export function Profile() {
  const theme = useTheme();
  const navigation = useNavigation();

  function handleSignOut() {

  }

  return (
    <Container>
      <StatusBar style="light" />
      <Header>
        <HeaderTop>
          <BackButton color={theme.colors.lighter} onPress={navigation.goBack} />
          <Title>
            Editar Perfil
          </Title>
          <LogoutButton onPress={handleSignOut}>
            <Feather name="power" size={24} color={theme.colors.text_detail} />
          </LogoutButton>
        </HeaderTop>
        <PhotoContainer>
          <ProfileImage source={{ uri: 'https://avatars.githubusercontent.com/u/41025763?v=4'}} />
          <ImageButton>
            <Feather name="camera" size={24} color={theme.colors.lighter} />
          </ImageButton>
        </PhotoContainer>
      </Header>

    </Container>
  );
}