import React, { useEffect, useState } from 'react';
import { Alert, BackHandler } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedGestureHandler } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/app.stack.routes';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';
import { database } from '../../database';
import api from '../../service/api';

const AnimatedButton = Animated.createAnimatedComponent(MyCarsButton);

import Logo from '../../assets/logo.svg';


import { CarCard } from '../../components/CarCard';
import { CarDTO } from '../../dtos/CarDTO';
import { LoadAnimation } from '../../components/LoadAnimation';

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
  const netInfo = useNetInfo();
  
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

  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const { data } = await api
          .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);

        const { changes, latestVersion } = data;
        return { changes, timestamp: latestVersion}
      },
      pushChanges: async ({ changes }) => {
        const user = changes.user;
        await api.post('users/sync', user);
      }
    })
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const response = await api.get('/cars');
        if (isMounted) {
          setCars(response.data as CarDTO[]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCars();
    return () => {
      isMounted = false;
    };
  },[]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }, []);

  useEffect(() => {
    if(netInfo.isConnected) {
      offlineSynchronize();
    } 
  }, [netInfo.isConnected]);

  return (
    <Container>
      <StatusBar style="light" />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {
            !loading &&
            <TotalCars>
              Total {cars.length} carros
            </TotalCars>
          }
          
        </HeaderContent>
      </Header>
      { loading ? <LoadAnimation /> :
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <CarCard data={item} onPress={() => handleCarDetails(item)} />
          )}
        />      
      }

      {/* <PanGestureHandler onGestureEvent={onGestureEvent}>
        <AnimatedButtonWrapper style={myCarsButtonStyleAnimation}>
        <AnimatedButton onPress={handleOpenMyCars}>
          <Ionicons name="ios-car-sport" size={32} color={theme.colors.main_light} />
        </AnimatedButton>
        </AnimatedButtonWrapper>
      </PanGestureHandler> */}
    </Container>
  );
}