/* this is an "abstract" parent class that contains basic resources all schedules share */
class AbstractSchedule {

    static restructure(jsonObject) {
        Object.setPrototypeOf(jsonObject, AbstractSchedule.prototype);
        for (let i = 0; i < jsonObject.days.length; i++) {
          for (let j = 0; j < jsonObject.days[i].length; j++) {
            jsonObject.days[i][j] = Object.setPrototypeOf(jsonObject.days[i][j], Game.prototype);
          }
        }
        return jsonObject;
      }

    constructor(teams) {
        this.hasStarted = false;
        this.done = false;
        this.teams = teams;
        this.standings = {};
        // this.days is a 2Darray. Each inner array represents a day. Each day contains 1 or more Games.
        this.days = [[]];
        this.day = 0;
    }    
    
    isTodayDone(){
        let gamesToday = this.days[this.day];
        for(let eachGame of gamesToday){
            if(eachGame.isGameOver() === false){
                return false;
            }
        }
        return true;
    }
}