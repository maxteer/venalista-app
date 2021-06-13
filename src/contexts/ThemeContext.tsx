import React, {useState} from 'react';
import {useEffect} from 'react';
import {Appearance} from 'react-native';

import {DefaultTheme} from 'styled-components';

export const ThemeContext = React.createContext<DefaultTheme>(
  {} as DefaultTheme,
);

export const ThemeProvider: React.FC = ({children}) => {
  const [colorScheme, setState] = useState(Appearance.getColorScheme());

  useEffect(() => {
    Appearance.addChangeListener(() => {
      setState(Appearance.getColorScheme());
    });
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        primary: colorScheme === 'dark' ? '#000814' : '#fffdf7',
        secondary: colorScheme === 'dark' ? '#fffdf7' : '#000814',
        green: '#04e762',
        red: '#ea4335',
        checked: '#0ee7e7',
        barStyle: colorScheme === 'dark' ? 'light-content' : 'dark-content',
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
