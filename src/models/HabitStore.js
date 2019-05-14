import { observable, action } from "mobx";
import { api } from "../api";

class HabitStore {
    @observable
    habits = [];
      
    @action
    getHabits(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await api.get(
                `/users/habits?userId=${userId}`
                );
                console.log(data)
                this.habits = data;
                resolve(data);
            }
            catch(e) {
                console.log("ERROR GETTING HABITS")
                console.log(e)
                reject(e);
            }
        })
    }

    @action
    updateHabit(userId, habitId, habitData) {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await api.put(
                `/users/habits/${habitId}?userId=${userId}`, habitData
                );
                console.log(data)
                resolve(data);
                console.log(habitData)
                resolve();
            }
            catch(e) {
                console.log("ERROR UPDATING HABIT")
                console.log(e)
                reject(e);
            }
        })
    }

    @action
    updateScore(userId, habitId, habitData, isPositive) {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await api.put(
                `/users/habits/${habitId}?positive=${isPositive}&updateScore=true&userId=${userId}`, habitData);
                console.log(data)
                resolve(data);
                console.log(habitData)
            }
            catch(e) {
                console.log("ERROR UPDATING HABIT")
                console.log(e)
                reject(e);
            }
        })
    }

    @action
    createHabit(userId, habitData) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(habitData)
                const { data } = await api.post(
                `/users/habits?userId=${userId}`, habitData);
                console.log(data)
                resolve(data);
            }
            catch(e) {
                console.log("ERROR CREATING HABIT")
                console.log(e)
                reject(e);
            }
        })
    }

    @action
    deleteHabit(userId, habitId) {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await api.delete(
                `/users/habits/${habitId}?userId=${userId}`);
                console.log(data)
                resolve(data);
            }
            catch(e) {
                console.log("ERROR DELETING HABIT")
                console.log(e)
                reject(e);
            }
        })
    }

    @action
    clear() {
        this.habits = [];
    }

}

export default new HabitStore();