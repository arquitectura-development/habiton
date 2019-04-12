/* eslint-disable import/prefer-default-export */
import { Navigation } from 'react-native-navigation';

import Home from './containers/Home';

export function registerScreens() {
  Navigation.registerComponent('Home', () => Home);
}