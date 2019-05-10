import { observable, action } from "mobx";
import { API_URL } from './../constants';

class AppUser {
  @observable
		name = "";
	
	@observable
		email = "";
	
	@observable
		userId = "";

  @action
	logon(email) {
		return new Promise((resolve, reject) => {
			this.name = (email == "admin@admin.com") ? 'Admin' : 'Meeper';
			this.email = email;
			this.userId = 1;
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
			this.userId = '';
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
}

export default new AppUser();
