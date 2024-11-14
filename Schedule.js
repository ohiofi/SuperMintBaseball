/* this is an "abstract" class that lists the basic methods that all schedules must have */
class Schedule {
    constructor(teams) {
        this.hasStarted = false;
        this.done = false;
        this.teams = teams;
        this.standings = {};
        //# playoffSchedule is a 3Darray of Teams. Day Array > Game Array > Teams
        this.playoffSchedule = [[]];
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