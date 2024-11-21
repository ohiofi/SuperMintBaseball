class Stats {

  static restructure(jsonObject) {
    Object.setPrototypeOf(jsonObject, Stats.prototype);
    return jsonObject;
  }

  // Constructor to initialize statistics
  constructor() {
    this.gamesPlayed = 0;
    this.wins = 0;
    this.losses = 0;
    this.homeRuns = 0;
    this.atBats = 0;
    this.hits = 0;
    this.singles = 0;
    this.doubles = 0;
    this.triples = 0;
    this.basesOnBalls = 0;
    this.sacrificeFlies = 0;
    this.totalBases = 0;
    this.strikeoutsAtBat = 0;
    this.stolenBases = 0;
    this.hitByPitch = 0;
    // pitcher stuff
    this.inningsPitched = 0
    this.strikeoutsThrown = 0;
    this.runsAllowed = 0;
    this.homeRunsAllowed = 0;
    this.walksAllowed = 0;
  }


// Method to display all statistics
displayStats() {
  return `Home Runs: ${this.homeRuns}\nAt Bats: ${this.atBats}\nHits: ${this.hits}\nStrikeouts: ${this.strikeouts}\nStolen Bases: ${this.stolenBases}\nBatting Average: ${this.getBattingAverage()}\nOn-Base Percentage: ${this.getOnBasePercentage()}`;
}
  

  // Method to calculate batting average
  getBattingAverage() {
    return this.atBats > 0 ? (this.hits / this.atBats).toFixed(3) : -1;
  }

  // Method to calculate on-base percentage (OBP)
  getOnBasePercentage() {
    return this.atBats > 0 ? ((this.hits + 0.3 * this.stolenBases) / this.atBats).toFixed(3) : -1;
  }

  getOnBasePlusSlugging() {
    return this.atBats > 0 ? ((this.atBats * (this.atBats + this.basesOnBalls + this.hitByPitch) + this.totalBases * (this.atBats + this.basesOnBalls + this.sacrificeFlies + this.hitByPitch)) / (this.atBats * (this.atBats + this.basesOnBalls + this.sacrificeFlies + this.hitByPitch))).toFixed(3) : -1;
  }

  getEarnedRunAverage() {
    return this.inningsPitched > 0 ? ((this.runsAllowed / this.inningsPitched) * 9).toFixed(3) : 999;
  }

  

  stringFormatKey(key) {
    // Convert camelCase to Title Case
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  }

  toString() {
    const rows = Object.entries(this)
      .map(
        ([key, value]) => `
        <tr>
          <td>${this.stringFormatKey(key)}</td>
          <td>${value}</td>
        </tr>`
      )
      .join("");

    return `
      <table class="table table-dark table-striped table-bordered small table-sm table-borderless">
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;
  }

  stringFormatKey(key) {
    // Convert camelCase to Title Case
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  }
}


