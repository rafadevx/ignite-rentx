import React, { useState } from 'react';
import { 
  Alert,
  Keyboard, 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';
import { PasswordInput } from '../../components/PasswordInput';
import { Button } from '../../components/Button';
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


export function Profile() {
  const { user, signOut, updateUser } = useAuth();
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);
  const theme = useTheme();
  const navigation = useNavigation();

  async function handleSelectAvatar(){
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    if (result.uri) {
      setAvatar(result.uri);
    }
  }

  async function handleProfileUpdate() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('CNH é obrigatória'),
        name: Yup.string().required('Nome é obrigatório')
      });

      const data = { name, driverLicense };
      await schema.validate(data);

      await updateUser({
        ...user, name, driver_license: driverLicense, avatar
      });

      Alert.alert('Perfil Atualizado!');  
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message);  
      }
      console.log(error)
      Alert.alert('Não foi possível atualizar o perfil');
    }
  }

  async function handleSignOut() {
    Alert.alert(
      'Tem certeza?',
      'Se você sair, precisará de internet para conectar-se novamente.',
      [
        {
          text: 'Cancelar',
          onPress: () => {}
        },
        {
          text: 'Sair',
          onPress: () => signOut()
        }
      ]
    );
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
              {!!avatar && 
                <ProfileImage source={{ uri: avatar}} />
              }
              <ImageButton onPress={handleSelectAvatar}>
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
                  onChangeText={setName}
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
                  onChangeText={setDriverLicense}
                />
              </Section>
              :
              <Section>
                <PasswordInput iconName="lock" placeholder="Senha atual" />
                <PasswordInput iconName="lock" placeholder="Nova senha" />
                <PasswordInput iconName="lock" placeholder="Repetir senha" />
              </Section>
            }

            <Button title="Salvar alterações" onPress={handleProfileUpdate} />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}