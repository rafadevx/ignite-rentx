import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { RentalPeriod, Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { Confirmation } from '../screens/Confirmation';
import { MyCars } from '../screens/MyCars';
import { Splash } from '../screens/Splash';
import { CarDTO } from '../dtos/CarDTO';
import { Car } from '../database/model/Car';



const { Navigator, Screen } = createStackNavigator();

interface UserProps {
  name: string;
  email: string;
  driverLicense: string;
}

interface ConfirmationProps {
  title: string;
  message: string;
  nextScreen: 'Home' | 'SignIn';
}

export type RootStackParamList = {
  SignIn: undefined;
  Home: undefined;
  CarDetails: {car: Car};
  Scheduling: {car: CarDTO};
  SchedulingDetails: {car: CarDTO, dates: RentalPeriod};
  Confirmation: ConfirmationProps;
  MyCars: undefined;
  FirstStep: undefined;
  SecondStep: {user: UserProps};
};

export function AppStackRoutes() {
  return (
    <Navigator 
      screenOptions={
      {
        headerShown: false
      }
      } 
      initialRouteName="Home" 
    >
      <Screen name="Splash" component={Splash} />
      <Screen name="Home" component={Home} options={{ gestureEnabled: false }}/>
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="Confirmation" component={Confirmation} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  )
}