import React from 'react';
import { ActivityIndicator } from 'react-native';

import {
  Container,
  Title,
} from './styles';

interface Props {
  title: string;
  color?: string;
  onPress: () => void;
  enabled?: boolean;
  loading?: boolean;
  light?: boolean;
}

export function Button({ 
  title,
  color,
  enabled = true,
  loading = false,
  light = false,
  ...rest
}: Props) {
  return (
    <Container 
      {...rest} 
      color={color} 
      style={{ opacity: !enabled || loading ? 0.5 : 1 }}
      enabled={enabled}
    >
      { loading
        ? <ActivityIndicator />
        : <Title light={light}>{title}</Title>
      }
    </Container>
  );
}