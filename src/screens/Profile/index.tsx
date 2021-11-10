import React, { useState } from 'react';
import { 
  Keyboard, 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';

import {
  Container,
  Header,
  HeaderTop,
  Title,
  LogoutButton,
  PhotoContainer,
  ProfileImage,
  ImageButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
} from './styles';
import { PasswordInput } from '../../components/PasswordInput';
import { useAuth } from '../../hooks/auth';

export function Profile() {
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const { user } = useAuth();
  const theme = useTheme();
  const navigation = useNavigation();

  function handleSignOut() {

  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Options>
              <Option active={option === 'dataEdit'} onPress={() => setOption('dataEdit')}>
                <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
              </Option>
              <Option active={option === 'passwordEdit'} onPress={() => setOption('passwordEdit')}>
                <OptionTitle active={option === 'passwordEdit'}>Trocar senha</OptionTitle>
              </Option>
            </Options>
            {
              option === 'dataEdit' ?
              <Section>
                <Input 
                  iconName="user" 
                  placeholder="Nome" 
                  autoCorrect={false} 
                  defaultValue={user.name} 
                />
                <Input
                  iconName="mail"
                  editable={false}
                  defaultValue={user.email}
                />
                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"
                  defaultValue={user.driver_license}
                />
              </Section>
              :
              <Section>
                <PasswordInput iconName="lock" placeholder="Senha atual" />
                <PasswordInput iconName="lock" placeholder="Nova senha" />
                <PasswordInput iconName="lock" placeholder="Repetir senha" />
              </Section>
            }
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}