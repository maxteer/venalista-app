import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import {ListsProvider} from '@contexts/ListsContext';
import {ThemeProvider} from '@contexts/ThemeContext';
import CreateItem from '@pages/CreateItem';
import CreateList from '@pages/CreateList';
import EditList from '@pages/EditList';
import Home from '@pages/Home';

const Stack = createStackNavigator();

const horizontalIOS = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
} as StackNavigationOptions;
const verticalIOS = {
  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
} as StackNavigationOptions;

export default () => {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <ListsProvider>
          <Stack.Navigator headerMode="none" initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Home}
              options={horizontalIOS}
            />
            <Stack.Screen
              name="CreateList"
              component={CreateList}
              options={verticalIOS}
            />
            <Stack.Screen
              name="EditList"
              component={EditList}
              options={horizontalIOS}
            />
            <Stack.Screen
              name="CreateItem"
              component={CreateItem}
              options={verticalIOS}
            />
          </Stack.Navigator>
        </ListsProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
};
