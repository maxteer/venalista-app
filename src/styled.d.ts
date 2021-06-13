import {StatusBarStyle} from 'react-native';
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    primary: string;
    secondary: string;
    green: string;
    red: string;
    checked: string;
    barStyle: StatusBarStyle;
  }
}
