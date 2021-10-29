import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { RentalPeriod, Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { SchedulingComplete } from '../screens/SchedulingComplete';
import { MyCars } from '../screens/MyCars';
import { Splash } from '../screens/Splash';
import { CarDTO } from '../dtos/CarDTO';



const { Navigator, Screen } = createStackNavigator();

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  CarDetails: {car: CarDTO};
  Scheduling: {car: CarDTO};
  SchedulingDetails: {car: CarDTO, dates: RentalPeriod};
  SchedulingComplete: undefined;
  MyCars: undefined;
};

export function StackRoutes() {
  return (
    <Navigator 
      screenOptions={
      {
        headerShown: false
      }
      } 
      initialRouteName="Splash" 
    >
      <Screen name="Splash" component={Splash} />
      <Screen name="Home" component={Home} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="SchedulingComplete" component={SchedulingComplete} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  )
}