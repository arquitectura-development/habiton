import { observable, action } from "mobx";
import { api } from "../api";

class TaskStore {
    @observable
        tasks = [];
      
    @observable
        task = {};
      
    @action
    getTasks(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await api.get(
                `/users/tasks?userId=${userId}`
                );
                console.log(data)
                this.tasks = data;
                resolve(data);
            }
            catch(e) {
                console.log("ERROR GETTING TASKS")
                console.log(e)
                reject(e);
            }
        })
    }

}

export default new TaskStore();