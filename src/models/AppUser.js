import { observable, action } from "mobx";
import { AsyncStorage } from 'react-native';
import { api } from "../api";

class AppUser {
  @observable
		name = "";
	
	@observable
		email = "";
	
	@observable
        id = "";
        
    @action
    signup(email, name) {
        return new Promise(async (resolve, reject) => {
            try {
                let { data } = await api.post(`/users/signup`, {
                    email: email,
                    name: name
                });
                this.name = data.name;
                this.email = data.email;
                this.id = data.id;
                this.isAdmin = false;
                await this._persistUser();
                resolve(this);
            }
            catch(e) {
               
                reject(e);
            }
        })
    }

    @action
    logon(email) {
        return new Promise(async (resolve, reject) => {
            try {
                let { data } = await api.post(`/users/login`, {
                    email: email
                });
                this.name = data.name;
                this.email = data.email;
                this.id = data.id;
                this.isAdmin = (data.id == 0);
                await this._persistUser();
                resolve(this);
            }
            catch(e) {
                console.log("ERROR LOGIN")
                console.log(e)
                reject(e);
            }
        })
    }

	@action
	logout() {
		return new Promise((resolve, reject) => {
            this.name = '';
			this.email = '';
            this.id = '';
            this._clearUser();
		})
    }

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
                if (user !== null) {
                    user = JSON.parse(user);
                    this.name = user.name;
                    this.email = user.email;
                    this.id = user.id;
                    this.isAdmin = (user.email == "admin@admin.com");
                    return this;
                }
                else return user;
            }
        } catch (error) {
          console.log("ERROR GETTING USER")
        }
    };

    @action
    deleteAccount = async () => {
        try {
            this.name = '';
			this.email = '';
            this.id = '';
            this._clearUser();
        } catch (error) {
          console.log("ERROR DELETING USER")
        }
    };
    

}

export default new AppUser();
