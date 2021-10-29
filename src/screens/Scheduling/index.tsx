import React, { useState} from 'react';
import { Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from 'styled-components';
import { format } from 'date-fns';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/stack.routes';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar, SelectedDay, MarkedDateProps } from '../../components/Calendar';
import { generateInterval } from '../../components/Calendar/generateInterval';
import { getPlatformDate } from '../../utils/getPlataformDate';
import { CarDTO } from '../../dtos/CarDTO';

import ArrowSvg from '../../assets/arrow.svg';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  DateValueWrapper,
  Content,
  Footer,
} from './styles';

interface Params {
  car: CarDTO;
}

export interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
  dates: string[];
}

type schedulingScreenProp = StackNavigationProp<RootStackParamList, 'Scheduling'>;

export function Scheduling() {
  const theme = useTheme();
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [lastSelectedDay, setLastSelectedDay] = useState<SelectedDay>({} as SelectedDay);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
  const navigation = useNavigation<schedulingScreenProp>();
  const route = useRoute();
  const { car } = route.params as Params;

  function handleConfirmRental() {
    if (!rentalPeriod.startFormatted || !rentalPeriod.endFormatted) {
      Alert.alert('Selecione o período do aluguel.');
    } else {
      navigation.navigate('SchedulingDetails', {
        car,
        dates: rentalPeriod,
      });
    }
  }

  function handleChangeDate(day: SelectedDay) {
    let start = !lastSelectedDay.timestamp ? day : lastSelectedDay;
    let end = day;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDay(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const intervalKeys = Object.keys(interval);
    const firstDate = intervalKeys[0];
    const endDate = intervalKeys[intervalKeys.length - 1];
    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
      dates: intervalKeys,
    });
  }
  
  return (
    <Container>
      <StatusBar style="light" />
      <Header>
        <BackButton color={theme.colors.shape} onPress={navigation.goBack} />
        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValueWrapper selected={!!rentalPeriod.startFormatted}>
              <DateValue>{rentalPeriod.startFormatted}</DateValue>
            </DateValueWrapper>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValueWrapper selected={!!rentalPeriod.endFormatted}>
              <DateValue>{rentalPeriod.endFormatted}</DateValue>
            </DateValueWrapper>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar
          onDayPress={handleChangeDate}
          markedDates={markedDates}
        />
      </Content>

      <Footer>
        <Button
          title="Confirmar"
          onPress={handleConfirmRental}
          enabled={!!rentalPeriod.startFormatted}
        />
      </Footer>
    </Container>
  );
}