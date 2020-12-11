import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import MainScreenContainer from '../src/MainScreenContainer';
import SavedRestaurantContainer from '../src/SavedRestaurantContainer';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreenContainer">
        <Stack.Screen name="RestaurantList" component={MainScreenContainer} />
        <Stack.Screen
          name="SavedRestaurant"
          component={SavedRestaurantContainer}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;
