import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Confirmation } from '../screens/Confirmation';
import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { FirstStep } from '../screens/SignUp/FirstStep';
import { SecondStep } from '../screens/SignUp/SecondStep';

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

export type RootAuthParamList = {
  Splash: undefined;
  SignIn: undefined;
  Confirmation: ConfirmationProps;
  FirstStep: undefined;
  SecondStep: {user: UserProps};
};

export function AuthRoutes() {
  return (
    <Navigator 
      screenOptions={
      {
        headerShown: false
      }
      } 
      initialRouteName="Splash" 
    >
      <Screen name="Splash" component={Splash} options={{ gestureEnabled: false }}/>
      <Screen name="SignIn" component={SignIn} />
      <Screen name="FirstStep" component={FirstStep} />
      <Screen name="SecondStep" component={SecondStep} />
      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  )
}