/* this is an "abstract" class that lists the basic methods that all schedules must have */
class Schedule {
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
        let gamesToday = this.playoffSchedule[this.day];
        for(let eachGame of gamesToday){
            if(eachGame.isGameOver() === false){
                return false;
            }
        }
        return true;
    }
}