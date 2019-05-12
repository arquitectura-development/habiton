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

}

export default new ReportStore();