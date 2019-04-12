/* eslint-disable import/prefer-default-export */
import { Navigation } from 'react-native-navigation';

import Home from './containers/Home';
import Login from './containers/Login';

export function registerScreens() {
  Navigation.registerComponent('Home', () => Home);
  Navigation.registerComponent('Login', () => Login);
}