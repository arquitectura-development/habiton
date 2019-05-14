import { observable, action } from "mobx";
import { api } from "../api";

class TaskStore {
    @observable
    tasks = [];
      
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

    @action
    updateTask(userId, taskId, taskData) {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await api.put(
                `/users/tasks/${taskId}?userId=${userId}`, taskData
                );
                console.log(data)
                resolve(data);
                console.log(taskData)
                resolve();
            }
            catch(e) {
                console.log("ERROR UPDATING TASK")
                console.log(e)
                reject(e);
            }
        })
    }

    @action
    createTask(userId, taskData) {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await api.post(
                `/users/tasks?userId=${userId}`, taskData
                );
                console.log(data)
                resolve(data);
            }
            catch(e) {
                console.log("ERROR CREATING TASK")
                console.log(e)
                reject(e);
            }
        })
    }

    @action
    deleteTask(userId, taskId) {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await api.delete(
                `/users/tasks/${taskId}?userId=${userId}`);
                console.log(data)
                resolve(data);
            }
            catch(e) {
                console.log("ERROR DELETING TASK")
                console.log(e)
                reject(e);
            }
        })
    }

    @action
    clear() {
        this.tasks = [];
    }

}

export default new TaskStore();