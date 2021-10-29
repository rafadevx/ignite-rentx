import React from 'react';
import { useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/stack.routes';

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

type schedulingCompleteScreenProp = StackNavigationProp<RootStackParamList, 'SchedulingComplete'>;

export function SchedulingComplete() {
  const { width } = useWindowDimensions();

  const navigation = useNavigation<schedulingCompleteScreenProp>();

  function handleOk() {
    navigation.navigate('Home');
  }
  return (
    <Container>
      <LogoSvg width={width} />
      <Content>
        <DoneSvg width={80} height={80} />

        <Title>Carro Alugado!</Title>
        <Message>
          Agora você só precisa ir {'\n'}
          até a concessionária da RENTX {'\n'}
          buscar seu automóvel
        </Message>  
      </Content>

      <Footer>
        <ConfirmButton title="OK" onPress={handleOk} />
      </Footer>
    </Container>
  );
}