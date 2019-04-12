import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';
import { goLogin, goHome } from './navigation';

registerScreens();

class App extends Component {
	constructor(props) {
		super(props)
		this.startApp();	
	}
	
	startApp() {
		Navigation.events().registerAppLaunchedListener(() => {
			//goLogin();
			goHome();
		});
	}

}

export default App;