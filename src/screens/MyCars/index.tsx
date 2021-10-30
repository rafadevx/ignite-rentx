import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

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
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const theme = useTheme();

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get<CarProps[]>('/schedules_byuser?user_id=1');
        console.log(response);
        setCars(response.data);
        
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchCars();
    
  }, []);

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
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign name="arrowright" size={20} color={theme.colors.title} style={{ marginHorizontal: 10 }} />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
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