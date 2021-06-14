import React, {useEffect, useState} from 'react';
import {getVersion} from 'react-native-device-info';

import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {loadData} from '@services/storage';
import {downloadUpdate, installUpdate} from 'modules/Updater';

import {List, ListsProvider} from '@contexts/ListsContext';
import {ThemeProvider} from '@contexts/ThemeContext';
import CreateItem from '@pages/CreateItem';
import CreateList from '@pages/CreateList';
import EditList from '@pages/EditList';
import Home from '@pages/Home';
import GithubUpdater from '@utils/updater';

import Loading from './Loading';

const Stack = createStackNavigator();

const horizontalIOS = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
} as StackNavigationOptions;
const verticalIOS = {
  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
} as StackNavigationOptions;

const sleep = async (time: number) =>
  await new Promise(resolve => setTimeout(resolve, time));

export default () => {
  const [initialState, setInitialState] = useState<List[] | string | number>();

  useEffect(() => {
    const fetchData = async () => {
      const updater = new GithubUpdater(
        'slicecollections/venalista-app',
        getVersion(),
        'application/vnd.android.package-archive',
      );

      setInitialState('Procurando atualizações...');
      const response = await updater.response();
      if (response.update) {
        setInitialState(`Nova versão encontrada: ${response.update.name}`);
        await sleep(500);

        setInitialState('Iniciando download...');
        await sleep(500);

        try {
          await downloadUpdate(response.update.downloadUrl, progress =>
            setInitialState(progress),
          );
          await installUpdate();
        } catch {
          setInitialState(undefined);
        }
      } else {
        setInitialState(undefined);
      }

      const lists = await loadData();
      await sleep(500);
      setInitialState(lists);
    };
    fetchData();
  }, []);

  if (!Array.isArray(initialState)) {
    return (
      <ThemeProvider>
        <Loading message={initialState as string | ''} />
      </ThemeProvider>
    );
  }

  return (
    <NavigationContainer>
      <ThemeProvider>
        <ListsProvider initialState={initialState}>
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
