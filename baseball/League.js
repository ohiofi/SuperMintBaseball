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
    for (let i = 0; i < jsonObject.seasons.length; i++) {
      jsonObject.seasons[i] = Object.setPrototypeOf(jsonObject.seasons[i], Season.prototype);
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
      for (let j = 0; j < this.teams[i].players.length; j++) {
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

  getGameDetails() {
    return this.seasons[this.currentSeason].getGameDetails();
  }

  getTeam(someObject) {
    for (let i = 0; i < this.teams.length; i++) {
      if (this.teams[i].equals(someObject)) {
        return this.teams[i];
      }
    }
    return null;
  }

  getStandingsTableBatters(topN) {
    const dataCopy = [];
    for (let i = 0; i < this.teams.length; i++) {
      for (let j = 0; j < this.teams[i].players.length; j++) {
        dataCopy.push(this.teams[i].players[j])
      }
    }
    dataCopy.sort((a, b) => b.stats.getOnBasePlusSlugging() - a.stats.getOnBasePlusSlugging());
    // Handle ties
    let rank = 1;
    let previousOPS = null;
    let tieRank = 1;
    //let table = '<table class="table table-striped table-dark"><thead><tr><th>#</th><th>Batter Name</th><th>OPS</th></tr></thead><tbody>';
    let table = `
    <table class="table table-striped table-dark shadow rounded-2 overflow-hidden  table-borderless">
        <thead>
            <tr>
                <th class="text-secondary">#</th>
                <th class="text-secondary">Batter Name</th>
                <th class="text-secondary">OPS</th>
            </tr>
        </thead>
        <tbody>
  `;
    let count = 0;
    for (let i = 0; i < dataCopy.length; i++) {
      const player = dataCopy[i];
      // If the player wins are the same as the previous one, they share the rank
      if (player.stats.getOnBasePlusSlugging() !== previousOPS) {
        rank = tieRank;  // New rank for the current player
        previousOPS = player.stats.getOnBasePlusSlugging();  // Update previous wins
      } 
      tieRank++;
      table += `
        <tr class="overflow-hidden">
          <td>${rank}</td>
          <td>${player.getNameWithLink()}</td>
          <td>${player.stats.getOnBasePlusSlugging()}</td>
        </tr>
      `;
      count++;
      if (count >= topN) {
        break;
      }
    }
    // Close the table tags
    table += '</tbody></table>';
    // Return the generated HTML table
    return table;
  }

  getStandingsTablePitchers(topN) {
    const dataCopy = [];
    for(let each of this.teams){
      dataCopy.push(each.pitcher)
    }
    dataCopy.sort((a, b) => a.stats.getEarnedRunAverage() - b.stats.getEarnedRunAverage());
    // Handle ties
    let rank = 1;
    let previousERA = null;
    let tieRank = 1;
    let table = `
    <table class="table table-striped table-dark shadow rounded-2 overflow-hidden  table-borderless">
        <thead>
            <tr>
                <th class="text-secondary">#</th>
                <th class="text-secondary">Pitcher Name</th>
                <th class="text-secondary">ERA</th>
            </tr>
        </thead>
        <tbody>
  `;
    let count = 0;
    for (let i = 0; i < dataCopy.length; i++) {
      const player = dataCopy[i];
      // If the player wins are the same as the previous one, they share the rank
      if (player.stats.getEarnedRunAverage() !== previousERA) {
        rank = tieRank;  // New rank for the current player
        previousERA = player.stats.getEarnedRunAverage();  // Update previous wins
      } 
      tieRank++;
      table += `
        <tr>
          <td>${rank}</td>
          <td>${player.getNameWithLink()}</td>
          <td>${player.stats.getEarnedRunAverage()}</td>
        </tr>
      `;
      count++;
      if (count >= topN) {
        break;
      }
    }
    // Close the table tags
    //table += '</tbody></table>';
    // Return the generated HTML table
    return table;
  }

  getStandingsTableTeams() {
    // Copy the original array to avoid modifying the original 
    const dataCopy = [...this.teams];
    dataCopy.sort((a, b) => b.stats.wins - a.stats.wins);
    // Handle ties
    let rank = 1;
    let previousWins = null;
    let tieRank = 1;
    // Create the table element
    let table = `
        <table class="table table-striped table-dark shadow rounded-2 overflow-hidden  table-borderless">
            <thead>
                <tr>
                    <th class="text-secondary">#</th>
                    <th class="text-secondary">Team Name</th>
                    <th class="text-secondary">Wins</th>
                </tr>
            </thead>
            <tbody>
      `;
    // Iterate over the sorted data and generate rows
    for (let i = 0; i < dataCopy.length; i++) {
      const team = dataCopy[i];
      // If the team wins are the same as the previous one, they share the rank
      if (team.stats.wins !== previousWins) {
        rank = tieRank;  // New rank for the current team
        previousWins = team.stats.wins;  // Update previous wins
      }
      tieRank++;  // Update the tie rank if wins are the same
      // Add a table row for the team with their rank
      table += `
        <tr>
          <td>${rank}</td>
          <td>${team.getNameWithLink()}</td>
          <td>${team.stats.wins}</td>
        </tr>
      `;
    }
    // Close the table tags
    table += '</tbody></table>';
    // Return the generated HTML table
    return table;
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
        const winningTeam = app.model.world.league.lookup(data.teamId)
        winningTeam.addWin()
        app.model.world.newsTicker.setBreakingNews(winningTeam.getName() + " win! ");
        break
      case StatsEventType.GAME_LOSER:
        app.model.world.league.lookup(data.teamId).addLoss()
        break
      case StatsEventType.AT_BATS:
        app.model.world.league.lookup(data.teamId).addAtBats()
        app.model.world.league.lookup(data.playerId).addAtBats()
        break
      case StatsEventType.SINGLES:
        app.model.world.league.lookup(data.teamId).addSingles()
        app.model.world.league.lookup(data.playerId).addSingles()
        break
      case StatsEventType.DOUBLES:
        app.model.world.league.lookup(data.teamId).addDoubles()
        app.model.world.league.lookup(data.playerId).addDoubles()
        break
      case StatsEventType.TRIPLES:
        app.model.world.league.lookup(data.teamId).addTriples()
        app.model.world.league.lookup(data.playerId).addTriples()
        break
      case StatsEventType.HOME_RUNS:
          app.model.world.league.lookup(data.teamId).addHomeRuns()
          app.model.world.league.lookup(data.playerId).addHomeRuns()
          break
      case StatsEventType.BASES_ON_BALLS:
            app.model.world.league.lookup(data.teamId).addBasesOnBalls()
            app.model.world.league.lookup(data.playerId).addBasesOnBalls()
            break
      case StatsEventType.SACRIFICE_FLIES:
              app.model.world.league.lookup(data.teamId).addSacrificeFlies()
              app.model.world.league.lookup(data.playerId).addSacrificeFlies()
              break
      case StatsEventType.STRIKEOUTS_AT_BAT:
              app.model.world.league.lookup(data.teamId).addStrikeoutsAtBat() 
              app.model.world.league.lookup(data.playerId).addStrikeoutsAtBat()
              break
      case StatsEventType.INNINGS_PITCHED:
                app.model.world.league.lookup(data.teamId).addInningsPitched()
                app.model.world.league.lookup(data.playerId).addInningsPitched()
                break
      case StatsEventType.STRIKEOUTS_THROWN:
            app.model.world.league.lookup(data.teamId).addStrikeoutsThrown() 
            app.model.world.league.lookup(data.playerId).addStrikeoutsThrown()
            break
      case StatsEventType.RUNS_ALLOWED:
              app.model.world.league.lookup(data.teamId).addRunsAllowed() //
              app.model.world.league.lookup(data.playerId).addRunsAllowed()
              break
      case StatsEventType.HOME_RUNS_ALLOWED:
              app.model.world.league.lookup(data.teamId).addHomeRunsAllowed()
              app.model.world.league.lookup(data.playerId).addHomeRunsAllowed()
              break
      case StatsEventType.WALKS_ALLOWED:
                app.model.world.league.lookup(data.teamId).addWalksAllowed()
                app.model.world.league.lookup(data.playerId).addWalksAllowed()
                break
      case StatsEventType.RUNS_SCORED:
                  app.model.world.league.lookup(data.teamId).addRunsScored()
                  app.model.world.league.lookup(data.playerId).addRunsScored()
                  break
    }


  }

  isTodayDone(){
      return this.seasons[this.currentSeason].isTodayDone();
  }

  lookup(idNum) {
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
    // check free agent list
    for (let i = 0; i < this.freeAgentList.length; i++) {
      if (this.freeAgentList[i].leagueIdNumber === idNum) {
        return this.freeAgentList[i];
      }
    }
    return null;
  }




  doSeason() {
    let weeksInSchedule = this.seasons[this.currentSeason].days.length
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