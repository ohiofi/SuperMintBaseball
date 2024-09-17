class BaseballTeam {
    constructor(name) {
      this.name = name; // Team name
      this.players = []; // Array to store players
    }
  
    // Method to add a player to the team
    addPlayer(player) {
      if (player instanceof BaseballPlayer) {
        this.players.push(player);
      } else {
        console.log('Invalid player. Must be an instance of BaseballPlayer.');
      }
    }
  
    // Method to remove a player from the team by name
    removePlayer(playerName) {
      this.players = this.players.filter(player => player.name !== playerName);
    }
  
    // Method to get a player by name
    getPlayer(playerName) {
      return this.players.find(player => player.name === playerName);
    }
  
    // Method to get the team roster
    getRoster() {
      return this.players.map(player => player.displayInfo()).join('\n\n');
    }
  
    // Method to calculate the team's overall batting average
    getTeamBattingAverage() {
      const totalHits = this.players.reduce((total, player) => total + player.battingAverage * 100, 0); // assuming 100 at-bats for simplicity
      const totalAtBats = this.players.length * 100;
      return totalAtBats > 0 ? (totalHits / totalAtBats).toFixed(3) : 0;
    }
  
    // Method to display team information
    displayTeamInfo() {
      return `Team: ${this.name}\n\nRoster:\n${this.getRoster()}\n\nTeam Batting Average: ${this.getTeamBattingAverage()}`;
    }
  }