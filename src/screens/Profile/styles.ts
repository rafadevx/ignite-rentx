import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  flex-direction: row;
  width: 100%;
  height: 227px;
  background-color: ${({ theme }) => theme.colors.header};
  justify-content: space-between;
  align-items: flex-start;
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 30}px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.lighter};
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  font-size: ${RFValue(25)}px;
`;

export const LogoutButton = styled(BorderlessButton)``;

export const ProfileImage = styled.Image`
  width: 180px;
  height: 180px;
  border-radius: 90px;
  margin-top: -90px;
  align-self: center;
`;

export const ImageButton = styled(RectButton)`
  background-color: ${({ theme }) => theme.colors.main};
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-top: -44px;
  margin-left: 136px;
`;