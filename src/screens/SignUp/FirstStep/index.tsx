import React, { useState } from 'react';
import { 
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native';
import * as Yup from 'yup';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootAuthParamList } from '../../../routes/auth.routes';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
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

type signUpFistStepScreenProp = StackNavigationProp<RootAuthParamList, 'FirstStep'>;

export function FirstStep() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');
  const navigation = useNavigation<signUpFistStepScreenProp>();
  const theme = useTheme();

  async function handleNext() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('CNH é obrigatória.'),
        email: Yup.string().email('E-mail inválido.').required('E-mail é obrigatório.'),
        name: Yup.string().required('O nome é obrigatório.'),
      });

      const data = {name, email, driverLicense};
      await schema.validate(data);

      navigation.navigate('SecondStep', { user: data });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa!', error.message);
      } else {
        Alert.alert(
          'Erro no cadastro',
          'Ocorreu erro ao fazer o cadastro, verifique as informações.'
        );
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <BackButton onPress={navigation.goBack} color={theme.colors.text} />
          <Steps>
            <Bullet active />
            <Bullet />
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
            1. Dados
          </FormTitle>
          <Input 
            iconName="user" 
            placeholder="Nome" 
            value={name} 
            onChangeText={setName}
          />
          <Input 
            iconName="mail" 
            placeholder="E-mail" 
            keyboardType="email-address" 
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />
          <Input 
            iconName="credit-card" 
            placeholder="CNH" 
            keyboardType="numeric" 
            value={driverLicense}
            onChangeText={setDriverLicense}
          />
        </Form>

        <Button title="Próximo" onPress={handleNext} />

      </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}