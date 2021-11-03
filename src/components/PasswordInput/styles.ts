import styled, { css } from 'styled-components/native';
import { TextInput } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';


interface Props {
  isFocused: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

export const IconContainer = styled.View<Props>`
  background-color: ${({ theme }) => theme.colors.background_secondary};
  height: 56px;
  width: 55px;
  justify-content: center;
  align-items: center;
  margin-right: 2px;

  ${({ theme, isFocused }) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.main};
  `}
`;

export const InputText = styled(TextInput)<Props>`
  flex: 1;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background_secondary};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  padding: 0 23px;

  ${({ theme, isFocused }) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.main};
  `}
`;

export const PasswordVisibilityButton = styled(BorderlessButton)`
  background-color: ${({ theme }) => theme.colors.background_secondary};
  justify-content: center;
  align-items: center;
  height: 56px;
  width: 55px;
`;