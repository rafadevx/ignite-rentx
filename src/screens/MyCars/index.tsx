import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from 'styled-components';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { format, parseISO } from 'date-fns';

import { Car } from '../../database/model/Car';

import { CarCard } from '../../components/CarCard';
import { LoadAnimation } from '../../components/LoadAnimation';

import { BackButton } from '../../components/BackButton';
import { CarDTO } from '../../dtos/CarDTO';
import api from '../../service/api';

import {
  Container,
  Header,
  Title,
  Subtitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsCount,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';

interface CarProps {
  id: string;
  car: Car;
  start_date: string;
  end_date: string;
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const theme = useTheme();

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get<CarProps[]>('/rentals');
        const dataFormatted = response.data.map(item => {
          return {
            id: item.id,
            car: item.car,
            start_date: format(parseISO(item.start_date), 'dd/MM/yyyy'),
            end_date: format(parseISO(item.end_date), 'dd/MM/yyyy'),
          }
        });
        setCars(dataFormatted);
        
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchCars();
    
  }, [isFocused]);

  return (
    <Container>
      <StatusBar style="light" />
      <Header>
        <BackButton color={theme.colors.shape} onPress={navigation.goBack} />
        <Title>
          Seus agendamentos, {'\n'}
          estão aqui.
        </Title>

        <Subtitle>
          Conforto, segurança e praticidade.
        </Subtitle>

      </Header>

      { loading ? <LoadAnimation /> :
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsCount>{cars.length}</AppointmentsCount>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={item => item.car.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <CarCard data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.start_date}</CarFooterDate>
                    <AntDesign name="arrowright" size={20} color={theme.colors.title} style={{ marginHorizontal: 10 }} />
                    <CarFooterDate>{item.end_date}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      }
    </Container>
  );
}