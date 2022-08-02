import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from './RootStack';

export const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};
