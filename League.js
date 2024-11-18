//import random
//from Team import Team
//from Season import Season
//from Player import Player

class League {

  static leagueIdNumberCount = 0;

  static restructure(jsonObject) {
    Object.setPrototypeOf(jsonObject, League.prototype);
    for (let i = 0; i < jsonObject.teams.length; i++) {
      jsonObject.teams[i] = Object.setPrototypeOf(jsonObject.teams[i], BaseballTeam.prototype);
    }
    for (let i = 0; i < jsonObject.freeAgentList.length; i++) {
      jsonObject.freeAgentList[i] = Object.setPrototypeOf(jsonObject.freeAgentList[i], BaseballPlayer.prototype);
    }
    return jsonObject;
  }

  constructor(numberOfTeams) {
    this.numberOfTeams = numberOfTeams
    this.teams = []
    this.freeAgentList = []
    // make teams
    for (let i = 0; i < this.numberOfTeams; i++) {
      let tempTeam = new BaseballTeam();
      tempTeam.manager.subscribe(this.handleEvent);
      tempTeam.leagueIdNumber = League.leagueIdNumberCount++;
      this.teams.push(tempTeam);
      // fill teams with players
      for (let i = 0; i < BaseballTeam.playersPerTeam; i++) {
        let tempPlayer = new BaseballPlayer();
        let potentialPlayer2 = new BaseballPlayer();
        if (tempPlayer.getOverallAptitude() < potentialPlayer2.getOverallAptitude()) {
          tempPlayer = potentialPlayer2;
        }
        tempPlayer.teamName = tempTeam.colorScheme + tempTeam.place
        tempPlayer.jerseyNumber = tempTeam.getJerseyNumber()
        tempPlayer.leagueIdNumber = League.leagueIdNumberCount++;
        tempPlayer.teamLeagueIdNumber = tempTeam.leagueIdNumber;
        tempTeam.players.push(tempPlayer)
        tempPlayer.manager.subscribe(this.handleEvent);
      }
      tempTeam.setup();
    }

    this.currentSeason = 0
    this.seasons = [new Season(this.teams)]
  }

  getPlayer(someObject) {
    for (let i = 0; i < this.teams.length; i++) {
      for (let j = 0; j < this.teams.players.length; j++) {
        if (this.teams[i].players[j].equals(someObject)) {
          return this.teams[i].players[j];
        }
      }
    }
    // check the free agents
    for (let i = 0; i < this.freeAgentList.length; i++) {
      if (this.freeAgentList[i].equals(someObject)) {
        return this.freeAgentList[i];
      }
    }
    return null;
  }

  getScores() {
    return this.seasons[this.currentSeason].getScores();
  }

  getTeam(someObject) {
    for (let i = 0; i < this.teams.length; i++) {
      if (this.teams[i].equals(someObject)) {
        return this.teams[i];
      }
    }
    return null;
  }

  getNameableByFullName(someName) {
    // loop thru teams
    for (let i = 0; i < this.teams.length; i++) {
      if (this.teams[i].getFullName() === someName) {
        return this.teams[i];
      }
      // loop thru players
      for (let j = 0; j < this.teams[i].players.length; j++) {
        if (this.teams[i].players[j].getFullName() === someName) {
          return this.teams[i].players[j];
        }
      }
    }
    return null;
  }

