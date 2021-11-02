import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { RentalPeriod, Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { SchedulingComplete } from '../screens/SchedulingComplete';
import { MyCars } from '../screens/MyCars';
import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { FirstStep } from '../screens/SignUp/FirstStep';
import { CarDTO } from '../dtos/CarDTO';



const { Navigator, Screen } = createStackNavigator();

export type RootStackParamList = {
  SignIn: undefined;
  Home: undefined;
  CarDetails: {car: CarDTO};
  Scheduling: {car: CarDTO};
  SchedulingDetails: {car: CarDTO, dates: RentalPeriod};
  SchedulingComplete: undefined;
  MyCars: undefined;
  FirstStep: undefined;
};

export function StackRoutes() {
  return (
    <Navigator 
      screenOptions={
      {
        headerShown: false
      }
      } 
      initialRouteName="SignIn" 
    >
      <Screen name="SignIn" component={SignIn} />
      <Screen name="FirstStep" component={FirstStep} />
      <Screen name="Home" component={Home} options={{ gestureEnabled: false }}/>
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="SchedulingComplete" component={SchedulingComplete} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  )
}