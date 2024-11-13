// A league has multiple years
// A year is a finite state machine that progresses thru preseason, regular season, and playoff tournament
// A year has 1 FreeAgentRelease, 1 DraftCeremony, 1 RegularSeason, and 1 PlayoffTournament
// A year has lists of the year's top pitchers and the year's top hitters/sluggers


const YearStates = {
  PRESEASON:0,
  REGULAR_SEASON: 1,
  PLAYOFF_TOURNAMENT: 2
}

class Year {

  static idCounter = 0;

  static restructure(jsonObject) {
    Object.setPrototypeOf(jsonObject, Year.prototype);
    for (let i = 0; i < jsonObject.teams.length; i++) {
      jsonObject.teams[i] = Object.setPrototypeOf(jsonObject.teams[i], BaseballTeam.prototype);
    }
    
    return jsonObject;
  }

   
  
    constructor(teamArray) {
      this.yearIdNumber = idCounter++;
      this.hasStarted = false;
      this.done = false;
      this.state = YearStates.PRESEASON;
      this.numberOfTeams = teamArray.length
      
      this.regularSeason = RegularSeason(teamArray);
      this.playoffs = null;
      
      this.teams = teamArray
      //for each in this.teams:
      for (let each of this.teams) {
        this.standings[each.getName()] = {
          "wins": 0,
          "losses": 0
        }
      }
      this.currentDay = 0;
      this.regularSeasonComplete = false;
      this.playoffsComplete = false;
      
    }    



    doRegularSeason(){
      // check if all of today's games are over
    }
  
    
  
    // doWeek() {
    //   console.log("\nWeek " + (this.currentWeek))
    //   let weeksInSchedule = this.schedule.length
    //   //# if this.currentWeek % this.numberOfTeams == 0 && this.currentDay == 0:
    //   //#   this.setSchedule()
    //   //for i in range(this.schedule[this.currentWeek%(weeksInSchedule)].length){
    //   for (let i = 0; i < this.schedule[this.currentWeek % (weeksInSchedule)].length; i++) {
    //     this.doGame()
    //   }
    //   //# console.log("Week "+str(this.currentWeek)+" Standings")
    //   //# this.getStandings()
    // }
  
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

    isTodayDone(){
      if(this.state == YearStates.REGULAR_SEASON){
        this.regularSeason.isTodayDone()
      }
      else if(this.playoffs != null && this.state == YearStates.PLAYOFF_TOURNAMENT){
        this.playoffs.isTodayDone()
      }
      
    }

    next(){
      switch(this.state){
        case YearStates.PRESEASON:
          break
        case YearStates.REGULAR_SEASON:
          break
        case YearStates.PLAYOFF_TOURNAMENT:
          break
      }
    }
  }