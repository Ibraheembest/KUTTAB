import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StudentsScreen } from '../screens/StudentsScreen';
import { HalaqatScreen } from '../screens/HalaqatScreen';
import { AttendanceScreen } from '../screens/AttendanceScreen';
import { ProgressScreen } from '../screens/ProgressScreen';
import { LeaderboardScreen } from '../screens/LeaderboardScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOptions = {
  headerStyle: { backgroundColor: '#1A5F7A' },
  headerTintColor: '#FFFFFF',
  headerTitleStyle: { fontFamily: 'Cairo-Bold', fontSize: 20 },
  headerBackTitleVisible: false,
  animation: 'none' as const,
};

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Students" screenOptions={screenOptions}>
        <Stack.Screen name="Students" component={StudentsScreen} options={{ title: 'الطلاب' }} />
        <Stack.Screen name="Halaqat" component={HalaqatScreen} options={{ title: 'الحلقات' }} />
        <Stack.Screen name="Attendance" component={AttendanceScreen} options={{ title: 'سجل الحضور' }} />
        <Stack.Screen name="Progress" component={ProgressScreen} options={{ title: 'متابعة الإنجاز' }} />
        <Stack.Screen name="Leaderboard" component={LeaderboardScreen} options={{ title: 'لوحة الشرف' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
