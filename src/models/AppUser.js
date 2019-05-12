import { observable, action } from "mobx";
import { AsyncStorage } from 'react-native';
import { API_URL } from './../constants';

class AppUser {
  @observable
		name = "";
	
	@observable
		email = "";
	
	@observable
		id = "";

  @action
	logon(email) {
		return new Promise(async (resolve, reject) => {
			this.name = (email == "admin@admin.com") ? 'Admin' : 'Meeper';
			this.email = email;
            this.id = 1;
            this.isAdmin = (email == "admin@admin.com");
            this._persistUser();
            //sAsyncStorage.setItem('USER', JSON.stringify(this));
			// AppUsers.generic(
			// 	{
			// 		method: 'POST',
			// 		endPoint: 'appAuthentication'
			// 	},
			// 	{
			// 		email: email,
			// 		password: password
			// 	}
			// ).then(data => {
			// 		console.log(data)
			// 		this.name = data.name;
			// 		this.email = data.email;
			// 		this.userId = data.userId;
			// 		this.addikaAccount = data.addikaAccount;
			// 		this.token = data.id;
			// 		AppUsers.setToken(this.token);
			// 		resolve(data);
			// 	})
			// 	.catch(e => {
			// 		reject(e);
			// 	})
		})
	}

	@action
	logout() {
		return new Promise((resolve, reject) => {
            this.name = '';
			this.email = '';
            this.id = '';
            this._clearUser();
			// AppUsers.logout().then(data => {
			// 		console.log(data)
			// 		this.name = '';
			// 		this.email = '';
			// 		this.userId = '';
			// 		this.addikaAccount = null;
			// 		this.token = '';
			// 		AppUsers.setToken('');
			// 		resolve(data);
			// 	})
			// 	.catch(e => {
			// 		reject(e);
			// 	})
		})
    }

    _persistUser = async () => {
        try {
          await AsyncStorage.setItem('USER', JSON.stringify(this));
        } catch (error) {
          console.log("ERROR SAVING USER")
        }
    };

    _persistUser = async () => {
        try {
          await AsyncStorage.setItem('USER', JSON.stringify(this));
        } catch (error) {
          console.log("ERROR SAVING USER")
        }
    };

    _clearUser = async () => {
        try {
          await AsyncStorage.removeItem('USER');
        } catch (error) {
          console.log("ERROR CLEARING USER")
        }
    };

    @action
    getUser = async () => {
        try {
            if(this.name != ''){
                return this;
            }
            else{
                let user = await AsyncStorage.getItem('USER');
                user = JSON.parse(user);
                this.name = (user.email == "admin@admin.com") ? 'Admin' : 'Meeper';
			    this.email = user.email;
                this.id = user.id;
                this.isAdmin = (user.email == "admin@admin.com");
                return this;
            }
        } catch (error) {
          console.log("ERROR GETTING USER")
        }
    };
    

}

export default new AppUser();
