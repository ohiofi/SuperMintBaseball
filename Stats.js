class Stats {
    // Constructor to initialize statistics
    constructor() {
        this.gamesPlayed = 0;
        this.wins = 0;
        this.losses = 0;
      this.homeRuns = 0;
      this.atBats = 0;
      this.hits = 0;
      this.strikeoutsAtBat = 0;
      this.strikeoutsThrown = 0;
      this.stolenBases = 0;
    }
  
    // Method to update home runs
    updateHomeRuns(newHomeRuns) {
      if (newHomeRuns >= 0) {
        this.homeRuns = newHomeRuns;
      } else {
        console.log('Invalid number of home runs. It should be a non-negative number.');
      }
    }
  
    // Method to update at bats
    updateAtBats(newAtBats) {
      if (newAtBats >= 0) {
        this.atBats = newAtBats;
      } else {
        console.log('Invalid number of at bats. It should be a non-negative number.');
      }
    }
  
    // Method to update hits
    updateHits(newHits) {
      if (newHits >= 0) {
        this.hits = newHits;
      } else {
        console.log('Invalid number of hits. It should be a non-negative number.');
      }
    }
  
    // Method to update strikeouts
    updateStrikeouts(newStrikeouts) {
      if (newStrikeouts >= 0) {
        this.strikeouts = newStrikeouts;
      } else {
        console.log('Invalid number of strikeouts. It should be a non-negative number.');
      }
    }
  
    // Method to update stolen bases
    updateStolenBases(newStolenBases) {
      if (newStolenBases >= 0) {
        this.stolenBases = newStolenBases;
      } else {
        console.log('Invalid number of stolen bases. It should be a non-negative number.');
      }
    }
  
    // Method to calculate batting average
    getBattingAverage() {
      return this.atBats > 0 ? (this.hits / this.atBats).toFixed(3) : 0;
    }
  
    // Method to calculate on-base percentage (OBP)
    getOnBasePercentage() {
      return this.atBats > 0 ? ((this.hits + 0.3 * this.stolenBases) / this.atBats).toFixed(3) : 0;
    }
  
    // Method to display all statistics
    displayStats() {
      return `Home Runs: ${this.homeRuns}\nAt Bats: ${this.atBats}\nHits: ${this.hits}\nStrikeouts: ${this.strikeouts}\nStolen Bases: ${this.stolenBases}\nBatting Average: ${this.getBattingAverage()}\nOn-Base Percentage: ${this.getOnBasePercentage()}`;
    }
  }
  

  