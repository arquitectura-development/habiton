/* eslint-disable import/prefer-default-export */
import { Navigation } from 'react-native-navigation';

import Home from './containers/Home';
import Login from './containers/Login';
import Settings from './containers/Settings';
import Reports from './containers/Reports';
import Habits from './containers/Habits';
import HabitForm from './containers/HabitForm';
import Tasks from './containers/Tasks';
import TaskForm from './containers/TaskForm';

export function registerScreens() {
  Navigation.registerComponent('Home', () => Home);
  Navigation.registerComponent('Login', () => Login);
  Navigation.registerComponent('Settings', () => Settings);
  Navigation.registerComponent('Reports', () => Reports);
  Navigation.registerComponent('Habits', () => Habits);
  Navigation.registerComponent('Tasks', () => Tasks);
  Navigation.registerComponent('TaskForm', () => TaskForm);
  Navigation.registerComponent('HabitForm', () => HabitForm);
}