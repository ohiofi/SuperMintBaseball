//
// A RegularSeason has standings for the teams https://en.wikipedia.org/wiki/Standings_(sports)
// A RegularSeason has a schedule


class RegularSeason{

    constructor(teamsArray){
        this.hasStarted = false;
        this.done = false;
        this.currentDay = 0;
        this.teams = teamsArray;
        this.standings = {}
        // schedule is a 3Darray of Teams. Day Array > Game Array > Team Objects
        this.schedule = [[]]; 
        this.setSchedule()
    }

    didTheseTeamsAlreadyPlay(team1, team2) {
        let timesPlayed = 0
        //# check each week
        for (let week of this.schedule) {
          //# check each day
          for (let day of week) {
            if (team1 in day && team2 in day) {
              //#console.log(team1.getName()+" already played "+team2.getName())
              timesPlayed += 1
            }
            if (timesPlayed >= 2) {
              return true
            }
          }
        }
        return false
      }

      getSeasonSchedule() {
        let weeksInSchedule = this.schedule.length
        for (let weekCounter of range(weeksInSchedule)) {
          this.getWeekSchedule(weekCounter)
        }
      }

      getWeekSchedule(weekNum = null) {
        if (weekNum == null) {
          weekNum = this.currentWeek
        }
        console.log("Week " + (weekNum))
        for (let eachDay of this.schedule[weekNum]) {
          if (weekNum % 2 == 0) {
            console.log(eachDay[0].getName() + " at " + eachDay[1].getName())
          } else {
            console.log(eachDay[1].getName() + " at " + eachDay[0].getName())
          }
        }
      }
    
    
    
      

    isTeamScheduledThisWeek(someTeam, weekNum) {
        //# check each game in current week
        for (let eachGame of this.schedule[weekNum]) {
          if (someTeam in eachGame) {
            return true
          }
        }
        return false
      }

      setSchedule() {
        this.schedule = [
          []
        ];
        //# possibleGames = array of all unique permutations
        let possibleGames = []
        //for i in range(this.teams.length){
        for (let i = 0; i < this.teams.length; i++) {
          //for j in range(i+1,this.teams.length){
          for (let j = i + 1; j < this.teams.length; j++) {
            //# if Math.random() < 0.5:
            //#   possibleGames.push([this.teams[i],this.teams[j]])
            //# }else{
            possibleGames.splice(Math.floor(Math.random() * possibleGames.length), 0, [this.teams[i], this.teams[j]])
          }
        }
        //# for eachGame in possibleGames:
        for (let eachGame of possibleGames) {
          let weekCounter = 0
          while (true) {
            //# if both teams not scheduled this week
            if (!this.isTeamScheduledThisWeek(eachGame[0], weekCounter) && !this.isTeamScheduledThisWeek(eachGame[1], weekCounter)) {
              //# add to the schedule
              this.schedule[weekCounter].push(eachGame)
              //# break while true
              break
              //# else
            } else {
              //# try next week
              weekCounter += 1
              if (weekCounter >= this.schedule.length) {
                //# add a new week
                this.schedule.push([])
              }
            }
          }
        }
      }

}