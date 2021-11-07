import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { BackButton } from '../../components/BackButton';

import {
  Container,
  Header,
  Title,
  LogoutButton,
  ProfileImage,
  ImageButton,
} from './styles';

export function Profile() {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <Container>
      <StatusBar style="light" />
      <Header>
        <BackButton color={theme.colors.lighter} onPress={navigation.goBack} />
        <Title>
          Editar Perfil
        </Title>
        <LogoutButton>
          <Feather name="power" size={24} color={theme.colors.text_detail} />
        </LogoutButton>
      </Header>
      <ProfileImage source={{ uri: 'https://avatars.githubusercontent.com/u/41025763?v=4'}} />
      <ImageButton>
        <Feather name="camera" size={24} color={theme.colors.lighter} />
      </ImageButton>

    </Container>
  );
}