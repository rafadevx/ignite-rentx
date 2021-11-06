import React from 'react';
import { useWindowDimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/app.stack.routes';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { ConfirmButton } from '../../components/ConfirmButton';

import {
  Container,
  Content,
  Title,
  Message,
  Footer,
} from './styles';

interface Params {
  title: string;
  message: string;
  nextScreen: 'Home' | 'SignIn';
}

type confirmationScreenProp = StackNavigationProp<RootStackParamList, 'Confirmation'>;

export function Confirmation() {
  const { width } = useWindowDimensions();

  const navigation = useNavigation<confirmationScreenProp>();
  const route = useRoute();
  const { title, message, nextScreen } = route.params as Params;

  function handleOk() {
    navigation.navigate(nextScreen);
  }
  return (
    <Container>
      <LogoSvg width={width} />
      <Content>
        <DoneSvg width={80} height={80} />

        <Title>{title}</Title>
        <Message>
          {message}
        </Message>  
      </Content>

      <Footer>
        <ConfirmButton title="OK" onPress={handleOk} />
      </Footer>
    </Container>
  );
}