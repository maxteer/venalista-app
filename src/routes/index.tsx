import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {ListsProvider} from '@contexts/ListsContext';
import {ThemeProvider} from '@contexts/ThemeContext';
import CreateItem from '@pages/CreateItem';
import CreateList from '@pages/CreateList';
import EditList from '@pages/EditList';
import Home from '@pages/Home';

const Stack = createStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <ListsProvider>
          <Stack.Navigator headerMode="none" initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="CreateList" component={CreateList} />
            <Stack.Screen name="EditList" component={EditList} />
            <Stack.Screen name="CreateItem" component={CreateItem} />
          </Stack.Navigator>
        </ListsProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
};
