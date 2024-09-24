class BaseballTeam {

  //# class methods (for constructing specific types)
  //@classmethod
  static debug() {
    let temp = new BaseballTeam();
    temp.players = []
    //for i in range(Team.playersPerTeam):
    for (let i = 0; i < BaseballTeam.playersPerTeam; i++) {
      tempPlayer = new BaseballPlayer.debug();
      tempPlayer.teamName = temp.getPlace();
      temp.players.push(tempPlayer);
    }
    return temp
  }

  //# teamNameList = json.loads(requests.get('https://raw.githubusercontent.com/dariusk/corpora/master/data/humans/firstNames.json').text)["firstNames"]
  static teamCount = 0;
  //alert(Name.teamNameList);
  //Name.shuffle(Name.teamNameList);
  static teamNameList = Name.teamNameList;
  //random.seed(10) not possible to seed in vanilla JS

  static teamPlaceList = [];
  static playersPerTeam = 9;

  constructor() {
    this.teamIdNumber = 10 + (BaseballTeam.teamCount++)
    this.jerseyNumberList = []
    this.place = Name.placeList[Math.floor(rng.random() * Name.placeList.length)]
    while (this.place in BaseballTeam.teamPlaceList) {
      this.place = Name.placeList[Math.floor(rng.random() * Name.placeList.length)]
    }
    BaseballTeam.teamPlaceList.push(this.place)
    this.name = BaseballTeam.teamNameList.splice(Math.floor(rng.random() * BaseballTeam.teamNameList.length),1)[0];

    
    this.mood = rng.random() * 0.5 + rng.random() * 0.5
    this.hunger = 1
    this.hungerRate = 0.35
    this.players = []
    //for i in range(Team.playersPerTeam):
    for (let i = 0; i < BaseballTeam.playersPerTeam; i++) {
      let temp = new BaseballPlayer()
      temp.teamName = this.place
      temp.jerseyNumber = this.getJerseyNumber()
      this.players.push(temp)
    }
    
    this.stats = new Stats(this.place, this.name)
    this.dailyStats = new Stats(this.place, this.name)
    this.xp = 0
    this.setup()
  }

  addPlayer(newPlayer) {
    newPlayer.teamName = this.place
    newPlayer.stats.teamLoc = this.getPlace()
    this.players.push(newPlayer)
    this.setup()
  }


  getJerseyNumber() {
    let result = Math.ceil(rng.random() * 98)
    //# don't use while loop in case the jerseyNumberList ever fills up
    //for i in range(Team.playersPerTeam):
    for (let i = 0; i < BaseballTeam.playersPerTeam; i++) {
      if (!this.jerseyNumberList.includes(result)) {
        break
      }
      result = Math.ceil(rng.random() * 98)
    }
    this.jerseyNumberList.push(result)
    return result
  }

  getPlaybook() {
    let result = "-----Playbook-----"
    let count = 1
    //for each in this.playbook["pass"]:
    for (let each of this.playbook["pass"]) {
      result += '\n' + (count) + '. ' + (each)
      count += 1
    }
    //for each in this.playbook["run"]:
    for (let each of this.playbook["run"]) {
      result += '\n' + (count) + '. ' + (each)
      count += 1
    }
    return result
  }

  getOffensePlay(down, toFirstDown) {
    let playType;
    let preferredPlayType = this.preferredPlayOrder[(down - 1)];
    //# if LONG 75+% chance of pass
    if (toFirstDown > 10) {
      playType = ["pass", "pass", "pass", "pass", "pass", "pass", "run",
        preferredPlayType
      ][Math.floor(rng.random() * 8)]
    } else if (toFirstDown <= 3) {
      //# if SHORT 75+% chance of run
      playType = ["pass", "run", "run", "run", "run", "run", "run",
        preferredPlayType
      ][Math.floor(rng.random() * 8)]
    } else {
      //# 75% chance of preferredPlayType
      playType = ["pass", "run", preferredPlayType, preferredPlayType][Math.floor(rng.random() * 4)]
    }
    return this.playbook[playType][Math.floor(rng.random() * this.playbook[playType].length)]
  }

  getFullName() {
    return this.place.toUpperCase() + " " + this.name
  }

  getFullPlace() {
    return this.place.toUpperCase()
  }

  getName() {
    return this.place + " " + this.name
  }

  getPlace() {
    return this.place
  }

  getPlayer(num) {
    try {
      num = parseInt(num)
    } catch (error) {
      return null
    }

    result = ""
    for (let each of this.players) {
      if (num == each.jerseyNumber) {
        result += '' + (each) + '\n'
      }
    }
    return result
  }

  getPlayerList() {
    let result = "-----Players-----\n"
    for (let each of this.players) {
      result += '' + (each.getSummary()) + '\n'
    }
    return result
  }

  getRandomPlayer() {
    //for i in range(10):
    for (let i = 0; i < 10; i++) {
      result = this.players[Math.floor(rng.random() * this.players.length)]
      if (!result.isAsleep()) {
        break
      }
    }
    return result
  }

  getTeamGrade() {
    let total = 0
    for (let each of this.players) {
      total += parseFloat(each.getHittingAptitude())
    }
    total += this.pitcher.getPitchingAptitude();
    return Math.round(total / this.players.length * 100) / 100
  }

  getStyleGrade(style) {
    let total = 0
    for (let each of this.players) {
      if (each.isAsleep()) {
        continue
      }
      if (each.style == style) {
        total += 1
      }
    }
    return Math.round(total / this.players.length * 100) / 100
  }

  getWinRatio() {
    if (this.stats.gamesPlayed == 0) {
      return 0
    }
    return this.stats.gamesWon / this.stats.gamesPlayed
  }

  //# returns a string
  levelUpPlayers() {
    let result = ""

    for (let eachPlayer of this.players) {
      if (eachPlayer.isLevelUp()) {
        result += eachPlayer.setLevelUp()
      }
      //# all players update xp, levelup or not
      eachPlayer.updateXp()
    }
    //# could change the team's lineup
    this.setup()
    return result
  }

  setDefenseGrade() {
    let total = 0
    for (let each of this.players) {
      if (each.isAsleep()) {
        continue
      }
      total += each.getDefenseGrade()
    }
    return Math.round(total / this.players.length * 100) / 100
  }

  //# kicker accuracy lower is better
  //# max kicker accuracy is 15.38, average is about 26
  getKickerAccuracy() {
    return 1 / (this.k.kicking + 1) * 200 + 12 - this.k.acceleration
  }

  //# kicker power higher is better
  //# max is 1.0, average is 0.58
  getKickerPower() {
    return (this.k.kicking + this.k.acceleration) / 24
  }

  getOffensePassPlayTotal(offensePlay, clock) {
    let passingBoost = 1.0
    let weigh = {
      "qbThrowing": 2.4,
      "qbStrength": 1.3,
      "wrCatching": 1.1,
      "playCleverness": 0.7,
      "hunger": 0.5
    }
    //# max offTotal is ~52
    let result = this.qb.throwing * weigh["qbThrowing"] * passingBoost
    result += this.qb.strength * weigh["qbStrength"] * passingBoost
    result += this.wr.catching * weigh["wrCatching"] * passingBoost
    result += offensePlay.cleverness * weigh["playCleverness"]
    result += this.qb.getMood(clock)
    result += this.wr.getMood(clock) + this.getMood(clock)
    result += this.hunger * weigh["hunger"]
    return result
  }

  getOffenseRunPlayTotal(offensePlay, player, clock) {
    let rushingBoost = 1.0
    let weigh = {
      "pSpeed": 1.1,
      "pAgility": 1.0,
      "pAcceleration": 0.7,
      "playCleverness": 0.6,
      "hunger": 0.5
    }
    //# max offTotal is ~??
    let result = player.speed * weigh["pSpeed"] * rushingBoost
    result += player.agility * weigh["pAgility"] * rushingBoost
    result += player.acceleration * weigh["pAcceleration"] * rushingBoost
    result += offensePlay.cleverness * weigh["playCleverness"]
    result += player.getMood(clock)
    result += this.getMood(clock)
    result += this.hunger * weigh["hunger"]
    return result
  }

  getDefenseGrade() {
    return this.defenseGrade
  }

  getDefensePlayTotal(offensePlay, defenseTelepathy, clock) {
    let weigh = {
      "defTelepathy": 1.2,
      "defGrade": 2.0,
      "defStyle": 3.0,
      "hunger": 1.2
    }
    //# max defTotal is ~50
    let result = defenseTelepathy * 6 * weigh["defTelepathy"]
    result += this.defenseGrade * weigh["defGrade"]
    result += this.getStyleGrade(
      offensePlay.style) * 12 * weigh["defStyle"]
    result += this.getMood(clock)
    result += this.hunger * weigh["hunger"]
    return result
  }

  getPlayerStats() {
    let result = ""
    for (let each of this.players) {
      result += each.getFullStats()
    }
    return result
  }

  getPlayerToTrade() {
    for (let i = 0; i < this.players.length; i++) {
      result = this.getRandomPlayer()
      if (result.position == null) {
        return result
      }
    }
    return this.players[this.players.length]
  }

  getPlayerWithHigh(attributeString = null) {
    //for i in range(12,0,-1):
    for (let i = 12; i >= 0; i--) {
      let randPlayer = this.players[Math.floor(rng.random() * this.players.length)]
      if (randPlayer.isAsleep()) {
        continue
      }
      if (randPlayer[attributeString] >= i) {
        return randPlayer
      }
    }
    return this.players[Math.floor(rng.random() * this.players.length)]
  }

  getPlayerWithLow(attributeString = null) {
    //for i in range(0,13,1):
    for (let i = 0; i < 13; i++) {
      randPlayer = random.choice(this.players)
      if (randPlayer.isAsleep()) {
        continue
      }
      if (randPlayer[attributeString] <= i) {
        return randPlayer
      }
    }
    return random.choice(this.players)
  }

  getMood(clock) {
    return Math.sin(this.mood * clock)
  }

  getTeamStats() {
    return this.getFullName() + "\n" + (this.stats)
  }

  removePlayer(formerPlayer) {
    formerPlayer.teamName = null
    this.players.remove(formerPlayer)
    this.setup()
  }

  setup() {
    for (let i = 0; i < this.players.length; i++) {
      this.players[i].teamName = this.place
      this.players[i].stats.teamLoc = this.place
    }
    this.setPositions()
    
  }

  setHungerUp() {
    this.hunger += rng.random() * this.hungerRate + rng.random() * this.hungerRate
  }

  setHungerDown() {
    if (this.hunger > 0.01) {
      this.hunger *= this.hungerRate
    }
  }

  toString() {
    let result = ""
    result += this.place + " " + this.name + " --- Team Grade: " + (this.getTeamGrade()) + "\n"
    result += (this.getPlayerList())
    return result
  }

  setPositions() {
    //# reset positions
    for (let eachPlayer of this.players) {
      eachPlayer.position = null
    }
    //# find pitcher
    //this.players.sort(key=lambda x: x.getPitchingAptitude(), reverse=true)
    this.players.sort(function(a, b) {
      return b.getPitchingAptitude() - a.getPitchingAptitude()
    });
    for (let eachPlayer of this.players) {
      if (eachPlayer.position == null) {
        eachPlayer.position = "Pitcher"
        this.pitcher = eachPlayer
        break
      }
    }
    //# find slugger
    //this.players.sort(key=lambda x: x.getHittingAptitude(), reverse=true)
    this.players.sort(function(a, b) {
      return b.getHittingAptitude() - a.getHittingAptitude()
    });
    for (let eachPlayer of this.players) {
      if (eachPlayer.position == null) {
        eachPlayer.position = "Slugger"
        this.slugger = eachPlayer
        break
      }
    }
    // swap index 0 with index 3 (the cleanup hitter position)
    let temp = this.players[0];
    this.players[0] = this.players[3];
    this.players[3] = temp;
    //# fill in with random position names
    for (let eachPlayer of this.players) {
      if (eachPlayer.position == null) {
        eachPlayer.position = Name.randomItem(Name.teamRoles);
      }
    }

  }







  resetSeasonStats() {
    this.stats = new Stats(this.place, this.name)
  }

  updateXp() {
    this.xp += this.dailyXp
    this.dailyXp = 0
  }
}