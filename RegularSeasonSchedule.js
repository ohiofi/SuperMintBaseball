//
// A RegularSeasonSchedule has standings for the teams https://en.wikipedia.org/wiki/Standings_(sports)
// A RegularSeasonSchedule has a schedule


class RegularSeasonSchedule extends Schedule {

  constructor(teams) {
    super(teams);
    this.standings = {};
    for (let each of this.teams) {
      this.standings[each.getName()] = {
        "wins": 0,
        "losses": 0
      }
    }
    
    this.setSchedule()
  }

  didTheseTeamsAlreadyPlay(team1, team2) {
    let timesPlayed = 0
    //# check each day
    for (let day of this.schedule) {
      //# check each day
      for (let game of day) {
        if ((team1.equals(game.awayTeam) && team2.equals(game.homeTeam)) ||
          (team2.equals(game.awayTeam) && team1.equals(game.homeTeam))
        ) {
          //#console.log(team1.getName()+" already played "+team2.getName())
          timesPlayed += 1
        }
        if (timesPlayed >= 1) {
          return true
        }
      }
    }
    return false
  }

  doGame() {
    let temp;
    let awayTeam;
    let homeTeam;
    let daysInSchedule = this.schedule.length
    //# console.log("Week " + (this.currentWeek) + " Day " + (this.currentDay))
    let today = this.schedule[this.currentWeek %
      daysInSchedule][this.currentDay]
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
    if (this.currentDay >= this.schedule[this.currentWeek % daysInSchedule].length) {
      this.currentWeek += 1
      this.currentDay = 0
      //#this.history.push([])
    }
  }

  getDaySchedule(dayNumber) {
    let result = [];
    if (dayNumber == null) {
      dayNumber = 0
    }
    //console.log("Day " + (dayNumber))
    for (let eachGame of this.schedule[dayNumber]) {
      result.push(eachGame.getName())
    }
    return result;
  }

  

  getSeasonSchedule() {

    let result = "";
    let daysInSchedule = this.schedule.length
    for (let i = 0; i < daysInSchedule; i++) {
      result += "Day " + i + "\n  " + this.getDaySchedule(i);
    }
    return result
  }

  nextGameMessages(dayNumber){
    let resultArray = [];
    for (let eachGame of this.schedule[dayNumber]) {
      resultArray.push(new BaseballGameMessage(eachGame.getName(),eachGame.next()))
    }
    return resultArray
  }









  isTeamScheduledThisDay(someTeam, dayNum) {
    //# check each game in current week
    for (let eachGame of this.schedule[dayNum]) {
      if (someTeam.equals(eachGame.awayTeam) || someTeam.equals(eachGame.homeTeam)) {
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
        //# if rng.random() < 0.5:
        //#   possibleGames.push([this.teams[i],this.teams[j]])
        //# }else{
        if((i+j)%2 ==0){
          possibleGames.splice(Math.floor(rng.random() * possibleGames.length), 0, new BaseballGame(this.teams[i], this.teams[j]))
        }else{
          possibleGames.splice(Math.floor(rng.random() * possibleGames.length), 0, new BaseballGame(this.teams[j], this.teams[i]))
        }
        
      }
    }
    //# for eachGame in possibleGames:
    for (let eachGame of possibleGames) {
      let dayCounter = 0;
      while (true) {
        //# if both teams not scheduled this day
        if (!this.isTeamScheduledThisDay(eachGame.awayTeam, dayCounter) && !this.isTeamScheduledThisDay(eachGame.homeTeam, dayCounter)) {
          //# add to the schedule
          this.schedule[dayCounter].push(eachGame)
          //# break while true
          break
          //# else
        } else {
          //# try next day
          dayCounter += 1
          if (dayCounter >= this.schedule.length) {
            //# add a new day
            this.schedule.push([])
          }
        }
      }
    }
  }

}