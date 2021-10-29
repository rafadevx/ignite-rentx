import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/stack.routes';

import { Feather } from '@expo/vector-icons';

import api from '../../service/api';

import { Accessory } from '../../components/Accessory';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import { Button } from '../../components/Button';
import { RFValue } from 'react-native-responsive-fontsize';
import { CarDTO } from '../../dtos/CarDTO';
import { RentalPeriod as IRentalPeriod } from '../Scheduling';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Acessories,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  TotalRent,
  TotalInfo,
  TotalTitle,
  TotalDays,
  TotalValue,
  Footer,
} from './styles';




interface Params {
  car: CarDTO;
  dates: IRentalPeriod;
}

interface Schedules {
  id: string;
  unavailable_dates: string[];
}

type schedulingDetailsScreenProp = StackNavigationProp<RootStackParamList, 'SchedulingDetails'>;

export function SchedulingDetails() {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const navigation = useNavigation<schedulingDetailsScreenProp>();
  const route = useRoute();
  const { car, dates } = route.params as Params;

  async function handleConfirmRental() {
    setLoading(true);
    const { data } = await api.get<Schedules>(`/schedules_bycars/${car.id}`);

    const unavailableDates = [
      ...data.unavailable_dates,
      ...dates.dates,
    ];

    await api.post('/schedules_byuser', {
      user_id: 1,
      car,
      startDate: dates.startFormatted,
      endDate: dates.endFormatted,
    });

    api.put(`/schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates: unavailableDates,
    })
    .then(() => {
      setLoading(false);
      navigation.navigate('SchedulingComplete');
    })
    .catch(() => {
      setLoading(false);
      Alert.alert('Não foi possível confirmar o agendamento.');
    });
  }

  useEffect(() => {
    setTotal(dates.dates.length * car.rent.price);
  }, []);
  
  return (
    <Container>
      <Header>
        <BackButton color={theme.colors.text} onPress={navigation.goBack} />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Acessories>
          {car.accessories.map(accessory => (
            <Accessory key={accessory.type} name={accessory.name} icon={getAccessoryIcon(accessory.type)} />
          ))}
        </Acessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather name="calendar" size={RFValue(24)} color={theme.colors.main_light} />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{dates.startFormatted}</DateValue>
          </DateInfo>

          <Feather name="chevron-right" size={RFValue(10)} color={theme.colors.text} />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{dates.endFormatted}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <TotalRent>
          <TotalInfo>
            <TotalTitle>Total</TotalTitle>
            <TotalDays>R$ {car.rent.price} x {dates.dates.length} diárias</TotalDays>
          </TotalInfo>
          <TotalValue>R$ {total}</TotalValue>
        </TotalRent>

        
      </Content>
      <Footer>
        <Button 
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmRental}
          loading={loading}
          enabled={!loading}
        />
      </Footer>
    </Container>
  );
}