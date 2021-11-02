import React from 'react';
import { 
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
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


export function FirstStep() {
  const navigation = useNavigation();
  const theme = useTheme();
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
          <Input iconName="user" />
          <Input iconName="mail" />
          <Input iconName="credit-card" />
        </Form>

        <Button title="Próximo" onPress={() => {}} />

      </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}