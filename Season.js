//from OffensivePlay import OffensivePlay
//from Player import Player
//from Team import Team
//from Game import Game
//import random


class Season {

    ////# static methods
    //@staticmethod
    static recursive2DArrayPlayoffSort(myArray) {
      let result = []
      if (myArray.length == 1) {
        //# split into pairs
        //for i in range(myArray[0].length){
        for (let i = 0; i < myArray[0].length; i++) {
          if (i % 2 == 0) {
            result.push([])
          }
          result[Math.floor(i / 2)].push(myArray[0][i])
        }
        return result
      } else {
        //for i in range(Math.floor(myArray.length/2)){
        for (let i = 0; i < Math.floor(myArray.length / 2); i++) {
          result.push([])
          //for each in myArray[i]:
          for (let each of myArray[i]) {
            result[i].push(each)
          }
          //for each2 in myArray[-1-i]:
          for (let each2 of myArray[myArray.length - 1 - i]) {
            result[i].push(each2)
          }
        }
        return Season.recursive2DArrayPlayoffSort(result)
      }
    }
  
    constructor(teamArray) {
      this.numberOfTeams = teamArray.length
      this.standings = {}
      //# history is a 2Darray of Game objects. Weeks > Games
      //# this.history = [[]]
      //# schedule is a 3Darray of Teams. Weeks > Days > Teams
      this.schedule = []
      //# playoffSchedule is a 3Darray of Teams. Weeks > Days > Teams
      this.playoffSchedule = null
      this.teams = teamArray
      //for each in this.teams:
      for (let each of this.teams) {
        this.standings[each.getName()] = {
          "wins": 0,
          "losses": 0
        }
      }
      this.currentWeek = 0
      this.currentDay = 0
      this.currentPlayoffWeek = 0
      this.currentPlayoffDay = 0
      this.playoffsComplete = false
      this.setSchedule()
    }
  
  
    arePlayoffsOver() {
      return this.playoffsComplete
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
  
  
    setSchedule() {
      this.schedule = [
        []
      ]
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
  
  
    getPlayoffScore(awayTeam, homeTeam, playoffGame) {
      let fieldWidth = Math.max(playoffGame.away.getName().length,
        playoffGame.home.getName().length) + 1
      let awayScore = playoffGame.getAwayScore()
      let homeScore = playoffGame.getHomeScore()
      let result = "\n"
      //result += "{rank:>2}. ".format(rank = awayTeam["rank"])
      result += awayTeam.rank + ". "
      //result += ("{name:<" + (fieldWidth) +
      //  "}").format(name = playoffGame.away.getName() + ":")
      result += playoffGame.away.getName() + ": "
      //result += "{score:>3}".format(score = (awayScore)) + "\n"
      result += awayScore + "\n"
      //result += "{rank:>2}. ".format(rank = homeTeam["rank"])
      result += homeTeam.rank + ". "
      //result += ("{name:<" + (fieldWidth) +
      //  "}").format(name = playoffGame.home.getName() + ":")
      result += playoffGame.home.getName() + ": "
      //result += "{score:>3}".format(score = (homeScore))
      result += homeScore + "\n"
      return result
    }
  
  
    getPlayoffBracket() {
      let bracket, tempGame, tempTeam;
      if (this.playoffSchedule == null) {
        return
      }
      //# find max field width
      let fieldWidth = 0
      for (let eachTeam of this.teams) {
        fieldWidth = Math.max(fieldWidth, eachTeam.getName().length + 5)
      }
      //#result = "PLAYOFF BRACKET:\n"
      bracket = {}
      bracket["totalRows"] = this.playoffSchedule[0].length * 2
      bracket["totalCols"] = this.playoffSchedule.length
      bracket["text"] = []
      //for i in range(bracket["totalRows"]){
      for (let i = 0; i < bracket["totalRows"]; i++) {
        bracket["text"].push([])
        //for j in range(bracket["totalCols"]){
        for (let j = 0; j < bracket["totalCols"]; j++) {
          bracket["text"][i].push("")
        }
      }
      //for row in range(this.playoffSchedule[0].length*2){
      for (let row = 0; row < this.playoffSchedule[0].length * 2; row++) {
        //for col in range(this.playoffSchedule.length){
        for (let col = 0; col < this.playoffSchedule.length; col++) {
          let result = ""
          if (Math.floor(row / 2) >= this.playoffSchedule[col].length || this.playoffSchedule[col][Math.floor(row / 2)].length <= 0) {
            continue
          }
          tempGame = this.playoffSchedule[col][Math.floor(row / 2)]
          if (tempGame.length < 2 && row % 2 == 1) {
            continue
          }
          tempTeam = tempGame[row % 2]
          //result += "{rank:>2}. ".format(rank = tempTeam["rank"])
          result += tempTeam["rank"] + ". "
          //result += ("{name:<" + (fieldWidth) + "}").format(name = tempTeam["team"].getName() + "")
          result += tempTeam["team"].getName()
          //# put result in bracket object
          bracket["text"][row + col * 2][col] = result
        }
      }
      //# build the output string
      let output = "\nPLAYOFF BRACKET:\n"
      //console.log("FieldWidth=" + fieldWidth)
      //for i in range(bracket["totalRows"]){
      for (let i = 0; i < bracket["totalRows"]; i++) {
        if (i % 2 == 0) {
          //# add space between matchups
          output += "\n"
        }
        //for j in range(bracket["totalCols"]){
        for (let j = 0; j < bracket["totalCols"]; j++) {
          output += bracket["text"][i][j]
          //console.log("length=" + bracket["text"][i][j].length)
          for (let k = 0; k < fieldWidth - bracket["text"][i][j].length; k++) {
            output += " "
          }
        }
        output += "\n"
      }
      return output
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
  
  
  
    getSeasonSchedule() {
      let weeksInSchedule = this.schedule.length
      for (let weekCounter of range(weeksInSchedule)) {
        this.getWeekSchedule(weekCounter)
      }
    }
  
  
    doGame() {
      let temp;
      let awayTeam;
      let homeTeam;
      let weeksInSchedule = this.schedule.length
      //# console.log("Week " + (this.currentWeek) + " Day " + (this.currentDay))
      let today = this.schedule[this.currentWeek %
        weeksInSchedule][this.currentDay]
      if (this.currentWeek % 2 == 0) {
        awayTeam = today[0]
        homeTeam = today[1]
      } else {
        awayTeam = today[1]
        homeTeam = today[0]
      }
      temp = new Game(awayTeam, homeTeam)
      temp.generate(1)
      console.log("" + temp.getFinalScore())
      //# add win to standings
      this.standings[temp.winningTeam.getName()]["wins"] += 1
      this.standings[temp.losingTeam.getName()]["losses"] += 1
      //# increase day/week
      this.currentDay += 1
      if (this.currentDay >= this.schedule[this.currentWeek % weeksInSchedule].length) {
        this.currentWeek += 1
        this.currentDay = 0
        //#this.history.push([])
      }
    }
  
    doWeek() {
      console.log("\nWeek " + (this.currentWeek))
      let weeksInSchedule = this.schedule.length
      //# if this.currentWeek % this.numberOfTeams == 0 && this.currentDay == 0:
      //#   this.setSchedule()
      //for i in range(this.schedule[this.currentWeek%(weeksInSchedule)].length){
      for (let i = 0; i < this.schedule[this.currentWeek % (weeksInSchedule)].length; i++) {
        this.doGame()
      }
      //# console.log("Week "+str(this.currentWeek)+" Standings")
      //# this.getStandings()
    }
  
    getStandings() {
      let result = ""
      let count = 1
      let myArray = [];
      for (let key in this.standings) {
        myArray.push({
          teamName: key,
          wins: this.standings[key].wins,
          losses: this.standings[key].losses
        })
      }
      //# Reverse/Descending Sort
      //let tempList = sorted(this.standings.items(),key = lambda x: x[1]["wins"],reverse = true)
      myArray.sort(function(a, b) {
        return b.wins - a.wins
      })
      //# find max field width
      let fieldWidth = 0
      for (let eachTeam of myArray) {
        fieldWidth = Math.max(fieldWidth, eachTeam.teamName.length + 1)
      }
      //# build result string
      //for each in tempList:
      for (let each of myArray) {
        //result += "{rank:>2}. ".format(rank = count)
        result += count + ". "
        //result += ("{name:<" + (fieldWidth) + "}").format(name = each[0] + ":")
        result += each.teamName + ": "
        // result += "{score:>4}".format(
        //   score = (each[1]["wins"])) + "-" + (
        //   each[1]["losses"]) + "\n"
        result += each.wins + "-" + each.losses + "\n"
        count += 1
      }
      console.log(result)
    }
  
    schedulePlayoffWeekOne() {
      //# generate empty playoff game array
      this.playoffSchedule = [];
      let gameCounter = 1;
      let teamArray = [];
      //# repeat for teamsInLeague / 2 -1 weeks
      while (gameCounter <= Math.floor(this.numberOfTeams / 2)) {
        //# insert new week at index 0
        this.playoffSchedule.splice(0, 0, [])
        //# insert gameCounter games this week
        //for i in range(gameCounter){
        for (let i = 0; i < gameCounter; i++) {
          this.playoffSchedule[0].splice(0, 0, [])
        }
        gameCounter = gameCounter * 2
      }
      let numberOfPlayoffTeams = gameCounter;
      for (let key in this.standings) {
        teamArray.push({
          teamName: key,
          wins: this.standings[key].wins,
          losses: this.standings[key].losses
        })
      }
      //# Reverse/Descending Sort
      //sortedList = sorted(this.standings.items(),key = lambda x: x[1]["wins"],reverse = true)
      teamArray.sort(function(a, b) {
        return b.wins - a.wins
      })
      //# find top numberOfPlayoffTeams/2 teams
      let week = 0;
      let day = 0;
      //for i in range(Math.floor(numberOfPlayoffTeams / 2)){
      for (let i = 0; i < Math.floor(numberOfPlayoffTeams / 2); i++) {
        //for each in this.teams:
        for (let each of this.teams) {
          if (each.getName() == teamArray[i].teamName) {
            this.playoffSchedule[week][day].splice(0, 0, {
              "rank": i + 1,
              "team": each
            })
            day += 1
            break
          }
        }
      }
      //# starting with last day of playoff week
      day = Math.floor(numberOfPlayoffTeams / 2) - 1
      //# find next numberOfPlayoffTeams/2 teams
      let startIndex = Math.floor(numberOfPlayoffTeams / 2)
      //for i in range(startIndex,startIndex + Math.floor(numberOfPlayoffTeams/2)){
      for (let i = startIndex; i < startIndex + Math.floor(numberOfPlayoffTeams / 2); i++) {
        //for each in this.teams:
        for (let each of this.teams) {
          if (each.getName() == teamArray[i].teamName) {
            this.playoffSchedule[week][day].splice(0, 0, {
              "rank": i + 1,
              "team": each
            })
            day -= 1
            break
          }
        }
      }
      //# sort into playoff order
      let week1 = this.playoffSchedule[0];
      this.playoffSchedule[0] = Season.recursive2DArrayPlayoffSort(week1);
    }
  
  
    doPlayoffs(messageLevel = 0) {
      let temp, today, winTeam;
      let awayTeam;
      let homeTeam;
      if (this.playoffSchedule == null) {
        this.schedulePlayoffWeekOne()
      }
      console.log("Playoff Week " + (this.currentPlayoffWeek) + " Day " + (this.currentPlayoffDay))
      today = this.playoffSchedule[this.currentPlayoffWeek][this.currentPlayoffDay]
      if (today[0]["rank"] < today[1]["rank"]) {
        awayTeam = today[1]
        homeTeam = today[0]
      } else {
        awayTeam = today[0]
        homeTeam = today[1]
      }
      console.log("#" + (awayTeam["rank"]) + " " + awayTeam["team"].getName() + " at #" + (homeTeam["rank"]) + " " + homeTeam["team"].getName())
      temp = new Game(awayTeam["team"], homeTeam["team"])
      temp.generate(messageLevel)
      console.log(this.getPlayoffScore(awayTeam, homeTeam, temp))
      //# add win to standings
      this.standings[temp.winningTeam.getName()]["wins"] += 1
      this.standings[temp.losingTeam.getName()]["losses"] += 1
      if (temp.winningTeam == homeTeam["team"]) {
        winTeam = homeTeam
      } else {
        winTeam = awayTeam
      }
      //# if not final round
      if (this.currentPlayoffWeek < this.playoffSchedule.length - 1) {
        //# add to next week's schedule
        this.playoffSchedule[this.currentPlayoffWeek + 1][Math.floor(this.currentPlayoffDay / 2)].push(winTeam)
        console.log(this.getPlayoffBracket())
        //# increase day/week
        this.currentPlayoffDay += 1
        //# if day >= number of games this week
        if (this.currentPlayoffDay >= this.playoffSchedule[this.currentPlayoffWeek].length) {
          this.currentPlayoffWeek += 1
          this.currentPlayoffDay = 0
        }
      } else {
        //# this WAS the final round
        console.log("* * * PLAYOFF CHAMPS: " + winTeam["team"].getFullName() + " * * *")
        this.playoffsComplete = true
      }
    }
  
  
    getFBRanking(limit = 0) {
      let resultString = ""
      let result = []
      let count;
      //for each in this.teams:
      for (let each of this.teams) {
        result.push({
          name: each.fb.teamName + " " + each.fb.firstName + " " + each.fb.lastName,
          rating: each.fb.stats.getRushingRating()
        })
      }
      //result = dict(sorted(result.items(), key = lambda item: item[1], reverse = true))
      result.sort(function(a, b) {
        return b.rating - a.rating
      })
      count = 1
      if (limit < 1) {
        limit = this.teams.length
      }
      resultString += ("Fullback Ranking\n")
      for (let each of result) {
        resultString += ("  " + (count) + ". " + each.name + ": " + (Math.round(each.rating * 100) / 100) + "\n")
        count += 1
        if (count > limit) {
          break
        }
  
      }
      return resultString
    }
  
    getQBRanking(limit = 0) {
      let resultString = ""
      let result = []
      let count;
      //for each in this.teams:
      for (let each of this.teams) {
        result.push({
          name: each.qb.teamName + " " + each.qb.firstName + " " + each.qb.lastName,
          rating: each.qb.stats.getPasserRating()
        })
      }
      //result = dict(sorted(result.items(), key = lambda item: item[1], reverse = true))
      result.sort(function(a, b) {
        return b.rating - a.rating
      })
      count = 1
      if (limit < 1) {
        limit = this.teams.length
      }
      resultString += ("Quarterback Ranking\n")
      for (let each of result) {
        resultString += ("  " + (count) + ". " + each.name + ": " + (Math.round(each.rating * 100) / 100) + "\n")
        count += 1
        if (count > limit) {
          break
        }
        //#console.log(result)
  
      }
      return resultString
    }
  
    getTopFB() {
      let result = []
      //for each in this.teams:
      for (let each of this.teams) {
        result.push({
          rating: each.fb.stats.getRushingRating(),
          object: each.fb
        })
      }
      result.sort(function(a, b) {
        return b.rating - a.rating
      })
      return result[0].object
    }
  
  
    getTopQB() {
      let result = []
      //for each in this.teams:
      for (let each of this.teams) {
        result.push({
          rating: each.qb.stats.getPasserRating(),
          object: each.qb
        })
      }
      result.sort(function(a, b) {
        return b.rating - a.rating
      })
      return result[0].object
    }
  
  
    getTopWR() {
      let result = []
      //for each in this.teams:
      for (let each of this.teams) {
        result.push({
          rating: each.wr.stats.getReceiverRating(),
          object: each.wr
        })
      }
      result.sort(function(a, b) {
        return b.rating - a.rating
      })
      return result[0].object
    }
  
  
    getWRRanking(limit = 0) {
      let resultString = ""
      let result = []
      let count = 1
      //for each in this.teams:
      for (let each of this.teams) {
        result.push({
          name: each.wr.teamName + " " + each.wr.firstName + " " + each.wr.lastName,
          rating: each.wr.stats.getReceiverRating()
        })
      }
      //result = dict(sorted(result.items(), key = lambda item: item[1], reverse = true))
      result.sort(function(a, b) {
        return b.rating - a.rating
      })
      if (limit < 1) {
        limit = this.teams.length
      }
      resultString += ("Wide Receiver Ranking\n")
      for (let each of result) {
        resultString += ("  " + (count) + ". " + each.name + ": " + (Math.round(each.rating * 100) / 100) + "\n")
        count += 1
        if (count > limit) {
          break
        }
  
      }
      return resultString
    }
  
    getMVPRanking(limit = 3) {
      let resultString = ""
      let result = []
      let count = 1;
      //for eachTeam in this.teams:
      for (let eachTeam of this.teams) {
        //for eachPlayer in eachTeam.players:
        for (let eachPlayer of eachTeam.players) {
          result.push({
            name: eachPlayer.teamName + " " + eachPlayer.firstName + " " + eachPlayer.lastName,
            rating: eachPlayer.stats.getMVPRating()
          })
        }
      }
      //console.log(result)
      //result = dict(sorted(result.items(), key = lambda item: item[1], reverse = true))
      result.sort(function(a, b) {
        return b.rating - a.rating
      })
      //console.log(result)
      if (limit < 1) {
        limit = this.teams.length
      }
      resultString += ("MVP Ranking\n")
      for (let each of result) {
        resultString += ("  " + (count) + ". " + each.name + ": " + (Math.round(each.rating * 100) / 100) + "\n")
        count += 1
        if (count > limit) {
          break
        }
  
      }
      return resultString
    }
  }