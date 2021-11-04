import React, { useState } from 'react';
import { 
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../routes/stack.routes';
import { useTheme } from 'styled-components';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from './styles';
import { PasswordInput } from '../../../components/PasswordInput';
import api from '../../../service/api';

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  }
}

type signUpSecondStepScreenProp = StackNavigationProp<RootStackParamList, 'SecondStep'>;

export function SecondStep() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation<signUpSecondStepScreenProp>();
  const route = useRoute();
  const { user } = route.params as Params;

  const theme = useTheme();

  async function handleRegister() {
    if (!password || !confirmPassword) {
      return Alert.alert('Informe a senha.');
    }
    if (password !== confirmPassword) {
      return Alert.alert('Senhas não conferem.');
    }

    try {
      await api.post('/users', {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password
      });
  
      navigation.navigate('Confirmation', {
        title: 'Conta Criada',
        message: '',
        nextScreen: 'SignIn'
      });  
    } catch (error) {
      console.log(error);
      Alert.alert('Opa!', 'Não foi possível cadastrar.')
    }
    
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <BackButton onPress={navigation.goBack} color={theme.colors.text} />
          <Steps>
            <Bullet />
            <Bullet active/>
          </Steps>
        </Header>
        <Title>
          Crie sua{'\n'}
          conta
        </Title>
        <SubTitle>
          Faça seu cadastro de{'\n'}
          forma rápida e fácil.
        </SubTitle>

        <Form>
          <FormTitle>
            2. Senha
          </FormTitle>
          <PasswordInput
            iconName="lock"
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
          />
          <PasswordInput 
            iconName="lock" 
            placeholder="Repetir senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </Form>

        <Button 
          title="Cadastrar" 
          onPress={handleRegister} 
          color={theme.colors.success} 
          enabled={!!password && !!confirmPassword}
        />

      </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}