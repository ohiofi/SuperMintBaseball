class BaseballTeam {

  static idCounter = 0;

  static restructure(jsonObject){
    Object.setPrototypeOf(jsonObject, BaseballTeam.prototype);
    if(jsonObject.pitcher != null) jsonObject.pitcher = Object.setPrototypeOf(jsonObject.pitcher, BaseballPlayer.prototype);
    if(jsonObject.slugger != null) jsonObject.slugger = Object.setPrototypeOf(jsonObject.slugger, BaseballPlayer.prototype);
    for(let i=0; i<jsonObject.players.length;i++){
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
    // this.place = Name.placeList[Math.floor(rng.random() * Name.placeList.length)]
    // while (this.place in BaseballTeam.teamPlaceList) {
    //   this.place = Name.placeList[Math.floor(rng.random() * Name.placeList.length)]
    // }
    //BaseballTeam.teamPlaceList.push(this.place)
    this.colorScheme = Name.colorCombos.splice(Math.floor(rng.random() * Name.colorCombos.length),1)[0];
    this.place = "unknown place"
    if(Name.placeList.length > 0){
      this.place = Name.placeList.splice(Math.floor(rng.random() * Name.placeList.length),1)[0];
    }
    
    this.name = Name.teamNameList.splice(Math.floor(rng.random() * Name.teamNameList.length),1)[0];
    this.pitcher = null;
    this.slugger = null;
    
    this.mood = rng.random() * 0.5 + rng.random() * 0.5
    this.hunger = 1
    this.hungerRate = 0.35
    this.players = []
    
    
    this.stats = new Stats(this.colorScheme + this.place, this.name)
    this.dailyStats = new Stats(this.colorScheme + this.place, this.name)
    this.xp = 0
    
    this.batterUpNumber = 0;
  }

  addPlayer(newPlayer) {
    newPlayer.teamName = this.colorScheme + this.place
    newPlayer.stats.teamLocation= this.getPlace()
    this.players.push(newPlayer)
    this.setup()
  }

  equals(otherObject){
    return this.teamIdNumber === otherObject.teamIdNumber &&
    this.name === otherObject.name &&
    this.place === otherObject.place &&
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

  // getPlaybook() {
  //   let result = "-----Playbook-----"
  //   let count = 1
  //   //for each in this.playbook["pass"]:
  //   for (let each of this.playbook["pass"]) {
  //     result += '\n' + (count) + '. ' + (each)
  //     count += 1
  //   }
  //   //for each in this.playbook["run"]:
  //   for (let each of this.playbook["run"]) {
  //     result += '\n' + (count) + '. ' + (each)
  //     count += 1
  //   }
  //   return result
  // }

  // getOffensePlay(down, toFirstDown) {
  //   let playType;
  //   let preferredPlayType = this.preferredPlayOrder[(down - 1)];
  //   //# if LONG 75+% chance of pass
  //   if (toFirstDown > 10) {
  //     playType = ["pass", "pass", "pass", "pass", "pass", "pass", "run",
  //       preferredPlayType
  //     ][Math.floor(rng.random() * 8)]
  //   } else if (toFirstDown <= 3) {
  //     //# if SHORT 75+% chance of run
  //     playType = ["pass", "run", "run", "run", "run", "run", "run",
  //       preferredPlayType
  //     ][Math.floor(rng.random() * 8)]
  //   } else {
  //     //# 75% chance of preferredPlayType
  //     playType = ["pass", "run", preferredPlayType, preferredPlayType][Math.floor(rng.random() * 4)]
  //   }
  //   return this.playbook[playType][Math.floor(rng.random() * this.playbook[playType].length)]
  // }

  getName() {
    return "<nobr>" + this.colorScheme + this.place.toUpperCase() + "</nobr> " + this.name
  }

  getNameWithLink(){
    return '<a href="#" class="link link-light link-underline-opacity-25 link-underline-opacity-100-hover" onclick="app.updateModal(' + this.leagueIdNumber + ');" data-bs-target="#myModal" data-bs-toggle="modal" >' + 
    this.getName() + '</a>';
}

  getFullName() {
    return "<nobr>" + this.colorScheme + this.place.toUpperCase() + "</nobr> " + this.name
  }

  getPlace() {
    return this.colorScheme + this.place.toUpperCase()
  }


  

  

  getNextBatter(){
    return this.players[this.batterUpNumber++ % this.players.length];
  }

  getPitcher(){
    if(this.pitcher == null){
      this.setup();
    }
    return this.pitcher;
  }

  


  // getPlayerList() {
  //   let result = "<div class='list-group bg-dark'>"
  //   for (let each of this.players) {
  //     result += '<a href="#" onclick="app.updateModal('+each.leagueIdNumber+')" class="list-group-item list-group-item-action text-light bg-dark border-secondary">' + each.fullname + each.position + '</a>'
  //   }
  //   return result + "</div>"
  // }

  getPlayerList() {
    let result = "";
    for (let each of this.players) {
        result += `
            <tr>
                <td>
                    <a href="#" onclick="app.updateModal(${each.leagueIdNumber})" class="link text-light link-offset-2 link-light link-underline-opacity-25 link-underline-opacity-100-hover">
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

  getTeamAptitude() {
    let total = 0
    for (let each of this.players) {
      total += parseFloat(each.getBattingAptitude())
      total += parseFloat(each.getDefenseAptitude())
    }
    total += this.pitcher.getPitchingAptitude();
    return total / (this.players.length * 2 + 1) * 100 / 100
  }

  // getStyleGrade(style) {
  //   let total = 0
  //   for (let each of this.players) {
  //     if (each.isAsleep()) {
  //       continue
  //     }
  //     if (each.style == style) {
  //       total += 1
  //     }
  //   }
  //   return Math.round(total / this.players.length * 100) / 100
  // }

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

  getDefenseGrade() {
    let total = 0
    for (let each of this.players) {
      if (each.isAsleep()) {
        continue
      }
      total += each.getDefenseGrade()
    }
    return Math.round(total / this.players.length * 100) / 100
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

  // getPlayerWithHigh(attributeString = null) {
  //   //for i in range(12,0,-1):
  //   for (let i = 12; i >= 0; i--) {
  //     let randPlayer = this.players[Math.floor(rng.random() * this.players.length)]
  //     if (randPlayer.isAsleep()) {
  //       continue
  //     }
  //     if (randPlayer[attributeString] >= i) {
  //       return randPlayer
  //     }
  //   }
  //   return this.players[Math.floor(rng.random() * this.players.length)]
  // }

  // getPlayerWithLow(attributeString = null) {
  //   //for i in range(0,13,1):
  //   for (let i = 0; i < 13; i++) {
  //     randPlayer = random.choice(this.players)
  //     if (randPlayer.isAsleep()) {
  //       continue
  //     }
  //     if (randPlayer[attributeString] <= i) {
  //       return randPlayer
  //     }
  //   }
  //   return random.choice(this.players)
  // }

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
      this.players[i].teamName = this.colorScheme + this.place
      this.players[i].stats.teamLocation = this.colorScheme + this.place
    }
    this.setPositions()
    
  }

  setHungerUp() {
    //this.hunger += rng.random() * this.hungerRate + rng.random() * this.hungerRate
    for(let eachPlayer of this.players){
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
    for(let eachPlayer of this.players){
      eachPlayer.setHungerDown();
    }
  }

//   toString() {
//     return `
//         Team ID: ${this.teamIdNumber}<br>
//         Place: ${this.place}<br>
//         Team Name: ${this.name}<br>
//         Color Scheme: ${this.colorScheme}<br>
//         Team Aptitude: ${this.getTeamAptitude().toFixed(1)}<br>
//         Mood: ${this.mood.toFixed(1)}<br>
//         Hunger: ${this.hunger.toFixed(1)}<br>
//         Hunger Rate: ${this.hungerRate.toFixed(1)}<br>
//         XP: ${this.xp.toFixed(1)}<br>
//         Batter Up Number: ${this.batterUpNumber}<br>
//         Jersey Numbers: ${this.jerseyNumberList.join(", ")}<br>
//         Stats: ${this.stats.toString()}<br>
//         Daily Stats: ${this.dailyStats.toString()}<br>
//         -----Players-----<br>
//         Number of Players: ${this.players.length}<br>
//         ${this.getPlayerList()}<br>
//     `.trim();
// }

toString() {
  return `
      <table class="table table-dark table-striped table-bordered">
          <thead>
              <tr>
                  <th colspan="2">Team Details</th>
              </tr>
          </thead>
          <tbody>
              <tr><td>Team ID</td><td>${this.teamIdNumber}</td></tr>
              <tr><td>Place</td><td>${this.place}</td></tr>
              <tr><td>Team Name</td><td>${this.name}</td></tr>
              <tr><td>Color Scheme</td><td>${this.colorScheme}</td></tr>
              <tr><td>Team Aptitude</td><td>${this.getTeamAptitude().toFixed(1)}</td></tr>
              <tr><td>Mood</td><td>${this.mood.toFixed(1)}</td></tr>
              <tr><td>Hunger</td><td>${this.hunger.toFixed(1)}</td></tr>
              <tr><td>Hunger Rate</td><td>${this.hungerRate.toFixed(1)}</td></tr>
              <tr><td>XP</td><td>${this.xp.toFixed(1)}</td></tr>
              <tr><td>Batter Up Number</td><td>${this.batterUpNumber}</td></tr>
              <tr><td>Jersey Numbers</td><td>${this.jerseyNumberList.join(", ")}</td></tr>
              <tr><td>Stats</td><td>${this.stats.toString()}</td></tr>
              <tr><td>Daily Stats</td><td>${this.dailyStats.toString()}</td></tr>
              <tr>
                  <th colspan="2">Players</th>
              </tr>
              <tr><td>Number of Players</td><td>${this.players.length}</td></tr>
              ${this.getPlayerList()}
          </tbody>
      </table>
  `.trim();
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
    //this.players.sort(key=lambda x: x.getBattingAptitude(), reverse=true)
    this.players.sort(function(a, b) {
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







  resetSeasonStats() {
    this.stats = new Stats(this.colorScheme + this.place, this.name)
  }

  updateXp() {
    this.xp += this.dailyXp
    this.dailyXp = 0
  }
}