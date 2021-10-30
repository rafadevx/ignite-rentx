import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedGestureHandler } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/stack.routes';

const AnimatedButton = Animated.createAnimatedComponent(MyCarsButton);

import api from '../../service/api';
import Logo from '../../assets/logo.svg';


import { CarCard } from '../../components/CarCard';
import { CarDTO } from '../../dtos/CarDTO';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
  MyCarsButton,
  AnimatedButtonWrapper,
} from './styles';


type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

export function Home() {
  const theme = useTheme();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<homeScreenProp>();
  
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const myCarsButtonStyleAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ]
    }
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any){
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any){
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd(){

    }
  });

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  function handleOpenMyCars() {
    navigation.navigate('MyCars');
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/cars');
        setCars(response.data as CarDTO[]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  },[]);

  return (
    <Container>
      <StatusBar style="light" />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>
            Total {cars.length} carros
          </TotalCars>
        </HeaderContent>
      </Header>
      { loading ? <ActivityIndicator size="large" color={theme.colors.main} style={{ flex: 1 }} /> :
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <CarCard data={item} onPress={() => handleCarDetails(item)} />
          )}
        />      
      }

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <AnimatedButtonWrapper style={myCarsButtonStyleAnimation}>
        <AnimatedButton onPress={handleOpenMyCars}>
          <Ionicons name="ios-car-sport" size={32} color={theme.colors.main_light} />
        </AnimatedButton>
        </AnimatedButtonWrapper>
      </PanGestureHandler>
    </Container>
  );
}