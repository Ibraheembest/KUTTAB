import React from 'react';
import { View, Text } from 'react-native';
import { screenStyles } from '../theme/screenStyles';

export function ProgressScreen() {
  return (
    <View style={screenStyles.placeholder}>
      <Text style={screenStyles.placeholderText}>متابعة الإنجاز</Text>
    </View>
  );
}
