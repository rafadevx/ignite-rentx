import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/stack.routes';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, interpolate, Extrapolate, runOnJS } from 'react-native-reanimated';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';


import {
  Container,
} from './styles';

type splashScreenProp = StackNavigationProp<RootStackParamList, 'Splash'>;

export function Splash() {
  const navigation = useNavigation<splashScreenProp>();
  const splasAnimation = useSharedValue(0);

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splasAnimation.value,
        [0, 50],
        [1, 0]
      ),
      transform: [
        {
          translateX: interpolate(splasAnimation.value,
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP
          ),
        }
      ]
    }
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splasAnimation.value,
        [0, 25, 50],
        [0, .3, 1]
      ),
      transform: [
        {
          translateX: interpolate(splasAnimation.value,
            [0, 50],
            [-50, 0],
            Extrapolate.CLAMP
          ),
        }
      ]
    }
  });

  function startApp() {
    navigation.navigate('Home');
  }

  useEffect(() => {
    splasAnimation.value = withTiming(
      50,
      { duration: 900 },
      () => {
        'worklet'
        runOnJS(startApp)()
      }
    );
  }, []);

  return (
    <Container>
      <Animated.View style={[brandStyle, { position: 'absolute' }]} >
        <BrandSvg width={80} height={50} />
      </Animated.View>

      <Animated.View style={[logoStyle, , { position: 'absolute' }]} >
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </Container>
  );
}
