/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

import {firebase} from '@react-native-firebase/app';

// Ensure Firebase is initialized
if (!firebase.apps.length) {
  firebase.initializeApp();
}

AppRegistry.registerComponent(appName, () => App);
