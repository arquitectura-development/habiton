import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';
import { goLogin, goHome, goHomeAdmin } from './navigation';
import AppUser from "./models/AppUser";

registerScreens();

class App extends Component {
	constructor(props) {
		super(props)
		this.startApp();	
	}
	
	startApp() {
		Navigation.events().registerAppLaunchedListener( async () => {
			let user = await AppUser.getUser();
			if(user == null){
				goLogin();
			}
			else if (user.isAdmin){
				goHomeAdmin();
			}else{
				goHome();
			}
		});
	}

}

export default App;