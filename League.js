//import random
//from Team import Team
//from Season import Season
//from Player import Player

class League {
    constructor(numberOfTeams) {
      this.numberOfTeams = numberOfTeams
      this.teams = []
      this.freeAgentList = []
      //for i in range(this.numberOfTeams){
      for (let i = 0; i < this.numberOfTeams; i++) {
        let temp = new BaseballTeam();
        this.teams.push(temp)
      }
      this.currentSeason = 0
      this.seasons = [new Season(this.teams)]
    }
  
    doSeason() {
      let weeksInSchedule = this.seasons[this.currentSeason].schedule.length
      let playEveryTeamXTimes = 1
      //for i in range(weeksInSchedule * playEveryTeamXTimes){
      for (let i = 0; i < weeksInSchedule * playEveryTeamXTimes; i++) {
        this.seasons[this.currentSeason].doWeek()
      }
      console.log("\nWeek " + ("" + this.seasons[this.currentSeason].currentWeek) + " Standings")
      //# get overall standings
      this.seasons[this.currentSeason].getStandings()
      //# get stats
      console.log(this.seasons[this.currentSeason].getFBRanking(3))
      console.log(this.seasons[this.currentSeason].getQBRanking(3))
      console.log(this.seasons[this.currentSeason].getWRRanking(3))
      console.log(this.seasons[this.currentSeason].getMVPRanking(3))
      //#input()
      //# start playoffs
      //# this.seasons[0].schedulePlayoffWeekOne()
      //# console.log(this.seasons[0].getPlayoffBracket())
    }
  
    addNewSeason() {
      //for eachTeam in this.teams:
      for (let eachTeam of this.teams) {
        eachTeam.resetSeasonStats()
        //for eachPlayer in eachTeam.players:
        for (let eachPlayer of eachTeam.players) {
          eachPlayer.updateCareerStats()
          eachPlayer.resetSeasonStats()
        }
      }
      this.currentSeason += 1
      this.seasons.push(new Season(this.teams))
    }
  
    doPlayoffs(messageLevel = 0) {
      this.seasons[this.currentSeason].doPlayoffs(messageLevel)
    }
  
    isSeasonOver() {
      if (this.seasons[this.currentSeason].arePlayoffsOver()) {
        return True
      }
      return False
    }
  }