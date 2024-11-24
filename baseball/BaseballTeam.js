class BaseballTeam {

  static idCounter = 0;

  static restructure(jsonObject) {
    Object.setPrototypeOf(jsonObject, BaseballTeam.prototype);
    jsonObject.manager = StatsEventManager.restructure(jsonObject.manager);
    if (jsonObject.pitcher != null) jsonObject.pitcher = Object.setPrototypeOf(jsonObject.pitcher, BaseballPlayer.prototype);
    if (jsonObject.slugger != null) jsonObject.slugger = Object.setPrototypeOf(jsonObject.slugger, BaseballPlayer.prototype);
    for (let i = 0; i < jsonObject.players.length; i++) {
      jsonObject.players[i] = Object.setPrototypeOf(jsonObject.players[i], BaseballPlayer.prototype);
    }
    this.setup();
    return jsonObject;
  }

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
  //alert(Name.teamNameList);
  //Name.shuffle(Name.teamNameList);
  //static teamNameList = Name.teamNameList;
  //random.seed(10) not possible to seed in vanilla JS

  static teamPlaceList = [];
  static playersPerTeam = 9;

  constructor() {
    this.leagueIdNumber = 0;
    this.teamIdNumber = BaseballTeam.idCounter++;
    this.jerseyNumberList = []
    // this.place = Name.places[Math.floor(rng.random() * Name.places.length)]
    // while (this.place in BaseballTeam.teamPlaceList) {
    //   this.place = Name.places[Math.floor(rng.random() * Name.places.length)]
    // }
    //BaseballTeam.teamPlaceList.push(this.place)
    this.colorScheme = Name.colorCombos.splice(Math.floor(rng.random() * Name.colorCombos.length), 1)[0];
    this.place = null;
    if (Name.places.length > 0) {
      this.place = Name.places.splice(Math.floor(rng.random() * Name.places.length), 1)[0];
    }

    this.name = Name.teamNameList.splice(Math.floor(rng.random() * Name.teamNameList.length), 1)[0];
    this.pitcher = null;
    this.slugger = null;

    this.mood = rng.random() * 0.5 + rng.random() * 0.5
    this.hunger = 1
    this.hungerRate = 0.35
    this.players = []


    this.stats = new Stats()
    this.lifetimeStats = new Stats()
    this.xp = 0

    this.batterUpNumber = 0;
    this.manager = new StatsEventManager();
  }

  addAtBats() {
    this.stats.atBats++;
    this.lifetimeStats.atBats++;
  }
  addBasesOnBalls() {
    this.stats.basesOnBalls++;
    this.lifetimeStats.basesOnBalls++;
  }
  addDoubles() {
    this.stats.doubles++;
    this.lifetimeStats.doubles++;
    this.addHits();
    this.addTotalBases(2)
  }
  addHits() {
    this.stats.hits++;
    this.lifetimeStats.hits++;
  }
  addHomeRuns() {
    this.stats.homeRuns++;
    this.lifetimeStats.homeRuns++;
    this.addHits();
    this.addTotalBases(4)
  }
  addHomeRunsAllowed() {
    this.stats.homeRunsAllowed++;
    this.lifetimeStats.homeRunsAllowed++;
  }
  addInningsPitched() {
    this.stats.inningsPitched++;
    this.lifetimeStats.inningsPitched++;
  }
  addLoss() {
    this.stats.losses++;
    this.stats.gamesPlayed++;
    this.lifetimeStats.losses++;
    this.lifetimeStats.gamesPlayed++;
    for (let eachPlayer of this.players) {
      eachPlayer.addLoss()
    }
  }
  addRunsAllowed() {
    this.stats.runsAllowed++;
    this.lifetimeStats.runsAllowed++;
  }
  addRunsScored() {
    this.stats.runsScored++;
    this.lifetimeStats.runsScored++;
  }
  addSacrificeFlies() {
    this.stats.sacrificeFlies++;
    this.lifetimeStats.sacrificeFlies++;
    this.addHits();
    this.addTotalBases(1)
  }
  addSingles() {
    this.stats.singles++;
    this.lifetimeStats.singles++;
    this.addHits();
    this.addTotalBases(1)
  }
  addStrikeoutsAtBat() {
    this.stats.strikeoutsAtBat++;
    this.lifetimeStats.strikeoutsAtBat++;
  }
  addStrikeoutsThrown() {
    this.stats.strikeoutsThrown++;
    this.lifetimeStats.strikeoutsThrown++;
  }
  addTotalBases(num) {
    this.stats.totalBases += num;
    this.lifetimeStats.totalBases += num;
  }
  addTriples() {
    this.stats.triples++;
    this.lifetimeStats.triples++;
    this.addHits();
    this.addTotalBases(3)
  }
  addWalksAllowed() {
    this.stats.walksAllowed++;
    this.lifetimeStats.walksAllowed++;
  }
  addWin() {
    this.stats.wins++;
    this.stats.gamesPlayed++;
    this.lifetimeStats.wins++;
    this.lifetimeStats.gamesPlayed++;
    for (let eachPlayer of this.players) {
      eachPlayer.addWin()
    }
  }


  addPlayer(newPlayer) {
    newPlayer.teamName = this.colorScheme + this.place.abbreviation
    newPlayer.stats.teamLocation = this.getPlace()
    this.players.push(newPlayer)
    this.setup()
  }



  equals(otherObject) {
    return this.teamIdNumber === otherObject.teamIdNumber &&
      this.name === otherObject.name &&
      this.place.name === otherObject.place.name &&
      this.colorScheme === otherObject.colorScheme
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


  getName() {
    return "<nobr>" + this.colorScheme + this.place.abbreviation.toUpperCase() + "</nobr> " + this.name
  }

  getNameWithLink() {
    return '<a href="#" class="link link-light link-underline-opacity-25 link-underline-opacity-100-hover" onclick="app.view.modal.update(' + this.leagueIdNumber + ');" data-bs-target="#statsModal" data-bs-toggle="modal" >' +
      this.getName() + '</a>';
  }

  getFullName() {
    return "<nobr>" + this.colorScheme + this.place.name.toUpperCase() + "</nobr> " + this.name
  }

  getPlace() {
    return this.colorScheme + this.place.name.toUpperCase()
  }






  getNextBatter() {
    return this.players[this.batterUpNumber++ % this.players.length];
  }

  getPitcher() {
    if (this.pitcher == null) {
      this.setup();
    }
    return this.pitcher;
  }



  getPlayerList() {
    let result = "";
    for (let each of this.players) {
      result += `
            <tr>
                <td>
                    <a href="#" onclick="app.view.modal.update(${each.leagueIdNumber})" class="link text-light link-offset-2 link-light link-underline-opacity-25 link-underline-opacity-100-hover">
                        ${each.fullname}
                    </a>
                </td>
                <td>${each.position}</td>
            </tr>
        `;
    }
    return result.trim();
  }


  getRandomPlayer() {
    return this.players[Math.floor(rng.random() * this.players.length)]
    //for i in range(10):
    // for (let i = 0; i < 10; i++) { // try max 10 times
    //   result = this.players[Math.floor(rng.random() * this.players.length)]
    //   if (!result.isAsleep()) {
    //     break
    //   }
    // }
    // return result
  }

  getStats() {
    return this.getFullName() + "\n" + (this.stats)
  }

  getTeamAptitude() {
    let total = 0
    for (let each of this.players) {
      total += parseFloat(each.getBattingAptitude())
      total += parseFloat(each.getDefenseAptitude())
    }
    total += this.pitcher.getPitchingAptitude();
    return total / (this.players.length * 2 + 1) * 100 / 100
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






  removePlayer(formerPlayer) {
    formerPlayer.teamName = null
    this.players.remove(formerPlayer)
    this.setup()
  }

  resetSeasonStats() {
    this.stats = new Stats()
  }



  setHungerUp() {
    //this.hunger += rng.random() * this.hungerRate + rng.random() * this.hungerRate
    for (let eachPlayer of this.players) {
      eachPlayer.setHungerUp();
    }
  }

  setHungerDown() {
    // if (this.hunger > 0.01 && this.hungerRate < 1) {
    //   this.hunger *= this.hungerRate;
    // }
    // else if (this.hunger > 0.01 && this.hungerRate >= 1) {
    //     this.hunger *= 0.5;
    // }
    for (let eachPlayer of this.players) {
      eachPlayer.setHungerDown();
    }
  }

  setPositions() {
    //# reset positions
    for (let eachPlayer of this.players) {
      eachPlayer.position = null
    }
    //# find pitcher
    //this.players.sort(key=lambda x: x.getPitchingAptitude(), reverse=true)
    this.players.sort(function (a, b) {
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
    //this.players.sort(key=lambda x: x.getBattingAptitude(), reverse=true)
    this.players.sort(function (a, b) {
      return b.getBattingAptitude() - a.getBattingAptitude()
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
        eachPlayer.position = eachPlayer.getDefaultPosition();
      }
    }

  }

  setup() {
    for (let i = 0; i < this.players.length; i++) {
      this.players[i].teamName = this.colorScheme + this.place.abbreviation
    }
    this.setPositions()
  }

  getStatsTable() {
    return `
        <table class="table table-dark table-striped table-bordered small table-sm table-borderless">
            <tr>
                <th colspan="2" class="text-center">Players</th>
            </tr>
            ${this.getPlayerList()}
            <tr><td>Number of Players</td><td>${this.players.length}</td></tr>
        </table>
        <details>
            <summary>Stats</summary>
            ${this.stats.getStatsTable()}
        </details>
        <details>
            <summary>Info</summary>
            <table class="table table-dark table-striped table-bordered small table-sm table-borderless">
                <tr><td>Team ID</td><td>${this.teamIdNumber}</td></tr>
                <tr><td>Place</td><td>${this.place.abbreviation}, ${this.place.name}</td></tr>
                <tr><td>Team Name</td><td>${this.name}</td></tr>
                <tr><td>Color Scheme</td><td>${this.colorScheme}</td></tr>
                <tr><td>Team Aptitude</td><td>${this.getTeamAptitude().toFixed(1)}</td></tr>
                <tr><td>Mood</td><td>${this.mood.toFixed(1)}</td></tr>
                <tr><td>Hunger</td><td>${this.hunger.toFixed(1)}</td></tr>
                <tr><td>Hunger Rate</td><td>${this.hungerRate.toFixed(1)}</td></tr>
                <tr><td>XP</td><td>${this.xp.toFixed(1)}</td></tr>
                <tr><td>Batter Up Number</td><td>${this.batterUpNumber}</td></tr>
                <tr><td>Jersey Numbers</td><td>${this.jerseyNumberList.join(", ")}</td></tr>
            </table>
        </details>
        <details>
            <summary>Lifetime Stats</summary>
            ${this.lifetimeStats.getStatsTable()}
        </details>
  `.trim();
  }












  updateXp() {
    this.xp += this.dailyXp
    this.dailyXp = 0
  }
}