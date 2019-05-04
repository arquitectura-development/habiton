import { Navigation } from 'react-native-navigation';
import { MAIN_THEME_COLOR, DEFAULT_GRAY } from './constants';

export const goHome = () => {
    Navigation.setRoot({
      root: {
        bottomTabs: {
          id: 'HomeBottomTabs',
          children: [
            {
              stack:{
                children:[
                  {
                    component: {
                      name: 'Habits',
                      options: {
                        bottomTab: {
                          fontSize: 11,
                          text: 'Habits',
                          icon: require("./assets/icons/habits.png"),
                          selectedIcon: require("./assets/icons/fill_habits.png"),
                          iconColor: DEFAULT_GRAY,
                          selectedIconColor: MAIN_THEME_COLOR,
                          textColor: DEFAULT_GRAY,
                          selectedTextColor: MAIN_THEME_COLOR
                        }
                      }
                    }
                  }
                ]
              }
            },
            {
              stack:{
                children:[
                  {
                    component: {
                      name: 'Tasks',
                      options: {
                        bottomTab: {
                          text: 'Tasks',
                          fontSize: 11,
                          icon: require("./assets/icons/tasks.png"),
                          selectedIcon: require("./assets/icons/fill_tasks.png"),
                          iconColor: DEFAULT_GRAY,
                          selectedIconColor: MAIN_THEME_COLOR,
                          textColor: DEFAULT_GRAY,
                          selectedTextColor: MAIN_THEME_COLOR
                        }
                      }
                    },
                  }
                ]
              }
            },
            {
              stack:{
                children:[
                  {
                    component: {
                      name: 'Reports',
                      options: {
                        bottomTab: {
                          text: 'Reports',
                          fontSize: 11,
                          icon: require("./assets/icons/chart.png"),
                          selectedIcon: require("./assets/icons/fill_chart.png"),
                          iconColor: DEFAULT_GRAY,
                          selectedIconColor: MAIN_THEME_COLOR,
                          textColor: DEFAULT_GRAY,
                          selectedTextColor: MAIN_THEME_COLOR
                        }
                      }
                    },
                  },
                ]
              }
            },
            {
              stack:{
                children:[
                  {
                    component: {
                      name: 'Settings',
                      options: {
                        bottomTab: {
                          text: 'Settings',
                          fontSize: 11,
                          icon: require("./assets/icons/settings.png"),
                          selectedIcon: require("./assets/icons/fill_settings.png"),
                          iconColor: DEFAULT_GRAY,
                          selectedIconColor: MAIN_THEME_COLOR,
                          textColor: DEFAULT_GRAY,
                          selectedTextColor: MAIN_THEME_COLOR
                        }
                      }
                    },
                  }
                ]
              }
            }
          ],
        }
      }
    });
}


export const goLogin = () => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'Login'
      }
    },
  });
}