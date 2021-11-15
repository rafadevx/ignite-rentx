import React, { useState, useEffect } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedScrollHandler, interpolate, Extrapolate } from 'react-native-reanimated';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/app.stack.routes';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import {
  Container,
  AnimatedHeaderAndSlider,
  Header,
  CarImages,
  AnimatedCarImages,
  Content,
  AnimatedContent,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Acessories,
  About,
  Footer,
} from './styles';
import { Button } from '../../components/Button';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { StatusBar } from 'expo-status-bar';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Car as CarModel } from '../../database/model/Car';
import api from '../../service/api';
import { useNetInfo } from '@react-native-community/netinfo';

interface Params {
  car: CarModel;
}

type carDetailsScreenProp = StackNavigationProp<RootStackParamList, 'CarDetails'>;

export function CarDetails() {
  const [carUpdated, setCarUpdated] = useState<CarDTO>();
  const netInfo = useNetInfo();
  const theme = useTheme();

  const navigation = useNavigation<carDetailsScreenProp>();
  const route = useRoute();
  const { car } = route.params as Params;

  const statusBarHeight = getStatusBarHeight();

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, statusBarHeight + 50],
        Extrapolate.CLAMP
      )
    }
  });

  const carSlyderStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP
      )
    }
  });

  function handleConfirmRental() {
    navigation.navigate('Scheduling', { car });
  }

  useEffect(() => {
    async function loadCarUpdated() {
      const response = await api.get(`/cars/${car.id}`);
      setCarUpdated(response.data);
    }

    if (netInfo.isConnected) {
      loadCarUpdated();
    }
  },[netInfo.isConnected]);

  return (
    <Container>
      <StatusBar style="dark" />

      <AnimatedHeaderAndSlider style={[headerStyleAnimation]}>
        <Header>
          <BackButton color={theme.colors.text} onPress={navigation.goBack} />
        </Header>

       
        <AnimatedCarImages style={carSlyderStyleAnimation}>
          <ImageSlider imagesUrl={car.photos} />
        </AnimatedCarImages>
       
      </AnimatedHeaderAndSlider>

      <AnimatedContent
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>

        <Acessories>
          {car.accessories.map(accessory => (
            <Accessory key={accessory.type} name={accessory.name} icon={getAccessoryIcon(accessory.type)} />
          ))}
          
        </Acessories>

        <About>
          {car.about}
          {car.about}
          {car.about}
          {car.about}
        </About>
      </AnimatedContent>
      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
}