  handleEvent(data) {
    switch (data.eventType) {
      case StatsEventType.GAME_WINNER:
        app.model.game.league.lookupLeagueId(data.team.leagueIdNumber).addWin()
        app.model.game.newsTicker.setBreakingNews(data.team.getName() + " win! ");
        break
      case StatsEventType.GAME_LOSER:
        app.model.game.league.lookupLeagueId(data.team.leagueIdNumber).addLoss()
        break
      case StatsEventType.AT_BATS:
        app.model.game.league.lookupLeagueId(data.team.leagueIdNumber).addAtBats()
        app.model.game.league.lookupLeagueId(data.player.leagueIdNumber).addAtBats()
        break
      case StatsEventType.SINGLES:
        app.model.game.league.lookupLeagueId(data.team.leagueIdNumber).addSingles()
        app.model.game.league.lookupLeagueId(data.player.leagueIdNumber).addSingles()
        break
      case StatsEventType.DOUBLES:
        app.model.game.league.lookupLeagueId(data.team.leagueIdNumber).addDoubles()
        app.model.game.league.lookupLeagueId(data.player.leagueIdNumber).addDoubles()
        break
      case StatsEventType.TRIPLES:
        app.model.game.league.lookupLeagueId(data.team.leagueIdNumber).addTriples()
        app.model.game.league.lookupLeagueId(data.player.leagueIdNumber).addTriples()
        break
      case StatsEventType.HOME_RUNS:
          app.model.game.league.lookupLeagueId(data.team.leagueIdNumber).addHomeRuns()
          app.model.game.league.lookupLeagueId(data.player.leagueIdNumber).addHomeRuns()
          break
      case StatsEventType.BASES_ON_BALLS:
            app.model.game.league.lookupLeagueId(data.team.leagueIdNumber).addBasesOnBalls()
            app.model.game.league.lookupLeagueId(data.player.leagueIdNumber).addBasesOnBalls()
            break
      case StatsEventType.SACRIFICE_FLIES:
              app.model.game.league.lookupLeagueId(data.team.leagueIdNumber).addSacrificeFlies()
              app.model.game.league.lookupLeagueId(data.player.leagueIdNumber).addSacrificeFlies()
              break
      case StatsEventType.STRIKEOUTS_AT_BAT:
              app.model.game.league.lookupLeagueId(data.team.leagueIdNumber).addStrikeoutsAtBat()
              app.model.game.league.lookupLeagueId(data.player.leagueIdNumber).addStrikeoutsAtBat()
              break
      case StatsEventType.INNINGS_PITCHED:
                app.model.game.league.lookupLeagueId(data.team.leagueIdNumber).addInningsPitched()
                app.model.game.league.lookupLeagueId(data.player.leagueIdNumber).addInningsPitched()
                break
      case StatsEventType.STRIKEOUTS_THROWN:
            app.model.game.league.lookupLeagueId(data.team.leagueIdNumber).addStrikeOutsThrown()
            app.model.game.league.lookupLeagueId(data.player.leagueIdNumber).addStrikeOutsThrown()
            break
      case StatsEventType.RUNS_ALLOWED:
              app.model.game.league.lookupLeagueId(data.team.leagueIdNumber).addRunsAllowed()
              app.model.game.league.lookupLeagueId(data.player.leagueIdNumber).addRunsAllowed()
              break
      case StatsEventType.HOME_RUNS_ALLOWED:
              app.model.game.league.lookupLeagueId(data.team.leagueIdNumber).addHomeRunsAllowed()
              app.model.game.league.lookupLeagueId(data.player.leagueIdNumber).addHomeRunsAllowed()
              break
      case StatsEventType.WALKS_ALLOWED:
                app.model.game.league.lookupLeagueId(data.team.leagueIdNumber).addWalksAllowed()
                app.model.game.league.lookupLeagueId(data.player.leagueIdNumber).addWalksAllowed()
                break
    }


  }

  lookupLeagueId(idNum) {
    // loop thru teams
    for (let i = 0; i < this.teams.length; i++) {
      if (this.teams[i].leagueIdNumber === idNum) {
        return this.teams[i];
      }
      // loop thru players
      for (let j = 0; j < this.teams[i].players.length; j++) {
        if (this.teams[i].players[j].leagueIdNumber === idNum) {
          return this.teams[i].players[j];
        }
      }
    }
    return null;
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

  nextGameMessages() {
    return this.seasons[this.currentSeason].nextGameMessages();
  }
}