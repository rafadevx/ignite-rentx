import styled, { css } from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';

interface OptionProps {
  active: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: 227px;
  background-color: ${({ theme }) => theme.colors.header};
  padding: 0 24px;
  align-items: center;
`;

export const HeaderTop = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${getStatusBarHeight() + 10}px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.lighter};
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  font-size: ${RFValue(25)}px;
`;

export const LogoutButton = styled(BorderlessButton)``;

export const PhotoContainer = styled.View`
  width: 180px;
  height: 180px;
  border-radius: 90px;
  background-color: ${({ theme }) => theme.colors.shape};
  margin-top: 48px;
`;

export const ProfileImage = styled.Image`
  width: 180px;
  height: 180px;
  border-radius: 90px;
`;

export const ImageButton = styled(RectButton)`
  background-color: ${({ theme }) => theme.colors.main};
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 4px;
  right: 4px;
`;

export const Content = styled.View`
  flex: 1;
  padding: 0 24px;
  margin-top: 122px;
`;

export const Options = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.line};

  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 24px;
`;

export const Option = styled.TouchableOpacity<OptionProps>`
  padding-bottom: 14px;

  ${({ active }) => active && css`
    border-bottom-width: 2px;
    border-bottom-color: ${({ theme }) => theme.colors.main};
  `}
`;

export const OptionTitle = styled.Text<OptionProps>`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme, active }) => active ? theme.fonts.secondary_600 : theme.fonts.secondary_400 };
  color: ${({ theme, active }) => active ? theme.colors.title : theme.colors.text_detail };
`;
