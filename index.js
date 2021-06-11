import {AppRegistry} from 'react-native';

import {name as appName} from './app.json';
import App from './src';

console.reportErrorsAsExceptions = false;
AppRegistry.registerComponent(appName, () => App);
