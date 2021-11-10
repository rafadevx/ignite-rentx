import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import {
  Container,
  IconContainer,
  InputText,
  PasswordVisibilityButton,
} from './styles';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

export function PasswordInput({ iconName, value, ...rest }: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const theme = useTheme();

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  function handlePasswordVisibility() {
    setIsPasswordVisible(prevState => !prevState);
  }

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
        name={iconName}
        size={24}
        color={ isFocused || isFilled ? theme.colors.main : theme.colors.text_detail}
      />
      </IconContainer>
      <InputText
        {...rest}
        isFocused={isFocused}
        secureTextEntry={isPasswordVisible}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        autoCorrect={false}
      />
      <PasswordVisibilityButton onPress={handlePasswordVisibility}>
        <Feather name={isPasswordVisible ? 'eye' : 'eye-off'} size={24} color={theme.colors.text_detail} />
      </PasswordVisibilityButton>
    </Container>
  );
}