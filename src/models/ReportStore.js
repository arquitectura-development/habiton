import { observable, action } from "mobx";
import { api } from "../api";

class ReportStore {
    @observable
        tasksReport = {};
      
    @observable
        habitsReport = {};
      
    @observable
        userReport = {
            badHabits: [],
            goodHabits: [],
            todayTasks: [],
            delayedTasks: []
        };

    @action
    getUserReport(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await api.get(
                `/users/reports?userId=${userId}`
                );
                console.log("USER REPORT DATA")
                console.log(data)
                this.userReport.badHabits = data.badHabits;
                this.userReport.goodHabits = data.goodHabits;
                this.userReport.todayTasks = data.todayTasks;
                this.userReport.delayedTasks = data.delayedTasks;
                resolve(data);
            }
            catch(e) {
                reject(e);
            }
        })
    }

    @action
    getTasksReport(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await api.get(
                `/admin/reports/tasks?userId=${userId}`
                );
                console.log("TASK REPORT DATA")
                console.log(data)
                this.tasksReport = data;
                resolve(data);
            }
            catch(e) {
                reject(e);
            }
        })
    }

    @action
    getHabitsReport(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await api.get(
                `/admin/reports/habits?userId=${userId}`
                );
                console.log("HABITS REPORT DATA")
                console.log(data)
                this.habitsReport = data;
                resolve(data);
            }
            catch(e) {
                reject(e);
            }
        })
    }

    @action
    clear() {
        this.tasksReport = {};
        this.habitsReport = {};
        this.userReport = {
            badHabits: [],
            goodHabits: [],
            todayTasks: [],
            delayedTasks: []
        };
    }


}

export default new ReportStore();