import React, { useState } from 'react';
import { 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  Keyboard, 
  Alert
} from 'react-native';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootAuthParamList } from '../../routes/auth.routes';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Form,
  ButtonArea
} from './styles';
import { useAuth } from '../../hooks/auth';
import { StatusBar } from 'expo-status-bar';

type signInScreenProp = StackNavigationProp<RootAuthParamList, 'SignIn'>;

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
  const theme = useTheme();
  const navigation = useNavigation<signInScreenProp>();

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().required('Senha é obrigatória')
      });

      await schema.validate({ email, password });
      signIn({ email, password });
    } catch(error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa!', error.message);
      } else {
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu erro ao fazer login, verifique as credenciais.'
        );
      }
    }
  }

  function handleNewAccount() {
    navigation.navigate('FirstStep');
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <StatusBar style="dark" translucent />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <Title>
              Estamos{'\n'}
              quase lá.
            </Title>
            <SubTitle>
              Faça seu login para começar{'\n'}
              uma experiência incrível.
            </SubTitle>
          </Header>

          <Form>
            <Input 
              iconName="mail" 
              placeholder="E-mail" 
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />
            <PasswordInput 
              iconName="lock" 
              placeholder="Senha" 
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setPassword}
              value={password}
            />
          </Form>
          
          <ButtonArea>
            <Button
              title="Login"
              onPress={handleSignIn}
              enabled={true}
              loading={false}
            />
            <Button
              title="Criar conta gratuita"
              color={theme.colors.background_secondary}
              onPress={handleNewAccount}
              enabled={true}
              loading={false}
              light
            />
          </ButtonArea>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}