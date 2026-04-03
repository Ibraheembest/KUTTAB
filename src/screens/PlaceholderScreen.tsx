import React from 'react';
import { View, Text } from 'react-native';
import { screenStyles } from '../theme/screenStyles';

interface Props {
  label: string;
}

export function PlaceholderScreen({ label }: Props) {
  return (
    <View style={screenStyles.placeholder}>
      <Text style={screenStyles.placeholderText}>{label}</Text>
    </View>
  );
}
