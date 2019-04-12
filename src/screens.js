/* eslint-disable import/prefer-default-export */
import { Navigation } from 'react-native-navigation';

import Home from './containers/Home';
import Login from './containers/Login';
import Settings from './containers/Settings';
import Reports from './containers/Reports';

export function registerScreens() {
  Navigation.registerComponent('Home', () => Home);
  Navigation.registerComponent('Login', () => Login);
  Navigation.registerComponent('Settings', () => Settings);
  Navigation.registerComponent('Reports', () => Reports);
}