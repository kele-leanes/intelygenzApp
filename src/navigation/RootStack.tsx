import React from 'react';

import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { DetailsScreen, HomeScreen } from 'src/views';

export type RootStackParamList = {
  HomeScreen: undefined;
  Details: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const screenOptions: NativeStackNavigationOptions = {
  headerBackTitleVisible: false,
  headerTitleAlign: 'center',
};

export const RootStack: React.FC = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
};
